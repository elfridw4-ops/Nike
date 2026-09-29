/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { PRODUCTS } from '../../data/products';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleCart, getTotalItems, bounceTrigger } = useCartStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bounce, setBounce] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const totalItems = getTotalItems();

  // Sticky transition using IntersectionObserver on a top sentinel (no raw scroll listeners)
  useEffect(() => {
    const sentinel = document.getElementById('nav-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Spring bounce effect when cart item count changes
  useEffect(() => {
    if (bounceTrigger > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 400);
      return () => clearTimeout(timer);
    }
  }, [bounceTrigger]);

  // Focus search input when modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [searchOpen]);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter search results
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.usage.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/catalogue?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Homme', path: '/catalogue?genre=homme' },
    { label: 'Femme', path: '/catalogue?genre=femme' },
    { label: 'Running', path: '/catalogue' },
    { label: 'Nouveautés', path: '/catalogue?nouveautes=true', badge: 'VOLT' }
  ];

  return (
    <>
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FA5400] focus:text-[#FFFFFF] focus:font-bold focus:shadow-lg focus:outline-none"
      >
        Aller au contenu principal
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E5E5] shadow-xs'
            : 'bg-[#F5F5F5]/80 backdrop-blur-xs'
        }`}
        style={{ height: 'var(--nav-h)' }}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Wordmark Anton (NIKE) */}
          <Link
            to="/"
            className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#FA5400] rounded-xs group"
            aria-label="NIKE - Accueil"
          >
            <span className="font-anton text-2xl sm:text-3xl tracking-wider text-[#111111] group-hover:text-[#FA5400] transition-colors">
              NIKE
            </span>
            <span className="px-1.5 py-0.5 bg-[#111111] text-[#CCFF00] font-anton text-[9px] uppercase tracking-widest rounded-2xs">
              REBUILD
            </span>
          </Link>

          {/* Center: Desktop Navigation (max 4 items) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wider uppercase transition-colors relative py-1 focus-visible:outline-2 focus-visible:outline-[#FA5400] flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#FA5400]'
                      : 'text-[#111111] hover:text-[#FA5400]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1 py-0.2 bg-[#CCFF00] text-[#111111] text-[9px] font-anton uppercase rounded-2xs">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FA5400]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search & Cart Button */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-[#111111] hover:text-[#FA5400] transition-colors rounded-xs focus-visible:outline-2 focus-visible:outline-[#FA5400] cursor-pointer"
              aria-label="Ouvrir la recherche"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Trigger with Bounce Animation */}
            <button
              onClick={toggleCart}
              className={`p-2.5 text-[#111111] hover:text-[#FA5400] transition-colors relative rounded-xs focus-visible:outline-2 focus-visible:outline-[#FA5400] cursor-pointer ${
                bounce ? 'scale-125 text-[#FA5400]' : 'scale-100'
              }`}
              style={{ transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
              aria-label={`Panier (${totalItems} article${totalItems > 1 ? 's' : ''})`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FA5400] text-[#FFFFFF] text-xs font-anton w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 text-[#111111] hover:text-[#FA5400] transition-colors rounded-xs focus-visible:outline-2 focus-visible:outline-[#FA5400] cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Ouvrir le menu mobile"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (tactile, >= 44px tap targets, full screen overlay) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-[#111111]/70 backdrop-blur-xs flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Menu mobile"
        >
          <div className="w-full max-w-sm bg-[#FFFFFF] h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header in Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-[#E5E5E5]">
              <div className="flex items-center gap-2">
                <span className="font-anton text-2xl tracking-wider text-[#111111]">
                  NIKE
                </span>
                <span className="px-1.5 py-0.5 bg-[#111111] text-[#CCFF00] font-anton text-[9px] uppercase rounded-2xs">
                  REBUILD
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 text-[#111111] hover:text-[#FA5400] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xs cursor-pointer"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links (>= 44px target) */}
            <nav className="flex flex-col gap-2 py-6 flex-1" aria-label="Navigation mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[48px] px-4 py-3 flex items-center justify-between font-anton text-2xl text-[#111111] hover:text-[#FA5400] hover:bg-[#F5F5F5] rounded-xs transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {link.label}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 bg-[#CCFF00] text-[#111111] text-[10px] font-anton rounded-2xs">
                        {link.badge}
                      </span>
                    )}
                  </span>
                  <ArrowRight className="w-5 h-5 text-[#FA5400]" />
                </Link>
              ))}
              <div className="my-4 border-t border-[#E5E5E5]"></div>
              <Link
                to="/catalogue"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[48px] px-4 py-3 bg-[#FA5400] text-[#FFFFFF] font-anton text-lg tracking-wider uppercase text-center rounded-xs hover:bg-[#E03A00] transition-colors flex items-center justify-center gap-2 mt-4 shadow-sm"
              >
                <span>Toute la collection Nike</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>

            {/* Reassurance Footer in Mobile Drawer */}
            <div className="pt-4 border-t border-[#E5E5E5] text-xs text-[#111111]/70 flex flex-col gap-1">
              <p className="font-semibold text-[#111111]">Expédition Nike Express</p>
              <p>Livraison 24-48h · Retours gratuits sous 30 jours</p>
            </div>
          </div>
        </div>
      )}

      {/* Accessible Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#111111]/80 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24"
          role="dialog"
          aria-modal="true"
          aria-label="Rechercher un modèle"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#FFFFFF] border-2 border-[#111111] p-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
              <h3 className="font-anton text-xl tracking-wider text-[#111111]">
                RECHERCHE DANS LE CATALOGUE NIKE
              </h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#111111] hover:text-[#FA5400] rounded-xs cursor-pointer"
                aria-label="Fermer la recherche"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#111111]/50" />
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Ex: Tempo 400, Alphafly, Vaporfly, Trail, Volt..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F5F5F5] border border-[#111111] pl-11 pr-4 py-3 text-base text-[#111111] placeholder-[#111111]/40 focus:outline-none focus:border-[#FA5400]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#FA5400] text-[#FFFFFF] font-anton tracking-wider uppercase hover:bg-[#E03A00] transition-colors cursor-pointer shadow-xs"
              >
                Trouver
              </button>
            </form>

            {/* Quick search suggestions */}
            {searchResults.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                <p className="text-xs uppercase font-bold text-[#111111]/60 mb-2">
                  Suggestions immédiates
                </p>
                <div className="flex flex-col gap-2">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/produit/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between p-2 hover:bg-[#F5F5F5] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.colors[0].image}
                          alt={product.name}
                          className="w-10 h-10 object-cover bg-white border border-[#E5E5E5]"
                        />
                        <div>
                          <p className="font-anton text-base text-[#111111]">{product.name}</p>
                          <p className="text-xs text-[#111111]/70">{product.category} · {product.usage}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-sm tabular-nums text-[#FA5400]">
                        {product.price.toLocaleString('fr-FR')}&nbsp;FCFA
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
