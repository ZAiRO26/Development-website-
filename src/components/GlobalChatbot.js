import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Maximize2, Bot, ExternalLink } from 'lucide-react';

// Typewriter Hook - Variable speed character rendering
const useTypewriter = (text, isActive) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!isActive || !text) {
            setDisplayedText(text || '');
            setIsTyping(false);
            return;
        }

        setDisplayedText('');
        setIsTyping(true);
        let currentIndex = 0;
        let timeoutId = null;

        const typeNextChar = () => {
            if (currentIndex < text.length) {
                const char = text[currentIndex];
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;

                // Fast typing speed
                let delay = Math.random() * 10 + 5; // 5-15ms per char (FAST)
                if (['.', '!', '?'].includes(char)) {
                    delay = 80; // Quick pause
                } else if ([',', ';', ':'].includes(char)) {
                    delay = 40;
                }

                timeoutId = setTimeout(typeNextChar, delay);
            } else {
                setIsTyping(false);
            }
        };

        timeoutId = setTimeout(typeNextChar, 30);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            setIsTyping(false);
        };
    }, [text, isActive]);

    return { displayedText, isTyping };
};

// Typing Indicator Component
const TypingIndicator = () => (
    <div className="flex items-center space-x-1 px-4 py-3">
        <span className="text-gray-400 text-sm">Alex is typing</span>
        <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-purple-400 rounded-full"
                    animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                />
            ))}
        </div>
    </div>
);

// Navigation Link Component (clickable, not auto-redirect)
const NavLink = ({ path, children }) => {
    const pathNames = {
        '/contact': 'Contact Page',
        '/insights/packages': 'Pricing Packages',
        '/services': 'Our Services',
        '/about': 'About Us'
    };

    return (
        <Link
            to={path}
            className="inline-flex items-center gap-1 px-3 py-1.5 mt-2 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 rounded-lg text-purple-300 hover:text-white text-sm transition-all"
        >
            <ExternalLink className="w-3.5 h-3.5" />
            {children || pathNames[path] || path}
        </Link>
    );
};

// Message Component with Typewriter Effect
const MessageBubble = ({ message, isLatest }) => {
    const isAssistant = message.role === 'assistant';
    const isSystem = message.role === 'system';
    const isNavigation = message.role === 'navigation';

    // Only apply typewriter to latest assistant message
    const shouldType = isAssistant && isLatest;
    const { displayedText, isTyping } = useTypewriter(message.content, shouldType);

    const content = shouldType ? displayedText : message.content;

    // Markdown rendering
    const renderMarkdown = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, i) => {
            line = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            line = line.replace(/\*(.+?)\*/g, '<em>$1</em>');
            if (line.startsWith('- ') || line.startsWith('• ')) {
                return <li key={i} dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
            }
            return <p key={i} dangerouslySetInnerHTML={{ __html: line }} className="mb-1" />;
        });
    };

    if (isSystem) {
        return (
            <div className="flex justify-center my-2">
                <span className="text-xs text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">
                    {content}
                </span>
            </div>
        );
    }

    // Navigation message with clickable link
    if (isNavigation) {
        return (
            <div className="flex justify-start mb-3">
                <div className="bg-gray-800/60 rounded-xl px-4 py-2">
                    <span className="text-gray-400 text-sm">📍 Want to learn more?</span>
                    <div>
                        <NavLink path={message.path}>{message.linkText}</NavLink>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-3`}
        >
            <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl ${isAssistant
                    ? 'bg-gray-800/80 text-gray-100 rounded-tl-sm'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-sm'
                    }`}
            >
                <div className="text-sm leading-relaxed">
                    {renderMarkdown(content)}
                </div>
                {shouldType && isTyping && (
                    <span className="inline-block w-0.5 h-4 bg-purple-400 ml-0.5 animate-pulse" />
                )}
            </div>
        </motion.div>
    );
};

