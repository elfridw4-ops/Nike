/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { GrainOverlay } from './components/ui/GrainOverlay';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import gsap from 'gsap';

// Page Transition & Scroll Management Component
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const wipeOverlayRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.09,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Vertical Vermillon Wipe Page Transition (0.6s)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    if (wipeOverlayRef.current) {
      const el = wipeOverlayRef.current;
      const tl = gsap.timeline();

      tl.fromTo(
        el,
        { scaleY: 0, transformOrigin: 'bottom' },
        {
          scaleY: 1,
          duration: 0.3,
          ease: 'power3.inOut',
          onComplete: () => {
            window.scrollTo(0, 0);
            lenisRef.current?.scrollTo(0, { immediate: true });
          }
        }
      ).to(el, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.35,
        ease: 'power3.inOut'
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.search]);

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-[#FA5400] selection:text-[#FFFFFF]">
      {/* Top Sentinel for Sticky Header IntersectionObserver */}
      <div id="nav-sentinel" className="h-1 w-full absolute top-0 left-0 pointer-events-none" />

      {/* Wipe Transition Overlay */}
      <div
        ref={wipeOverlayRef}
        className="page-wipe-overlay"
        style={{ transform: 'scaleY(0)' }}
      />

      {/* SVG Grain Texture Filter (Tech Traitement_Visuel b) */}
      <GrainOverlay />

      {/* Global Header */}
      <Header />

      {/* Main Routed Content */}
      <div className="flex-1 w-full">{children}</div>

      {/* Global Slide Cart Drawer */}
      <CartDrawer />

      {/* Global 4-Column Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CatalogPage />} />
          <Route path="/produit/:slug" element={<ProductDetailPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
