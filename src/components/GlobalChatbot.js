import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Maximize2, Bot } from 'lucide-react';

const GlobalChatbot = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // State
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasAutoOpened, setHasAutoOpened] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const idleTimerRef = useRef(null);

    // API endpoint - supports development and production modes
    const getApiUrl = () => {
        // If env variable is set, use it (for production Vercel URL)
        if (process.env.REACT_APP_CHATBOT_API) {
            return process.env.REACT_APP_CHATBOT_API;
        }
        // Development: use local Express server
        const hostname = window.location.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:4000';
        }
        // Network access: use same hostname with port 4000
        return `http://${hostname}:4000`;
    };
    const API_URL = getApiUrl();

    // Scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-open after 10 seconds idle (only once per session)
    useEffect(() => {
        if (hasAutoOpened || isOpen) return;

        const resetTimer = () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

            idleTimerRef.current = setTimeout(() => {
                if (!isOpen && !hasAutoOpened) {
                    setIsOpen(true);
                    setHasAutoOpened(true);
                    // Add proactive greeting
                    setMessages([{
                        role: 'assistant',
                        content: `Hey! 👋 I'm Alex from VedaViks. I noticed you're checking out our ${getPageName(location.pathname)} page. Need any help finding what you're looking for?`
                    }]);
                }
            }, 10000); // 10 seconds
        };

        // Reset timer on user activity
        const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => document.addEventListener(event, resetTimer));
        resetTimer();

        return () => {
            events.forEach(event => document.removeEventListener(event, resetTimer));
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [isOpen, hasAutoOpened, location.pathname]);

    // Get friendly page name
    const getPageName = (path) => {
        const pageNames = {
            '/': 'home',
            '/services': 'services',
            '/insights/packages': 'packages',
            '/contact': 'contact',
            '/about': 'about',
            '/industries': 'industries',
            '/clients': 'clients'
        };
        return pageNames[path] || 'website';
    };

    // Handle tool calls from AI
    const handleToolCall = useCallback((toolData) => {
        console.log('🔧 Tool call received:', toolData);

        if (toolData.tool === 'navigateToPage' && toolData.path) {
            // Add navigation message
            setMessages(prev => [...prev, {
                role: 'system',
                content: `🔗 Navigating to ${toolData.path}...`
            }]);

            // Navigate after brief delay
            setTimeout(() => {
                navigate(toolData.path);
            }, 500);
        }

        if (toolData.tool === 'emailTranscript') {
            setMessages(prev => [...prev, {
                role: 'system',
                content: '✅ Your information has been saved! Our team will reach out soon.'
            }]);
        }
    }, [navigate]);

    // Send message to backend (supports both streaming and JSON responses)
    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = { role: 'user', content: inputValue.trim() };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: updatedMessages.filter(m => m.role !== 'system')
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            // Check content type to determine response format
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                // Handle JSON response (Vercel serverless)
                const data = await response.json();

                // Add assistant message
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: data.response || data.message || "I'm having trouble responding right now."
                }]);

                // Handle tool call if present
                if (data.tool) {
                    handleToolCall(data.tool);
                }
            } else {
                // Handle streaming response (Express backend)
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let assistantMessage = '';

                // Add empty assistant message to stream into
                setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });

                    // Check for tool calls
                    if (chunk.includes('__TOOL__')) {
                        const toolMatch = chunk.match(/__TOOL__(.+?)__TOOL__/);
                        if (toolMatch) {
                            try {
                                const toolData = JSON.parse(toolMatch[1]);
                                handleToolCall(toolData);
                            } catch (e) {
                                console.error('Tool parse error:', e);
                            }
                            const cleanChunk = chunk.replace(/__TOOL__.+?__TOOL__/g, '');
                            if (cleanChunk) {
                                assistantMessage += cleanChunk;
                            }
                        }
                    } else {
                        assistantMessage += chunk;
                    }

                    // Update the last message with streamed content
                    // eslint-disable-next-line no-loop-func
                    setMessages(prev => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1] = {
                            role: 'assistant',
                            content: assistantMessage
                        };
                        return newMessages;
                    });
                }
            }

        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Sorry, I'm having trouble connecting right now. Please try again or contact us directly at contact@vedaviksmedia.com"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Toggle chat
    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen && messages.length === 0) {
            // Initial greeting
            setMessages([{
                role: 'assistant',
                content: "Hey! 👋 I'm Alex from VedaViks Media. How can I help you build something amazing today?"
            }]);
        }
    };

    // Simple markdown rendering
    const renderMarkdown = (text) => {
        if (!text) return null;

        return text
            .split('\n')
            .map((line, i) => {
                // Bold
                line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                // Italic
                line = line.replace(/\*(.+?)\*/g, '<em>$1</em>');
                // Bullet points
                if (line.startsWith('- ') || line.startsWith('• ')) {
                    return <li key={i} dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
                }
                return <p key={i} dangerouslySetInnerHTML={{ __html: line }} className="mb-1" />;
            });
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleChat}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-700 text-white shadow-lg shadow-primary/30 flex items-center justify-center"
                        style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
                    >
                        <MessageCircle className="w-7 h-7" />
                        {/* Pulse animation */}
                        <span className="absolute w-full h-full rounded-full bg-primary animate-ping opacity-20" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? 'auto' : '500px'
                        }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] bg-surface rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col"
                        style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(139, 92, 246, 0.2)' }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-[#023776] to-[#034694] px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm">Alex (VedaViks AI)</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-white/70 text-xs">Online</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        {!isMinimized && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background-dark">
                                    {messages.map((message, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${message.role === 'user'
                                                    ? 'bg-primary text-white rounded-br-md'
                                                    : message.role === 'system'
                                                        ? 'bg-accent-cyan/20 text-accent-cyan text-sm italic'
                                                        : 'bg-surface border border-white/10 text-white/90 rounded-bl-md'
                                                    }`}
                                            >
                                                <div className="text-sm leading-relaxed">
                                                    {renderMarkdown(message.content)}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Loading indicator */}
                                    {isLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex justify-start"
                                        >
                                            <div className="bg-surface border border-white/10 rounded-2xl rounded-bl-md px-4 py-3">
                                                <div className="flex gap-1.5">
                                                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                                                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                                                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-3 border-t border-white/10 bg-surface">
                                    <div className="flex gap-2">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Ask Alex anything..."
                                            className="flex-1 bg-background-dark border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 text-sm"
                                            disabled={isLoading}
                                        />
                                        <button
                                            onClick={sendMessage}
                                            disabled={!inputValue.trim() || isLoading}
                                            className="w-10 h-10 rounded-xl bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default GlobalChatbot;
