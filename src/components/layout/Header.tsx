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
    { label: 'Nouveautés', path: '/catalogue?nouveautes=true' }
  ];

  return (
    <>
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C23B2E] focus:text-[#F5F3EE] focus:font-bold focus:shadow-lg focus:outline-none"
      >
        Aller au contenu principal
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#E4E0D6] shadow-xs'
            : 'bg-transparent'
        }`}
        style={{ height: 'var(--nav-h)' }}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Wordmark Anton (No trademark symbols) */}
          <Link
            to="/"
            className="flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#C23B2E] rounded-xs"
            aria-label="REBUILD - Accueil"
          >
            <span className="font-anton text-2xl sm:text-3xl tracking-wider text-[#201C18]">
              REBUILD
            </span>
            <span className="w-2 h-2 bg-[#C23B2E] rounded-full inline-block"></span>
          </Link>

          {/* Center: Desktop Navigation (max 4 items) */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wider uppercase transition-colors relative py-1 focus-visible:outline-2 focus-visible:outline-[#C23B2E] ${
                    isActive
                      ? 'text-[#C23B2E]'
                      : 'text-[#201C18] hover:text-[#C23B2E]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C23B2E]" />
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
              className="p-2.5 text-[#201C18] hover:text-[#C23B2E] transition-colors rounded-xs focus-visible:outline-2 focus-visible:outline-[#C23B2E]"
              aria-label="Ouvrir la recherche"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Trigger with Bounce Animation */}
            <button
              onClick={toggleCart}
              className={`p-2.5 text-[#201C18] hover:text-[#C23B2E] transition-colors relative rounded-xs focus-visible:outline-2 focus-visible:outline-[#C23B2E] ${
                bounce ? 'scale-125 text-[#C23B2E]' : 'scale-100'
              }`}
              style={{ transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
              aria-label={`Panier (${totalItems} article${totalItems > 1 ? 's' : ''})`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C23B2E] text-[#F5F3EE] text-xs font-anton w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2.5 text-[#201C18] hover:text-[#C23B2E] transition-colors rounded-xs focus-visible:outline-2 focus-visible:outline-[#C23B2E]"
              aria-expanded={mobileMenuOpen}
              aria-label="Ouvrir le menu mobile"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (CAS B: tactile, >= 44px tap targets, full screen overlay) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-[#262421]/60 backdrop-blur-xs flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Menu mobile"
        >
          <div className="w-full max-w-sm bg-[#F5F3EE] h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header in Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-[#E4E0D6]">
              <span className="font-anton text-2xl tracking-wider text-[#201C18]">
                REBUILD
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 text-[#201C18] hover:text-[#C23B2E] min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xs"
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
                  className="min-h-[48px] px-4 py-3 flex items-center justify-between font-anton text-2xl text-[#201C18] hover:text-[#C23B2E] hover:bg-[#E4E0D6]/40 rounded-xs transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-5 h-5 text-[#C23B2E]" />
                </Link>
              ))}
              <div className="my-4 border-t border-[#E4E0D6]"></div>
              <Link
                to="/catalogue"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[48px] px-4 py-3 bg-[#C23B2E] text-[#F5F3EE] font-anton text-lg tracking-wider uppercase text-center rounded-xs hover:bg-[#a83327] transition-colors flex items-center justify-center gap-2 mt-4"
              >
                <span>Toute la collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </nav>

            {/* Reassurance Footer in Mobile Drawer */}
            <div className="pt-4 border-t border-[#E4E0D6] text-xs text-[#262421]/70 flex flex-col gap-1">
              <p className="font-semibold text-[#201C18]">Expédition Cotonou & International</p>
              <p>Livraison 24-48h · Retours sous 14 jours</p>
            </div>
          </div>
        </div>
      )}

      {/* Accessible Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#262421]/75 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24"
          role="dialog"
          aria-modal="true"
          aria-label="Rechercher un modèle"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#F5F3EE] border-2 border-[#201C18] p-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E4E0D6]">
              <h3 className="font-anton text-xl tracking-wider text-[#201C18]">
                RECHERCHE DANS LE CATALOGUE
              </h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#201C18] hover:text-[#C23B2E] rounded-xs"
                aria-label="Fermer la recherche"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#262421]/50" />
                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Ex: Tempo 400, Trail, Carbone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#201C18] pl-11 pr-4 py-3 text-base text-[#201C18] placeholder-[#262421]/40 focus:outline-none focus:border-[#C23B2E]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#C23B2E] text-[#F5F3EE] font-anton tracking-wider uppercase hover:bg-[#a83327] transition-colors"
              >
                Trouver
              </button>
            </form>

            {/* Quick search suggestions */}
            {searchResults.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#E4E0D6]">
                <p className="text-xs uppercase font-bold text-[#262421]/60 mb-2">
                  Suggestions immédiates
                </p>
                <div className="flex flex-col gap-2">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/produit/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between p-2 hover:bg-[#E4E0D6]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.colors[0].image}
                          alt={product.name}
                          className="w-10 h-10 object-cover bg-white border border-[#E4E0D6]"
                        />
                        <div>
                          <p className="font-anton text-base text-[#201C18]">{product.name}</p>
                          <p className="text-xs text-[#262421]/70">{product.category} · {product.usage}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-sm tabular-nums text-[#C23B2E]">
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
