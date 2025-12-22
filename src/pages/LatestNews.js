import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Clock, Sparkles, RefreshCw, Star, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection, { FadeUp } from '../components/AnimatedSection';

const LatestNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API endpoint - uses Vercel API in production, localhost:4000 for dev
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

    const fetchNews = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${getApiUrl()}/api/latest-news`);
            if (!response.ok) {
                throw new Error('Failed to fetch news');
            }
            const data = await response.json();
            setNews(data);
        } catch (err) {
            console.error('News fetch error:', err);
            setError(err.message);
            // Use sample data as fallback
            setNews([
                {
                    id: 'fallback_1',
                    title: 'AI Adoption Accelerates Across Small Businesses',
                    url: '#',
                    source: 'Tech Chronicle',
                    publishedAt: new Date().toISOString(),
                    summary: 'A new study reveals that over 60% of small businesses are now using AI tools for automation, customer service, and marketing.',
                    businessAngle: 'This trend represents a major opportunity for businesses to gain competitive advantage through early AI adoption.',
                    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
                    featured: true
                },
                {
                    id: 'fallback_2',
                    title: 'Web Development Trends: React Ecosystem Leads',
                    url: '#',
                    source: 'Developer Weekly',
                    publishedAt: new Date().toISOString(),
                    summary: 'The latest Stack Overflow survey shows React continues to dominate, with Next.js adoption growing 40% year-over-year.',
                    businessAngle: 'Investing in React-based development ensures your web presence stays modern and maintainable.',
                    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
                    featured: true
                },
                {
                    id: 'fallback_3',
                    title: 'E-commerce Platforms Embrace AI Personalization',
                    url: '#',
                    source: 'Retail Tech',
                    publishedAt: new Date().toISOString(),
                    summary: 'Major platforms are rolling out AI features for product recommendations, dynamic pricing, and customer support chatbots.',
                    businessAngle: 'AI-powered personalization can significantly boost conversion rates and customer satisfaction.',
                    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
                    featured: false
                }
            ]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const NewsCard = ({ article, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`relative group ${article.featured ? 'md:col-span-2' : ''}`}
        >
            <div className="h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl 
                      border border-white/10 rounded-2xl overflow-hidden
                      hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10
                      transition-all duration-500 hover:-translate-y-1">

                {/* Featured Badge */}
                {article.featured && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 
                          rounded-full text-xs font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Featured
                    </div>
                )}

                {/* Card Content - Horizontal Layout */}
                <div className={`flex ${article.featured ? 'flex-col md:flex-row' : 'flex-col'}`}>

                    {/* Text Content */}
                    <div className="flex-1 p-6">
                        {/* Source & Date */}
                        <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs font-medium uppercase tracking-wide">
                                {article.source}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {formatDate(article.publishedAt)}
                            </span>
                        </div>

                        {/* Title */}
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link"
                        >
                            <h3 className={`font-bold text-white mb-3 group-hover/link:text-purple-400 
                                 transition-colors leading-tight ${article.featured ? 'text-2xl' : 'text-lg'}`}>
                                {article.title}
                                <ExternalLink className="w-4 h-4 ml-2 inline opacity-0 group-hover/link:opacity-100 
                                             transition-opacity text-purple-400" />
                            </h3>
                        </a>

                        {/* AI Summary */}
                        <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                            {article.summary}
                        </p>

                        {/* Business Angle - Styled Differently */}
                        <div className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 
                                border-l-4 border-purple-500 rounded-r-lg mb-3">
                            <div className="flex items-start gap-2">
                                <TrendingUp className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />
                                <p className="text-xs text-purple-200 italic">
                                    <span className="font-semibold text-purple-300">Why this matters: </span>
                                    {article.businessAngle}
                                </p>
                            </div>
                        </div>

                        {/* Curated Tag */}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                            <span>Curated by CodeTazos AI</span>
                        </div>
                    </div>

                    {/* Thumbnail Image */}
                    {article.image && (
                        <div className={`relative overflow-hidden ${article.featured
                            ? 'md:w-80 h-48 md:h-auto'
                            : 'h-48'
                            }`}>
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-500 
                                          group-hover:scale-105"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
                                           md:bg-gradient-to-l md:from-black/30 md:to-transparent" />
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0d0d15] to-[#0a0a0f]">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <AnimatedSection>
                        <FadeUp>
                            <div className="text-center max-w-4xl mx-auto">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 
                                border border-purple-500/30 rounded-full text-purple-300 text-sm mb-6">
                                    <Sparkles className="w-4 h-4" />
                                    AI-Curated News Feed
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r 
                               from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                    Latest News
                                </h1>
                                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                                    Stay ahead with AI-curated tech, AI, and business news. Summaries and business
                                    insights are generated by our in-house AI stack—the same tech we use to build
                                    custom agents for clients.
                                </p>
                            </div>
                        </FadeUp>
                    </AnimatedSection>
                </div>
            </section>

            {/* News Grid Section */}
            <section className="pb-20">
                <div className="container mx-auto px-6">
                    {/* Refresh Button */}
                    <div className="flex justify-end mb-8">
                        <button
                            onClick={fetchNews}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 
                         border border-white/10 rounded-lg text-gray-300 text-sm
                         transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            {loading ? 'Refreshing...' : 'Refresh News'}
                        </button>
                    </div>

                    {/* Loading State */}
                    {loading && news.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent 
                              rounded-full animate-spin mb-4" />
                            <p className="text-gray-400">Loading latest news...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8 text-center">
                            <p className="text-red-300">
                                Unable to fetch live news. Showing cached articles.
                            </p>
                        </div>
                    )}

                    {/* News Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((article, index) => (
                            <NewsCard key={article.id} article={article} index={index} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {!loading && news.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">No news articles available at the moment.</p>
                            <button
                                onClick={fetchNews}
                                className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg 
                           text-white font-medium transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4 text-white">
                        Want AI Like This for Your Business?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        The same AI technology that powers this news curation can be customized
                        for your business. Chatbots, automation, content generation—we build it all.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r 
                       from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                       rounded-xl text-white font-semibold transition-all hover:scale-105"
                    >
                        Let's Build Together
                        <Sparkles className="w-5 h-5" />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default LatestNews;
