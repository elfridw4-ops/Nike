/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X, ArrowUpDown, Star, ChevronLeft, ChevronRight, Check, ShoppingBag, Eye } from 'lucide-react';
import { PRODUCTS, formatPrice } from '../data/products';
import { Product, ProductUsage } from '../types/product';
import { useCartStore } from '../store/cartStore';

// Dedicated Interactive Product Card with Color Switcher & Quick Add
const CatalogProductCard: React.FC<{
  product: Product;
  onQuickAdd: (product: Product, colorIndex: number) => void;
  isQuickAdded: boolean;
}> = ({ product, onQuickAdd, isQuickAdded }) => {
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const activeColor = product.colors[activeColorIdx] || product.colors[0];

  return (
    <div className="bg-white border border-[#E4E0D6] rounded-xs p-3.5 flex flex-col justify-between group hover:border-[#201C18] transition-all hover:shadow-md relative">
      {/* Badge top */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col gap-1">
          {product.isNew && (
            <span className="px-1.5 py-0.5 bg-[#C23B2E] text-[#F5F3EE] text-[10px] font-anton tracking-wider uppercase rounded-xs w-fit">
              Nouveau
            </span>
          )}
          {product.isPopular && !product.isNew && (
            <span className="px-1.5 py-0.5 bg-[#201C18] text-[#F5F3EE] text-[10px] font-anton tracking-wider uppercase rounded-xs w-fit">
              Populaire
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-[#262421]/70">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold tabular-nums">{product.rating}</span>
        </div>
      </div>

      {/* Image with instant Color Switch and hover effect */}
      <Link
        to={`/produit/${product.slug}`}
        className="relative block h-40 sm:h-48 overflow-hidden my-2 bg-[#F5F3EE] rounded-xs"
        aria-label={`Voir la fiche de ${product.name}`}
      >
        <img
          key={activeColor.image}
          src={activeColor.image}
          alt={`${product.name} - ${activeColor.name}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Product Details */}
      <div className="space-y-1.5 mt-2">
        <div className="text-[11px] uppercase font-bold text-[#262421]/60">
          {product.category} · {product.usage}
        </div>
        <Link
          to={`/produit/${product.slug}`}
          className="font-anton text-lg sm:text-xl text-[#201C18] hover:text-[#C23B2E] transition-colors block leading-tight truncate"
        >
          {product.name}
        </Link>

        {/* Interactive Color selector swatches */}
        <div className="py-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.colors.map((c, cIdx) => {
              const isActive = activeColorIdx === cIdx;
              return (
                <button
                  key={c.name}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveColorIdx(cIdx);
                  }}
                  onMouseEnter={() => setActiveColorIdx(cIdx)}
                  className={`relative p-0.5 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'ring-2 ring-[#C23B2E] ring-offset-1 scale-110'
                      : 'hover:scale-110 opacity-80 hover:opacity-100'
                  }`}
                  title={`${c.name} (cliquer pour prévisualiser)`}
                  aria-label={`Coloris ${c.name}`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/30 block"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              );
            })}
            <span className="text-[10px] text-[#262421]/60 font-medium ml-1 truncate max-w-[110px]">
              {activeColor.name}
            </span>
          </div>
        </div>

        {/* Price + Rapid Add */}
        <div className="pt-2 border-t border-[#E4E0D6] flex items-center justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <del className="text-[11px] text-[#262421]/40 tabular-nums">
                {formatPrice(product.originalPrice)}
              </del>
            )}
            <span className="font-bold text-sm sm:text-base text-[#C23B2E] tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={() => onQuickAdd(product, activeColorIdx)}
            className="p-2 bg-[#201C18] text-[#F5F3EE] hover:bg-[#C23B2E] transition-colors rounded-xs cursor-pointer"
            aria-label={`Ajout rapide de ${product.name} en ${activeColor.name}`}
            title={`Ajout rapide (${activeColor.name})`}
          >
            {isQuickAdded ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCartStore();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  // Read URL query parameters
  const selectedUsage = searchParams.get('usage') as ProductUsage | null;
  const selectedGender = searchParams.get('genre') || null;
  const selectedSize = searchParams.get('taille') ? Number(searchParams.get('taille')) : null;
  const selectedColor = searchParams.get('couleur') || null;
  const onlyNew = searchParams.get('nouveautes') === 'true';
  const searchQuery = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'nouveautes';
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 8;

  // Sync filter update to URL params
  const updateFilter = (key: string, value: string | number | null) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === null || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    // Reset page to 1 on filter change
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const resetAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Color options
  const colorOptions = [
    { label: 'Vermillon', hex: '#C23B2E' },
    { label: 'Craie', hex: '#F5F3EE' },
    { label: 'Noir', hex: '#262421' },
    { label: 'Sable', hex: '#E4E0D6' }
  ];

  // Size options
  const sizeOptions = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedUsage && p.usage !== selectedUsage) return false;
      if (selectedGender && p.gender !== selectedGender && p.gender !== 'unisexe') return false;
      if (selectedSize && !p.sizes.some((s) => s.size === selectedSize && s.inStock)) return false;
      if (selectedColor && !p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))) return false;
      if (onlyNew && !p.isNew) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchTag = p.tagline.toLowerCase().includes(query);
        const matchUsage = p.usage.toLowerCase().includes(query);
        if (!matchName && !matchTag && !matchUsage) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'prix-asc') return a.price - b.price;
      if (sortBy === 'prix-desc') return b.price - a.price;
      if (sortBy === 'populaires') return b.rating - a.rating;
      // Default: nouveautes
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      return 0;
    });
  }, [selectedUsage, selectedGender, selectedSize, selectedColor, onlyNew, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const activeFilterCount =
    (selectedUsage ? 1 : 0) +
    (selectedGender ? 1 : 0) +
    (selectedSize ? 1 : 0) +
    (selectedColor ? 1 : 0) +
    (onlyNew ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const handleQuickAdd = (product: Product, colorIndex: number = 0) => {
    const availableSize = product.sizes.find((s) => s.inStock)?.size || 42;
    const availableColor = product.colors[colorIndex] || product.colors[0];
    addItem(product, availableSize, availableColor, 1);
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 1500);
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://rebuild.example.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Running & Performance',
        item: 'https://rebuild.example.com/catalogue'
      }
    ]
  };

  return (
    <main id="main-content" className="w-full bg-[#F5F3EE] pt-24 pb-20 min-h-screen">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="text-xs text-[#262421]/60 mb-4 flex items-center gap-2">
          <Link to="/" className="hover:text-[#C23B2E] transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <span className="text-[#201C18] font-bold">Running & Chaussures de Performance</span>
        </nav>

        {/* Category Header with SEO intro (100-150 words) */}
        <div className="pb-8 mb-8 border-b border-[#E4E0D6]">
          <h1 className="font-anton text-4xl sm:text-6xl text-[#201C18] tracking-tight uppercase">
            RUNNING & PERFORMANCE
          </h1>
          <p className="text-sm sm:text-base text-[#262421]/80 mt-3 max-w-3xl leading-relaxed">
            Explorez l’intégralité de la collection running REBUILD. Conçues pour répondre aux exigences des coureurs sur route, sentiers de trail et pistes d’athlétisme, nos chaussures allient géométrie propulsive, plaques en fibre de carbone et mousses supercritiques à retour d’énergie continu. Chaque modèle est développé pour absorber les impacts sans ralentir la cadence, garantissant une endurance accrue du premier kilomètre au franchissement de la ligne d'arrivée.
          </p>
        </div>

        {/* Toolbar Bar */}
        <div className="bg-white border border-[#E4E0D6] p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xs shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-[#201C18] text-[#F5F3EE] font-anton text-sm rounded-xs"
            >
              <Filter className="w-4 h-4" />
              <span>Filtres ({activeFilterCount})</span>
            </button>

            <span className="text-sm font-semibold text-[#201C18] tabular-nums">
              {filteredProducts.length} modèle{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs uppercase font-bold text-[#262421]/60 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Trier par :
            </span>
            <select
              value={sortBy}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="bg-[#F5F3EE] border border-[#201C18] px-3 py-1.5 text-sm font-semibold text-[#201C18] focus:outline-none focus:border-[#C23B2E] rounded-xs"
            >
              <option value="nouveautes">Nouveautés</option>
              <option value="prix-asc">Prix : croissant</option>
              <option value="prix-desc">Prix : décroissant</option>
              <option value="populaires">Mieux notés</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs uppercase font-bold text-[#262421]/60">Filtres actifs :</span>
            {selectedUsage && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#201C18] text-xs font-bold uppercase rounded-xs">
                Usage: {selectedUsage}
                <button onClick={() => updateFilter('usage', null)} aria-label="Supprimer le filtre usage">
                  <X className="w-3.5 h-3.5 text-[#C23B2E]" />
                </button>
              </span>
            )}
            {selectedGender && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#201C18] text-xs font-bold uppercase rounded-xs">
                Genre: {selectedGender}
                <button onClick={() => updateFilter('genre', null)} aria-label="Supprimer le filtre genre">
                  <X className="w-3.5 h-3.5 text-[#C23B2E]" />
                </button>
              </span>
            )}
            {selectedSize && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#201C18] text-xs font-bold uppercase rounded-xs">
                Pointure: {selectedSize}
                <button onClick={() => updateFilter('taille', null)} aria-label="Supprimer le filtre taille">
                  <X className="w-3.5 h-3.5 text-[#C23B2E]" />
                </button>
              </span>
            )}
            {selectedColor && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#201C18] text-xs font-bold uppercase rounded-xs">
                Couleur: {selectedColor}
                <button onClick={() => updateFilter('couleur', null)} aria-label="Supprimer le filtre couleur">
                  <X className="w-3.5 h-3.5 text-[#C23B2E]" />
                </button>
              </span>
            )}
            {onlyNew && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#201C18] text-xs font-bold uppercase rounded-xs">
                Nouveautés uniquement
                <button onClick={() => updateFilter('nouveautes', null)} aria-label="Supprimer le filtre nouveautés">
                  <X className="w-3.5 h-3.5 text-[#C23B2E]" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#201C18] text-xs font-bold uppercase rounded-xs">
                Recherche: « {searchQuery} »
                <button onClick={() => updateFilter('q', null)} aria-label="Supprimer la recherche">
                  <X className="w-3.5 h-3.5 text-[#C23B2E]" />
                </button>
              </span>
            )}
            <button
              onClick={resetAllFilters}
              className="text-xs font-bold text-[#C23B2E] hover:underline uppercase ml-2"
            >
              Tout réinitialiser
            </button>
          </div>
        )}

        {/* Layout with Sidebar & Products Grid */}
        <div className="flex gap-8 items-start">
          {/* Desktop Sticky Sidebar (260px) */}
          <aside className="hidden md:block w-64 shrink-0 sticky top-24 bg-white border border-[#E4E0D6] p-6 rounded-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4E0D6]">
              <h3 className="font-anton text-lg tracking-wider text-[#201C18]">FILTRES</h3>
              {activeFilterCount > 0 && (
                <button onClick={resetAllFilters} className="text-xs text-[#C23B2E] font-bold hover:underline">
                  Effacer
                </button>
              )}
            </div>

            {/* Usage Filter */}
            <div>
              <p className="text-xs uppercase font-bold text-[#262421]/70 mb-2.5">Usage & Terrain</p>
              <div className="space-y-1.5 text-sm">
                {[
                  { label: 'Tous les terrains', value: null },
                  { label: 'Route & Asphalte', value: 'route' },
                  { label: 'Trail & Nature', value: 'trail' },
                  { label: 'Piste & Pointes', value: 'piste' },
                  { label: 'Récupération', value: 'recuperation' }
                ].map((u) => (
                  <button
                    key={u.label}
                    onClick={() => updateFilter('usage', u.value)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xs transition-colors text-xs font-semibold flex items-center justify-between ${
                      (selectedUsage === u.value || (u.value === null && !selectedUsage))
                        ? 'bg-[#201C18] text-[#F5F3EE]'
                        : 'text-[#201C18] hover:bg-[#E4E0D6]/50'
                    }`}
                  >
                    <span>{u.label}</span>
                    {(selectedUsage === u.value || (u.value === null && !selectedUsage)) && (
                      <Check className="w-3.5 h-3.5 text-[#C23B2E]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter (Grid of buttons) */}
            <div>
              <p className="text-xs uppercase font-bold text-[#262421]/70 mb-2.5">Pointure</p>
              <div className="grid grid-cols-4 gap-1.5">
                {sizeOptions.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => updateFilter('taille', selectedSize === sz ? null : sz)}
                    className={`py-1.5 text-xs font-anton border rounded-xs transition-colors ${
                      selectedSize === sz
                        ? 'bg-[#C23B2E] text-[#F5F3EE] border-[#C23B2E]'
                        : 'bg-[#F5F3EE] border-[#E4E0D6] text-[#201C18] hover:border-[#201C18]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter (Swatch + Text label) */}
            <div>
              <p className="text-xs uppercase font-bold text-[#262421]/70 mb-2.5">Teintes Dominantes</p>
              <div className="space-y-1.5">
                {colorOptions.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => updateFilter('couleur', selectedColor === c.label ? null : c.label)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xs transition-colors text-xs font-semibold flex items-center gap-2 ${
                      selectedColor === c.label
                        ? 'bg-[#201C18] text-[#F5F3EE]'
                        : 'text-[#201C18] hover:bg-[#E4E0D6]/50'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div>
              <p className="text-xs uppercase font-bold text-[#262421]/70 mb-2.5">Genre</p>
              <div className="flex gap-1.5">
                {['homme', 'femme', 'unisexe'].map((g) => (
                  <button
                    key={g}
                    onClick={() => updateFilter('genre', selectedGender === g ? null : g)}
                    className={`flex-1 py-1.5 text-xs font-anton uppercase border rounded-xs transition-colors ${
                      selectedGender === g
                        ? 'bg-[#201C18] text-[#F5F3EE] border-[#201C18]'
                        : 'bg-[#F5F3EE] border-[#E4E0D6] text-[#201C18] hover:border-[#201C18]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid (2 col mobile / 4 col desktop) */}
          <div className="flex-1">
            {paginatedProducts.length === 0 ? (
              <div className="bg-white border border-[#E4E0D6] p-12 text-center rounded-xs space-y-4">
                <p className="font-anton text-2xl text-[#201C18] uppercase">
                  Aucun modèle ne correspond à vos critères
                </p>
                <p className="text-sm text-[#262421]/70 max-w-md mx-auto">
                  Essayez de réinitialiser certains filtres pour élargir votre recherche dans la collection running.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-3 bg-[#C23B2E] text-[#F5F3EE] font-anton text-sm tracking-wider uppercase rounded-xs hover:bg-[#a83327] transition-colors inline-block"
                >
                  Voir tous les modèles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {paginatedProducts.map((product) => (
                  <CatalogProductCard
                    key={product.id}
                    product={product}
                    onQuickAdd={handleQuickAdd}
                    isQuickAdded={quickAddedId === product.id}
                  />
                ))}
              </div>
            )}

            {/* Numbered Pagination (SEO Prioritized) */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => updateFilter('page', currentPage - 1)}
                  className="p-2.5 border border-[#201C18] bg-white rounded-xs disabled:opacity-30 hover:bg-[#201C18] hover:text-[#F5F3EE] transition-colors"
                  aria-label="Page précédente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                  <button
                    key={pg}
                    onClick={() => updateFilter('page', pg)}
                    className={`w-10 h-10 font-anton text-sm border rounded-xs transition-colors tabular-nums ${
                      currentPage === pg
                        ? 'bg-[#C23B2E] text-[#F5F3EE] border-[#C23B2E]'
                        : 'bg-white border-[#201C18] text-[#201C18] hover:bg-[#201C18] hover:text-[#F5F3EE]'
                    }`}
                  >
                    {pg}
                  </button>
                ))}

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => updateFilter('page', currentPage + 1)}
                  className="p-2.5 border border-[#201C18] bg-white rounded-xs disabled:opacity-30 hover:bg-[#201C18] hover:text-[#F5F3EE] transition-colors"
                  aria-label="Page suivante"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-[#262421]/60 backdrop-blur-xs flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Filtres du catalogue"
        >
          <div className="w-full max-w-xs bg-[#F5F3EE] h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E4E0D6] mb-6">
                <h3 className="font-anton text-xl text-[#201C18]">FILTRES</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-[#201C18]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Usages Mobile */}
              <div className="mb-6">
                <p className="text-xs uppercase font-bold text-[#262421]/70 mb-2">Usage</p>
                <div className="space-y-1 text-sm">
                  {[
                    { label: 'Tous', value: null },
                    { label: 'Route', value: 'route' },
                    { label: 'Trail', value: 'trail' },
                    { label: 'Piste', value: 'piste' },
                    { label: 'Récupération', value: 'recuperation' }
                  ].map((u) => (
                    <button
                      key={u.label}
                      onClick={() => updateFilter('usage', u.value)}
                      className={`w-full text-left px-3 py-2 rounded-xs text-xs font-semibold ${
                        selectedUsage === u.value ? 'bg-[#201C18] text-[#F5F3EE]' : 'bg-white'
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pointures Mobile */}
              <div className="mb-6">
                <p className="text-xs uppercase font-bold text-[#262421]/70 mb-2">Pointure</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {sizeOptions.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => updateFilter('taille', selectedSize === sz ? null : sz)}
                      className={`py-2 text-xs font-anton border rounded-xs ${
                        selectedSize === sz ? 'bg-[#C23B2E] text-[#F5F3EE]' : 'bg-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-4 bg-[#C23B2E] text-[#F5F3EE] font-anton tracking-wider uppercase rounded-xs"
            >
              Appliquer ({filteredProducts.length} résultats)
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
