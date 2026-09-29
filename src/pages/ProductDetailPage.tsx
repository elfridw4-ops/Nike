/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp, ArrowRight, Check, AlertCircle, ShoppingBag, Eye } from 'lucide-react';
import { PRODUCTS, formatPrice } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { ProductColor } from '../types/product';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [activeImage, setActiveImage] = useState<string>(product.colors[0]?.image || product.gallery[0]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(
    product.sizes.find((s) => s.inStock)?.size || null
  );
  const [isAdding, setIsAdding] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Update selection when route slug or product changes
  useEffect(() => {
    const initialColor = product.colors[0];
    setSelectedColor(initialColor);
    setActiveImage(initialColor?.image || product.gallery[0]);
    setSelectedSize(product.sizes.find((s) => s.inStock)?.size || null);
    setActiveImageIndex(0);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [product]);

  // Handle color change (immediately updates main preview image and color state)
  const handleColorChange = (color: ProductColor) => {
    setSelectedColor(color);
    setActiveImage(color.image);
    // If this color's image is in the gallery, sync the gallery index
    const foundIndex = product.gallery.findIndex((img) => img === color.image);
    if (foundIndex !== -1) {
      setActiveImageIndex(foundIndex);
    }
  };

  // Handle gallery thumbnail click
  const handleGalleryClick = (imgUrl: string, index: number) => {
    setActiveImageIndex(index);
    setActiveImage(imgUrl);
    // Check if this image matches one of the colors
    const matchedColor = product.colors.find((c) => c.image === imgUrl);
    if (matchedColor) {
      setSelectedColor(matchedColor);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    setIsAdding(true);
    addItem(product, selectedSize, selectedColor, 1);
    setTimeout(() => setIsAdding(false), 500);
  };

  // 3 Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.usage === product.usage
  ).slice(0, 3);

  // Selected size stock status
  const currentSizeObj = product.sizes.find((s) => s.size === selectedSize);

  // JSON-LD Schemas (Product & FAQPage)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.gallery,
    description: product.descriptionShort,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'REBUILD'
    },
    offers: {
      '@type': 'Offer',
      url: window.location.href,
      priceCurrency: 'XOF',
      price: product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: product.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };

  return (
    <main id="main-content" className="w-full bg-[#F5F3EE] pt-24 pb-28 min-h-screen">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="text-xs text-[#262421]/60 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#C23B2E] transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/catalogue" className="hover:text-[#C23B2E] transition-colors">Running</Link>
          <span>/</span>
          <span className="text-[#201C18] font-bold">{product.name}</span>
        </nav>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 5-Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Interactive Zoomable Image */}
            <div
              className={`relative bg-white border border-[#E4E0D6] rounded-xs overflow-hidden h-[380px] sm:h-[500px] flex items-center justify-center cursor-zoom-in ${
                isZoomed ? 'scale-105' : 'scale-100'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              style={{ transition: 'transform 0.3s ease-out' }}
            >
              <img
                key={activeImage}
                src={activeImage}
                alt={`${product.name} - ${selectedColor.name}`}
                fetchPriority="high"
                className="w-full h-full object-cover select-none transition-opacity duration-300"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#201C18]/90 text-[#F5F3EE] text-[11px] font-anton uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-xs pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full border border-white/40" style={{ backgroundColor: selectedColor.hex }} />
                <span>{selectedColor.name}</span>
              </span>
              <span className="absolute bottom-3 right-3 px-2 py-1 bg-[#201C18]/80 text-[#F5F3EE] text-[10px] font-anton uppercase tracking-wider rounded-xs pointer-events-none">
                {isZoomed ? 'Cliquer pour réduire' : 'Cliquer pour agrandir'}
              </span>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {product.gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => handleGalleryClick(imgUrl, i)}
                  className={`h-20 sm:h-24 bg-white border rounded-xs overflow-hidden transition-all ${
                    activeImage === imgUrl
                      ? 'border-2 border-[#C23B2E] ring-2 ring-[#C23B2E]/20 shadow-xs'
                      : 'border-[#E4E0D6] opacity-70 hover:opacity-100 hover:border-[#201C18]'
                  }`}
                  aria-label={`Afficher la vue ${i + 1} de ${product.name}`}
                >
                  <img
                    src={imgUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Descriptions: Short (Benefits -> Differentiator -> Audience) */}
            <div className="bg-white border border-[#E4E0D6] p-6 sm:p-8 rounded-xs mt-8 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C23B2E]">
                  Concept & Bénéfices
                </span>
                <h3 className="font-anton text-2xl text-[#201C18] mt-1">
                  POURQUOI CETTE PAIRE EST UNIQUE
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#201C18] leading-relaxed">
                {product.descriptionShort}
              </p>

              {/* Benefits list */}
              <div className="space-y-2 pt-2 border-t border-[#E4E0D6]/60">
                {product.descriptionLong.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-[#262421]/80">
                    <Check className="w-4 h-4 text-[#C23B2E] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Technical formulation */}
              <div className="p-4 bg-[#F5F3EE] border-l-2 border-[#C23B2E] text-xs text-[#262421]/80 space-y-1">
                <p className="font-bold text-[#201C18] uppercase">Formulation technique :</p>
                <p>{product.descriptionLong.technical}</p>
                <p className="text-[#C23B2E] font-semibold pt-1">Usage préconisé : {product.descriptionLong.usageNote}</p>
              </div>
            </div>

            {/* Characteristics Table in Tabular Nums */}
            <div className="bg-white border border-[#E4E0D6] p-6 rounded-xs space-y-4">
              <h3 className="font-anton text-xl text-[#201C18] uppercase">
                SPÉCIFICATIONS BIOMÉCANIQUES
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm pt-2">
                <div className="p-3 bg-[#F5F3EE] rounded-xs">
                  <p className="text-xs uppercase font-bold text-[#262421]/60">Drop talon-pointe</p>
                  <p className="font-anton text-lg text-[#201C18] tabular-nums mt-0.5">{product.specs.drop}</p>
                </div>
                <div className="p-3 bg-[#F5F3EE] rounded-xs">
                  <p className="text-xs uppercase font-bold text-[#262421]/60">Poids mesuré</p>
                  <p className="font-anton text-lg text-[#201C18] tabular-nums mt-0.5">{product.specs.weight}</p>
                </div>
                <div className="p-3 bg-[#F5F3EE] rounded-xs">
                  <p className="text-xs uppercase font-bold text-[#262421]/60">Type d'amorti</p>
                  <p className="font-semibold text-sm text-[#201C18] mt-0.5">{product.specs.cushioning}</p>
                </div>
                <div className="p-3 bg-[#F5F3EE] rounded-xs">
                  <p className="text-xs uppercase font-bold text-[#262421]/60">Surface cible</p>
                  <p className="font-semibold text-sm text-[#201C18] mt-0.5">{product.specs.surface}</p>
                </div>
                <div className="p-3 bg-[#F5F3EE] rounded-xs sm:col-span-2">
                  <p className="text-xs uppercase font-bold text-[#262421]/60">Plage de distance</p>
                  <p className="font-anton text-lg text-[#201C18] tabular-nums mt-0.5">{product.specs.distance}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Product Purchase Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white border-2 border-[#201C18] p-6 sm:p-8 rounded-xs shadow-md space-y-6">
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-[#201C18] text-[#F5F3EE] text-xs font-anton tracking-wider uppercase rounded-xs">
                    {product.category} · {product.usage}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-[#201C18]">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold tabular-nums">{product.rating}</span>
                    <span className="text-xs text-[#262421]/60">({product.reviewsCount} avis)</span>
                  </div>
                </div>

                <h1 className="font-anton text-3xl sm:text-4xl text-[#201C18] tracking-tight uppercase leading-none">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#262421]/70 mt-1.5">
                  {product.tagline}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-anton text-3xl sm:text-4xl text-[#C23B2E] tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <del className="text-base text-[#262421]/40 tabular-nums font-semibold">
                      {formatPrice(product.originalPrice)}
                    </del>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              <div className="pt-4 border-t border-[#E4E0D6]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase font-bold text-[#201C18]">
                    Couleur : <span className="text-[#C23B2E] font-extrabold">{selectedColor.name}</span>
                  </p>
                  <span className="text-[11px] text-[#262421]/60 font-semibold">
                    {product.colors.length} déclinaison{product.colors.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor.name === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => handleColorChange(c)}
                        className={`group px-3 py-2 rounded-xs border-2 transition-all flex items-center gap-2.5 text-left cursor-pointer ${
                          isSelected
                            ? 'border-[#C23B2E] bg-[#F5F3EE] shadow-xs'
                            : 'border-[#E4E0D6] bg-white hover:border-[#201C18] hover:bg-[#F5F3EE]/40'
                        }`}
                        aria-pressed={isSelected}
                        aria-label={`Sélectionner le coloris ${c.name}`}
                      >
                        <div className="relative flex items-center justify-center">
                          <span
                            className="w-5 h-5 rounded-full border border-black/30 shadow-2xs block"
                            style={{ backgroundColor: c.hex }}
                          />
                          {isSelected && (
                            <Check className="w-3 h-3 text-white absolute drop-shadow-sm pointer-events-none" />
                          )}
                        </div>
                        <span className={`text-xs ${isSelected ? 'font-bold text-[#201C18]' : 'font-medium text-[#262421]/80 group-hover:text-[#201C18]'}`}>
                          {c.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="pt-4 border-t border-[#E4E0D6]">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs uppercase font-bold text-[#201C18]">
                    Sélectionner la pointure (EU)
                  </p>
                  <span className="text-xs text-[#262421]/60 underline cursor-pointer">
                    Guide des tailles
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      disabled={!s.inStock}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-3 text-sm font-anton border rounded-xs transition-all relative ${
                        !s.inStock
                          ? 'bg-[#E4E0D6]/40 border-dashed border-[#262421]/20 text-[#262421]/30 cursor-not-allowed'
                          : selectedSize === s.size
                          ? 'bg-[#C23B2E] text-[#F5F3EE] border-[#C23B2E] shadow-xs'
                          : 'bg-[#F5F3EE] border-[#201C18]/30 text-[#201C18] hover:border-[#201C18]'
                      }`}
                      aria-label={`Pointure ${s.size} ${!s.inStock ? '(épuisé)' : ''}`}
                    >
                      <span>{s.size}</span>
                      {!s.inStock && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-full h-[1px] bg-[#262421]/40 rotate-45" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Stock Warning (Only when real in data) */}
                {currentSizeObj && currentSizeObj.stockCount && currentSizeObj.stockCount <= 3 && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#C23B2E] font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>Plus que {currentSizeObj.stockCount} exemplaires en stock pour cette taille !</span>
                  </div>
                )}
              </div>

              {/* Add to Cart CTA */}
              <div className="pt-4 border-t border-[#E4E0D6] space-y-3">
                <button
                  disabled={!selectedSize || isAdding}
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#C23B2E] text-[#F5F3EE] font-anton text-base sm:text-lg tracking-wider uppercase rounded-xs hover:bg-[#a83327] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isAdding ? (
                    <span>Ajout en cours...</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Ajouter au panier</span>
                    </>
                  )}
                </button>

                {/* 3 Reassurance Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-[#262421]/70 text-center">
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#F5F3EE] rounded-xs">
                    <Truck className="w-4 h-4 text-[#201C18]" />
                    <span className="font-semibold">Livraison 48h Cotonou</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#F5F3EE] rounded-xs">
                    <RotateCcw className="w-4 h-4 text-[#201C18]" />
                    <span className="font-semibold">Retours sous 14 jours</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#F5F3EE] rounded-xs">
                    <ShieldCheck className="w-4 h-4 text-[#201C18]" />
                    <span className="font-semibold">Paiement 100% Sécurisé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20 pt-12 border-t border-[#E4E0D6]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C23B2E]">Avis vérifiés</span>
              <h3 className="font-anton text-3xl text-[#201C18]">EXPÉRIENCES DE COUREURS</h3>
            </div>
            <div className="text-right">
              <span className="font-anton text-3xl text-[#201C18] tabular-nums">{product.rating}</span>
              <span className="text-sm text-[#262421]/60"> / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-white border border-[#E4E0D6] rounded-xs space-y-3 shadow-2xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-anton text-lg text-[#201C18]">{rev.title}</h4>
                    <p className="text-xs text-[#262421]/70">{rev.author} · {rev.sport} · {rev.date}</p>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#201C18] leading-relaxed">« {rev.comment} »</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                  <Check className="w-3.5 h-3.5" /> Achat vérifié REBUILD
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section (5 questions) */}
        <div className="mt-20 pt-12 border-t border-[#E4E0D6] max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C23B2E]">
              Réponses d'experts
            </span>
            <h3 className="font-anton text-3xl sm:text-4xl text-[#201C18] mt-1">
              QUESTIONS FRÉQUENTES SUR LA {product.name.toUpperCase()}
            </h3>
          </div>

          <div className="space-y-3">
            {product.faq.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border border-[#201C18] bg-white rounded-xs overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left font-anton text-lg text-[#201C18] hover:text-[#C23B2E] transition-colors flex justify-between items-center"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#C23B2E]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#201C18]" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#262421]/80 leading-relaxed border-t border-[#E4E0D6] pt-3 animate-in fade-in duration-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E4E0D6]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-anton text-2xl sm:text-3xl text-[#201C18]">
                PRODUITS RECOMMANDÉS DANS LA MÊME GAMME
              </h3>
              <Link to="/catalogue" className="text-xs font-bold text-[#C23B2E] hover:underline uppercase">
                Voir tout
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="bg-white border border-[#E4E0D6] rounded-xs p-4 flex flex-col justify-between group">
                  <Link to={`/produit/${rel.slug}`} className="block h-48 overflow-hidden rounded-xs bg-[#F5F3EE]">
                    <img
                      src={rel.colors[0].image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="mt-4">
                    <span className="text-[11px] font-bold uppercase text-[#262421]/60">{rel.usage}</span>
                    <Link to={`/produit/${rel.slug}`} className="font-anton text-xl text-[#201C18] block hover:text-[#C23B2E]">
                      {rel.name}
                    </Link>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#E4E0D6]">
                      <span className="font-bold text-sm text-[#C23B2E] tabular-nums">{formatPrice(rel.price)}</span>
                      <Link to={`/produit/${rel.slug}`} className="text-xs font-bold uppercase text-[#201C18] hover:text-[#C23B2E] flex items-center gap-1">
                        Découvrir <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Bottom CTA Bar with Compensatory Padding */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#F5F3EE] border-t-2 border-[#201C18] p-4 shadow-xl flex items-center justify-between gap-4">
        <div>
          <p className="font-anton text-lg text-[#201C18] leading-tight truncate max-w-[140px]">
            {product.name}
          </p>
          <p className="font-bold text-sm text-[#C23B2E] tabular-nums">
            {formatPrice(product.price)}
          </p>
        </div>

        <button
          disabled={!selectedSize || isAdding}
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 bg-[#C23B2E] text-[#F5F3EE] font-anton text-sm tracking-wider uppercase rounded-xs hover:bg-[#a83327] transition-colors flex items-center justify-center gap-2 shadow-xs"
        >
          {isAdding ? (
            <span>Ajout...</span>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Ajouter ({selectedSize || 'Pointure'})</span>
            </>
          )}
        </button>
      </div>
    </main>
  );
};
