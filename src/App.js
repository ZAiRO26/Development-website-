import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import ServiceDetail from './pages/ServiceDetail';
import Industries from './pages/Industries';
import IndustryDetail from './pages/IndustryDetail';
import Clients from './pages/Clients';
import CaseStudyDetail from './pages/CaseStudyDetail';
import About from './pages/About';
import Insights from './pages/Insights';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import GlobalChatbot from './components/GlobalChatbot';
import SmoothScroll from './components/SmoothScroll';

// Animated Routes component for page transitions
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Main Pages */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/services/products" element={<PageTransition><Products /></PageTransition>} />
        <Route path="/services/:slug" element={<PageTransition><ServiceDetail /></PageTransition>} />
        <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
        <Route path="/industries/:slug" element={<PageTransition><IndustryDetail /></PageTransition>} />
        <Route path="/clients" element={<PageTransition><Clients /></PageTransition>} />
        <Route path="/clients/case-studies" element={<PageTransition><Clients /></PageTransition>} />
        <Route path="/clients/projects" element={<PageTransition><Clients /></PageTransition>} />
        <Route path="/clients/case-study/:id" element={<PageTransition><CaseStudyDetail /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/about/how-we-work" element={<PageTransition><About /></PageTransition>} />
        <Route path="/about/sustainability" element={<PageTransition><About /></PageTransition>} />
        <Route path="/about/careers" element={<PageTransition><About /></PageTransition>} />
        <Route path="/insights" element={<PageTransition><Insights /></PageTransition>} />
        <Route path="/insights/blog" element={<PageTransition><Insights /></PageTransition>} />
        <Route path="/insights/newsletters" element={<PageTransition><Insights /></PageTransition>} />
        <Route path="/insights/packages" element={<PageTransition><Packages /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

        {/* Legal Pages */}
        <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
        <Route path="/cookies" element={<PageTransition><Cookies /></PageTransition>} />

        {/* 404 */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <SmoothScroll>
        <ScrollToTop />
        <div className="min-h-screen bg-background-dark text-white">
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
          <GlobalChatbot />
          <WhatsAppFloatingButton />
          <ScrollToTopButton />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;