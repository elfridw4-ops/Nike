/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp, ArrowRight, Check, AlertCircle, ShoppingBag } from 'lucide-react';
import { PRODUCTS, formatPrice } from '../data/products';
import { useCartStore } from '../store/cartStore';
import { ProductColor } from '../types/product';
import { SizeGuideModal } from '../components/ui/SizeGuideModal';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
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
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

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
    const foundIndex = product.gallery.findIndex((img) => img === color.image);
    if (foundIndex !== -1) {
      setActiveImageIndex(foundIndex);
    }
  };

  // Handle gallery thumbnail click
  const handleGalleryClick = (imgUrl: string, index: number) => {
    setActiveImageIndex(index);
    setActiveImage(imgUrl);
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
      name: 'NIKE'
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
    <main id="main-content" className="w-full bg-[#F5F5F5] pt-24 pb-28 min-h-screen">
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
        <nav aria-label="breadcrumb" className="text-xs text-[#111111]/60 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#FA5400] transition-colors">Accueil</Link>
          <span>/</span>
          <Link to="/catalogue" className="hover:text-[#FA5400] transition-colors">Nike Running</Link>
          <span>/</span>
          <span className="text-[#111111] font-bold">{product.name}</span>
        </nav>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 5-Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Interactive Zoomable Image */}
            <div
              className={`relative bg-[#FFFFFF] border border-[#E5E5E5] rounded-xs overflow-hidden h-[380px] sm:h-[500px] flex items-center justify-center cursor-zoom-in ${
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
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#111111]/90 text-[#FFFFFF] text-[11px] font-anton uppercase tracking-wider rounded-xs flex items-center gap-1.5 shadow-xs pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full border border-white/40" style={{ backgroundColor: selectedColor.hex }} />
                <span>{selectedColor.name}</span>
              </span>
              <span className="absolute bottom-3 right-3 px-2 py-1 bg-[#111111]/80 text-[#FFFFFF] text-[10px] font-anton uppercase tracking-wider rounded-xs pointer-events-none">
                {isZoomed ? 'Cliquer pour réduire' : 'Cliquer pour agrandir'}
              </span>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {product.gallery.map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => handleGalleryClick(imgUrl, i)}
                  className={`h-20 sm:h-24 bg-white border rounded-xs overflow-hidden transition-all cursor-pointer ${
                    activeImage === imgUrl
                      ? 'border-2 border-[#FA5400] ring-2 ring-[#FA5400]/20 shadow-xs'
                      : 'border-[#E5E5E5] opacity-70 hover:opacity-100 hover:border-[#111111]'
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

            {/* Descriptions: Short */}
            <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-6 sm:p-8 rounded-xs mt-8 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FA5400]">
                  Innovation & Performance Nike
                </span>
                <h3 className="font-anton text-2xl text-[#111111] mt-1">
                  POURQUOI CETTE PAIRE EST UNIQUE
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#111111] leading-relaxed">
                {product.descriptionShort}
              </p>

              {/* Benefits list */}
              <div className="space-y-2 pt-2 border-t border-[#E5E5E5]/60">
                {product.descriptionLong.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-[#111111]/80">
                    <Check className="w-4 h-4 text-[#FA5400] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Technical formulation */}
              <div className="p-4 bg-[#F5F5F5] border-l-2 border-[#FA5400] text-xs text-[#111111]/80 space-y-1">
                <p className="font-bold text-[#111111] uppercase">Ingénierie Nike :</p>
                <p>{product.descriptionLong.technical}</p>
                <p className="text-[#FA5400] font-semibold pt-1">Usage préconisé : {product.descriptionLong.usageNote}</p>
              </div>
            </div>

            {/* Characteristics Table in Tabular Nums */}
            <div className="bg-[#FFFFFF] border border-[#E5E5E5] p-6 rounded-xs space-y-4">
              <h3 className="font-anton text-xl text-[#111111] uppercase">
                SPÉCIFICATIONS BIOMÉCANIQUES
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm pt-2">
                <div className="p-3 bg-[#F5F5F5] rounded-xs">
                  <p className="text-xs uppercase font-bold text-[#111111]/60">Drop talon-pointe</p>
                  <p className="font-anton text-lg text-[#111111] tabular-nums mt-0.5">{product.specs.drop}</p>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-xs">
                  <p className="text-xs uppercase font-bold text-[#111111]/60">Poids mesuré</p>
                  <p className="font-anton text-lg text-[#111111] tabular-nums mt-0.5">{product.specs.weight}</p>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-xs">
                  <p className="text-xs uppercase font-bold text-[#111111]/60">Type d'amorti</p>
                  <p className="font-semibold text-sm text-[#111111] mt-0.5">{product.specs.cushioning}</p>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-xs">
                  <p className="text-xs uppercase font-bold text-[#111111]/60">Surface cible</p>
                  <p className="font-semibold text-sm text-[#111111] mt-0.5">{product.specs.surface}</p>
                </div>
                <div className="p-3 bg-[#F5F5F5] rounded-xs sm:col-span-2">
                  <p className="text-xs uppercase font-bold text-[#111111]/60">Plage de distance</p>
                  <p className="font-anton text-lg text-[#111111] tabular-nums mt-0.5">{product.specs.distance}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Product Purchase Panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-[#FFFFFF] border-2 border-[#111111] p-6 sm:p-8 rounded-xs shadow-md space-y-6">
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-[#111111] text-[#CCFF00] text-xs font-anton tracking-wider uppercase rounded-2xs">
                    NIKE {product.category.toUpperCase()} · {product.usage.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-[#111111]">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold tabular-nums">{product.rating}</span>
                    <span className="text-xs text-[#111111]/60">({product.reviewsCount} avis)</span>
                  </div>
                </div>

                <h1 className="font-anton text-3xl sm:text-4xl text-[#111111] tracking-tight uppercase leading-none">
                  {product.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#111111]/70 mt-1.5">
                  {product.tagline}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-anton text-3xl sm:text-4xl text-[#FA5400] tabular-nums">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <del className="text-base text-[#111111]/40 tabular-nums font-semibold">
                      {formatPrice(product.originalPrice)}
                    </del>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              <div className="pt-4 border-t border-[#E5E5E5]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase font-bold text-[#111111]">
                    Couleur Nike : <span className="text-[#FA5400] font-extrabold">{selectedColor.name}</span>
                  </p>
                  <span className="text-[11px] text-[#111111]/60 font-semibold">
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
                            ? 'border-[#FA5400] bg-[#F5F5F5] shadow-xs'
                            : 'border-[#E5E5E5] bg-white hover:border-[#111111] hover:bg-[#F5F5F5]/60'
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
                        <span className={`text-xs ${isSelected ? 'font-bold text-[#111111]' : 'font-medium text-[#111111]/80 group-hover:text-[#111111]'}`}>
                          {c.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="pt-4 border-t border-[#E5E5E5]">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs uppercase font-bold text-[#111111]">
                    Sélectionner la pointure (EU)
                  </p>
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-xs text-[#111111]/70 underline cursor-pointer hover:text-[#FA5400] font-semibold flex items-center gap-1"
                  >
                    Guide des pointures Nike
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      disabled={!s.inStock}
                      onClick={() => setSelectedSize(s.size)}
                      className={`py-3 text-sm font-anton border rounded-xs transition-all relative cursor-pointer ${
                        !s.inStock
                          ? 'bg-[#E5E5E5]/40 border-dashed border-[#111111]/20 text-[#111111]/30 cursor-not-allowed'
                          : selectedSize === s.size
                          ? 'bg-[#FA5400] text-[#FFFFFF] border-[#FA5400] shadow-xs'
                          : 'bg-[#F5F5F5] border-[#111111]/30 text-[#111111] hover:border-[#111111]'
                      }`}
                      aria-label={`Pointure ${s.size} ${!s.inStock ? '(épuisé)' : ''}`}
                    >
                      <span>{s.size}</span>
                      {!s.inStock && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-full h-[1px] bg-[#111111]/40 rotate-45" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Stock Warning */}
                {currentSizeObj && currentSizeObj.stockCount && currentSizeObj.stockCount <= 3 && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#FA5400] font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>Plus que {currentSizeObj.stockCount} paires en stock pour cette pointure !</span>
                  </div>
                )}
              </div>

              {/* Add to Cart CTA */}
              <div className="pt-4 border-t border-[#E5E5E5] space-y-3">
                <button
                  disabled={!selectedSize || isAdding}
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#FA5400] text-[#FFFFFF] font-anton text-base sm:text-lg tracking-wider uppercase rounded-xs hover:bg-[#E03A00] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
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
                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-[#111111]/70 text-center">
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#F5F5F5] rounded-xs">
                    <Truck className="w-4 h-4 text-[#111111]" />
                    <span className="font-semibold">Livraison 48h Express</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#F5F5F5] rounded-xs">
                    <RotateCcw className="w-4 h-4 text-[#111111]" />
                    <span className="font-semibold">Retours gratuits 30j</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 bg-[#F5F5F5] rounded-xs">
                    <ShieldCheck className="w-4 h-4 text-[#111111]" />
                    <span className="font-semibold">Garantie 100% Nike</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20 pt-12 border-t border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FA5400]">Avis vérifiés</span>
              <h3 className="font-anton text-3xl text-[#111111]">EXPÉRIENCES DE COUREURS</h3>
            </div>
            <div className="text-right">
              <span className="font-anton text-3xl text-[#111111] tabular-nums">{product.rating}</span>
              <span className="text-sm text-[#111111]/60"> / 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-6 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xs space-y-3 shadow-2xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-anton text-lg text-[#111111]">{rev.title}</h4>
                    <p className="text-xs text-[#111111]/70">{rev.author} · {rev.sport} · {rev.date}</p>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#111111] leading-relaxed">« {rev.comment} »</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                  <Check className="w-3.5 h-3.5" /> Achat vérifié Nike
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section (5 questions) */}
        <div className="mt-20 pt-12 border-t border-[#E5E5E5] max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FA5400]">
              Réponses d'experts
            </span>
            <h3 className="font-anton text-3xl sm:text-4xl text-[#111111] mt-1">
              QUESTIONS FRÉQUENTES SUR LA {product.name.toUpperCase()}
            </h3>
          </div>

          <div className="space-y-3">
            {product.faq.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="border border-[#111111] bg-[#FFFFFF] rounded-xs overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left font-anton text-lg text-[#111111] hover:text-[#FA5400] transition-colors flex justify-between items-center cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#FA5400]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#111111]" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#111111]/80 leading-relaxed border-t border-[#E5E5E5] pt-3 animate-in fade-in duration-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E5E5E5]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-anton text-2xl sm:text-3xl text-[#111111]">
                MODÈLES RECOMMANDÉS DANS LA MÊME GAMME NIKE
              </h3>
              <Link to="/catalogue" className="text-xs font-bold text-[#FA5400] hover:underline uppercase">
                Voir tout
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="bg-[#FFFFFF] border border-[#E5E5E5] rounded-xs p-4 flex flex-col justify-between group hover:border-[#111111] transition-all">
                  <Link to={`/produit/${rel.slug}`} className="block h-48 overflow-hidden rounded-xs bg-[#F5F5F5]">
                    <img
                      src={rel.colors[0].image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="mt-4">
                    <span className="text-[11px] font-bold uppercase text-[#111111]/60">{rel.usage}</span>
                    <Link to={`/produit/${rel.slug}`} className="font-anton text-xl text-[#111111] block hover:text-[#FA5400]">
                      {rel.name}
                    </Link>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#E5E5E5]">
                      <span className="font-bold text-sm text-[#FA5400] tabular-nums">{formatPrice(rel.price)}</span>
                      <Link to={`/produit/${rel.slug}`} className="text-xs font-bold uppercase text-[#111111] hover:text-[#FA5400] flex items-center gap-1">
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FFFFFF] border-t-2 border-[#111111] p-4 shadow-xl flex items-center justify-between gap-4">
        <div>
          <p className="font-anton text-lg text-[#111111] leading-tight truncate max-w-[140px]">
            {product.name}
          </p>
          <p className="font-bold text-sm text-[#FA5400] tabular-nums">
            {formatPrice(product.price)}
          </p>
        </div>

        <button
          disabled={!selectedSize || isAdding}
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 bg-[#FA5400] text-[#FFFFFF] font-anton text-sm tracking-wider uppercase rounded-xs hover:bg-[#E03A00] transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
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

      {/* Official Nike Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        onSelectSize={(sz) => setSelectedSize(sz)}
      />
    </main>
  );
};
