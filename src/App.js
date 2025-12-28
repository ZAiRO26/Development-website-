import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import FloatingNav from './components/FloatingNav';
import Footer from './components/Footer';
import CinematicTransition from './components/CinematicTransition';
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
import LatestNews from './pages/LatestNews';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import GlobalChatbot from './components/GlobalChatbot';
import SmoothScroll from './components/SmoothScroll';
import ImmersiveBackground from './components/ImmersiveBackground';


// Animated Routes component for page transitions
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Main Pages */}
        <Route path="/" element={<CinematicTransition><Home /></CinematicTransition>} />
        <Route path="/services" element={<CinematicTransition><Services /></CinematicTransition>} />
        <Route path="/services/products" element={<CinematicTransition><Products /></CinematicTransition>} />
        <Route path="/services/:slug" element={<CinematicTransition><ServiceDetail /></CinematicTransition>} />
        <Route path="/industries" element={<CinematicTransition><Industries /></CinematicTransition>} />
        <Route path="/industries/:slug" element={<CinematicTransition><IndustryDetail /></CinematicTransition>} />
        <Route path="/clients" element={<CinematicTransition><Clients /></CinematicTransition>} />
        <Route path="/clients/case-studies" element={<CinematicTransition><Clients /></CinematicTransition>} />
        <Route path="/clients/projects" element={<CinematicTransition><Clients /></CinematicTransition>} />
        <Route path="/clients/case-study/:id" element={<CinematicTransition><CaseStudyDetail /></CinematicTransition>} />
        <Route path="/about" element={<CinematicTransition><About /></CinematicTransition>} />
        <Route path="/about/how-we-work" element={<CinematicTransition><About /></CinematicTransition>} />
        <Route path="/about/sustainability" element={<CinematicTransition><About /></CinematicTransition>} />
        <Route path="/about/careers" element={<CinematicTransition><About /></CinematicTransition>} />
        <Route path="/insights" element={<CinematicTransition><Insights /></CinematicTransition>} />
        <Route path="/insights/blog" element={<CinematicTransition><Insights /></CinematicTransition>} />
        <Route path="/insights/newsletters" element={<CinematicTransition><Insights /></CinematicTransition>} />
        <Route path="/insights/packages" element={<CinematicTransition><Packages /></CinematicTransition>} />
        <Route path="/latest-news" element={<CinematicTransition><LatestNews /></CinematicTransition>} />
        <Route path="/contact" element={<CinematicTransition><Contact /></CinematicTransition>} />

        {/* Legal Pages */}
        <Route path="/privacy" element={<CinematicTransition><Privacy /></CinematicTransition>} />
        <Route path="/terms" element={<CinematicTransition><Terms /></CinematicTransition>} />
        <Route path="/cookies" element={<CinematicTransition><Cookies /></CinematicTransition>} />

        {/* 404 */}
        <Route path="*" element={<CinematicTransition><NotFound /></CinematicTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <SmoothScroll>
        <ImmersiveBackground>
          <ScrollToTop />
          <div className="min-h-screen text-white">
            <FloatingNav />
            <main>
              <AnimatedRoutes />
            </main>
            <Footer />
            <GlobalChatbot />
            <WhatsAppFloatingButton />
            <ScrollToTopButton />
          </div>
        </ImmersiveBackground>
      </SmoothScroll>
    </Router>
  );
}

export default App;