const GlobalChatbot = () => {
    // State
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [hasAutoOpened, setHasAutoOpened] = useState(false);
    const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const idleTimerRef = useRef(null);

    // API endpoint
    const getApiUrl = () => {
        if (process.env.REACT_APP_CHATBOT_API) {
            return process.env.REACT_APP_CHATBOT_API;
        }
        const hostname = window.location.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost:4000';
        }
        // Production: use Vercel-deployed chatbot API
        return 'https://vedaviks-chatbot-api.vercel.app';
    };
    const API_URL = getApiUrl();

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    // Auto-open after 10 seconds idle
    useEffect(() => {
        if (hasAutoOpened || isOpen) return;

        const resetTimer = () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

            idleTimerRef.current = setTimeout(() => {
                if (!isOpen && !hasAutoOpened) {
                    setIsOpen(true);
                    setHasAutoOpened(true);
                    setMessages([{
                        role: 'assistant',
                        content: `Hi there! 👋 I'm Alex from CodeTazos. How can I help you today?`
                    }]);
                }
            }, 10000);
        };

        const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => document.addEventListener(event, resetTimer));
        resetTimer();

        return () => {
            events.forEach(event => document.removeEventListener(event, resetTimer));
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [isOpen, hasAutoOpened]);

    // Handle tool calls - show clickable link instead of auto-navigating
    const handleToolCall = useCallback((toolData) => {
        console.log('🔧 Tool call:', toolData);

        if (toolData.tool === 'navigateToPage' && toolData.path) {
            const pathNames = {
                '/contact': 'Go to Contact Form',
                '/insights/packages': 'View Pricing',
                '/services': 'See Our Services',
                '/about': 'Learn About Us'
            };

            // Add a clickable navigation link instead of auto-redirecting
            setMessages(prev => [...prev, {
                role: 'navigation',
                path: toolData.path,
                linkText: pathNames[toolData.path] || 'View Page',
                content: pathNames[toolData.path]
            }]);
        }
    }, []);

    // Send message
    const sendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage = { role: 'user', content: inputValue.trim() };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInputValue('');
        setIsLoading(true);
        setIsThinking(true);

        try {
            // Quick thinking delay (200-400ms)
            const thinkingDelay = Math.random() * 200 + 200;
            await new Promise(resolve => setTimeout(resolve, thinkingDelay));

            const response = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: updatedMessages.filter(m => m.role === 'user' || m.role === 'assistant'),
                    sessionId: sessionId
                })
            });

            setIsThinking(false);

            if (!response.ok) throw new Error('Failed to get response');

            // Handle streaming text response
            const contentType = response.headers.get('content-type');
            let assistantContent = '';

            if (contentType && contentType.includes('application/json')) {
                // JSON response (from Vercel API)
                const data = await response.json();
                assistantContent = data.response || "Let me think about that...";

                // Handle tool call
                if (data.tool) {
                    setTimeout(() => handleToolCall(data.tool), 300);
                }
            } else {
                // Streaming text response (from local backend)
                assistantContent = await response.text();
            }

            // Add assistant message
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: assistantContent || "Let me think about that..."
            }]);

        } catch (error) {
            console.error('Chat error:', error);
            setIsThinking(false);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Oops, having a little trouble connecting. Can you try again? 😊"
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
            setMessages([{
                role: 'assistant',
                content: "Hi there! 👋 I'm Alex, your assistant at CodeTazos. How can I help you today?"
            }]);
        }
    };

    // Input should only be disabled during loading, not during typing animation
    const isInputDisabled = isLoading;

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleChat}
                        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg shadow-purple-500/30 flex items-center justify-center group"
                    >
                        <MessageCircle className="w-6 h-6 text-white" />
                        <span className="absolute w-full h-full rounded-full bg-purple-500 animate-ping opacity-30" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? 'auto' : '500px'
                        }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl shadow-2xl shadow-purple-900/20 border border-gray-800/50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-sm">Alex (CodeTazos AI)</h3>
                                    <span className="text-green-400 text-xs">● Online</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={() => setIsMinimized(!isMinimized)}
                                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                                >
                                    {isMinimized ? (
                                        <Maximize2 className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <Minimize2 className="w-4 h-4 text-gray-400" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        {!isMinimized && (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                                    {messages.map((message, index) => (
                                        <MessageBubble
                                            key={index}
                                            message={message}
                                            isLatest={index === messages.length - 1 && message.role === 'assistant'}
                                        />
                                    ))}

                                    {isThinking && <TypingIndicator />}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="p-3 border-t border-gray-800/50 bg-gray-900/50">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Ask Alex anything..."
                                            disabled={isInputDisabled}
                                            className="flex-1 bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
                                        />
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={sendMessage}
                                            disabled={!inputValue.trim() || isInputDisabled}
                                            className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <Send className="w-4 h-4 text-white" />
                                        </motion.button>
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
