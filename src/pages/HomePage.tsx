/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Flame, Camera, Compass } from 'lucide-react';
import { SERIES_PRODUCTS, LOOKBOOK_IMAGES, formatPrice } from '../data/products';
import { Product } from '../types/product';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Interactive Serie Card with Nike Colorway switcher
const HomeSerieCard: React.FC<{ product: Product; idx: number }> = ({ product, idx }) => {
  const [activeColorIdx, setActiveColorIdx] = useState(0);
  const activeColor = product.colors[activeColorIdx] || product.colors[0];

  return (
    <div className="w-[300px] sm:w-[360px] bg-[#1A1A1A] border border-[#FFFFFF]/15 rounded-xs p-5 flex flex-col justify-between shrink-0 group transition-all duration-300 hover:scale-[1.03] hover:border-[#FA5400]">
      {/* Giant Size / Number in Anton */}
      <div className="flex justify-between items-start">
        <span className="font-anton text-5xl sm:text-6xl text-[#FFFFFF]/10 group-hover:text-[#FA5400]/40 transition-colors">
          {product.seriesNumber || `0${idx + 1}`}
        </span>
        <span className="px-2.5 py-1 bg-[#111111] text-[#CCFF00] border border-[#CCFF00]/30 text-xs font-bold uppercase rounded-2xs">
          {product.usage}
        </span>
      </div>

      {/* Product Image with instant Color Switch */}
      <Link
        to={`/produit/${product.slug}`}
        className="my-4 relative h-48 sm:h-56 flex items-center justify-center overflow-hidden bg-[#111111] rounded-xs"
      >
        <img
          key={activeColor.image}
          src={activeColor.image}
          alt={`${product.name} - ${activeColor.name}`}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Product Info & Color selector */}
      <div>
        <h4 className="font-anton text-2xl text-[#FFFFFF] group-hover:text-[#FA5400] transition-colors">
          {product.name}
        </h4>
        <p className="text-xs text-[#FFFFFF]/70 mt-1 line-clamp-2">
          {product.tagline}
        </p>

        {/* Color swatches */}
        <div className="flex items-center gap-1.5 py-2 mt-1">
          {product.colors.map((c, cIdx) => {
            const isActive = activeColorIdx === cIdx;
            return (
              <button
                key={c.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveColorIdx(cIdx);
                }}
                onMouseEnter={() => setActiveColorIdx(cIdx)}
                className={`relative p-0.5 rounded-full transition-all cursor-pointer ${
                  isActive ? 'ring-2 ring-[#FA5400] scale-110' : 'opacity-70 hover:opacity-100'
                }`}
                title={c.name}
                aria-label={`Coloris ${c.name}`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-white/30 block"
                  style={{ backgroundColor: c.hex }}
                />
              </button>
            );
          })}
          <span className="text-[10px] text-[#FFFFFF]/60 ml-1 truncate max-w-[130px]">
            {activeColor.name}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2 pt-3 border-t border-[#FFFFFF]/10">
          <span className="font-bold text-base tabular-nums text-[#FFFFFF]">
            {formatPrice(product.price)}
          </span>
          <Link
            to={`/produit/${product.slug}`}
            className="p-2.5 bg-[#FA5400] text-[#FFFFFF] rounded-xs hover:bg-[#E03A00] transition-colors flex items-center justify-center cursor-pointer shadow-xs"
            aria-label={`Voir ${product.name}`}
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);

  // Active testimonial carousel index
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Counter numbers state
  const [counts, setCounts] = useState({ km: 0, podiums: 0, hours: 0 });

  // 3 Testimonials
  const testimonials = [
    {
      name: 'Yannick Agossa',
      sport: 'Semi-Marathon & 10 km',
      city: 'Cotonou',
      quote: 'La Tempo 400 m’a permis de franchir la barre des 34 minutes sur 10 km. L’accroche sous le soleil de midi est constante du premier au dernier kilomètre.',
      model: 'Nike Tempo 400'
    },
    {
      name: 'Blandine Mensah',
      sport: 'Ultra-Trail & Nature',
      city: 'Dassa-Zoumè',
      quote: 'Sur les sentiers de collines et roches sèches, le Vireur Trail procure une sécurité d’appui totale. Zéro torsion de cheville.',
      model: 'Nike Vireur Trail'
    },
    {
      name: 'Ibrahim Touré',
      sport: 'Athlétisme Club 800m',
      city: 'Porto-Novo',
      quote: 'La rigidité de la plaque carbone sur l’AeroPulse Elite offre une relance explosive. C’est la chaussure de compétition la plus incisive que j’ai portée.',
      model: 'Nike AeroPulse Elite'
    }
  ];

  // GSAP Horizontal Scroll & Manifeste Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Horizontal scroll on the "Série" band
      if (horizontalSectionRef.current && horizontalTrackRef.current) {
        const track = horizontalTrackRef.current;
        const totalScroll = track.scrollWidth - window.innerWidth + 120;

        gsap.to(track, {
          x: () => -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            start: 'top top',
            end: () => `+=${totalScroll * 1.5}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${self.progress})`;
              }
            }
          }
        });
      }

      // 2. Manifeste word-by-word progressive fill
      if (manifestoRef.current) {
        const words = manifestoRef.current.querySelectorAll('.manifesto-word');
        gsap.fromTo(
          words,
          { color: 'rgba(17, 17, 17, 0.15)' },
          {
            color: 'rgba(17, 17, 17, 1)',
            stagger: 0.1,
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top 75%',
              end: 'bottom 40%',
              scrub: 0.5
            }
          }
        );
      }

      // 3. Counter trigger
      ScrollTrigger.create({
        trigger: '#counters-section',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(
            { km: 0, podiums: 0, hours: 0 },
            {
              km: 148500,
              podiums: 142,
              hours: 48,
              duration: 2.2,
              ease: 'power3.out',
              onUpdate: function () {
                const target = this.targets()[0] as { km: number; podiums: number; hours: number };
                setCounts({
                  km: Math.round(target.km),
                  podiums: Math.round(target.podiums),
                  hours: Math.round(target.hours)
                });
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main id="main-content" className="w-full relative overflow-x-hidden">
      {/* SECTION 1 : HERO « VERBE » NIKE */}
      <section className="relative min-h-[92vh] sm:min-h-screen pt-24 pb-16 flex flex-col justify-between overflow-hidden bg-[#F5F5F5] border-b border-[#E5E5E5]">
        {/* Giant Anton 2-Line Typography as Graphic Backdrop */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center">
          <div className="relative">
            {/* Top Subtitle / Reassurance */}
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FA5400]/10 text-[#FA5400] border border-[#FA5400]/25 text-xs font-bold uppercase tracking-widest rounded-2xs">
                <Flame className="w-3.5 h-3.5" /> Collection Running Nike 2026
              </span>
              <span className="text-xs font-semibold text-[#111111]/70 hidden sm:inline">
                Livraison Express · Retours Gratuits 30j
              </span>
            </div>

            {/* Line 1 */}
            <h1 className="font-anton text-[18vw] sm:text-[14vw] lg:text-[12vw] leading-[0.85] text-[#111111] tracking-tight select-none">
              COURS.
            </h1>

            {/* Line 2 with athlete positioned in front */}
            <div className="relative">
              <h2 className="font-anton text-[18vw] sm:text-[14vw] lg:text-[12vw] leading-[0.85] text-[#111111] tracking-tight select-none">
                RECOMMENCE.
              </h2>

              {/* Cutout Athlete with Halftone Raster Treatment */}
              <div className="absolute right-0 sm:right-8 -top-24 sm:-top-40 lg:-top-56 w-[65vw] sm:w-[45vw] lg:w-[35vw] max-w-[550px] pointer-events-none z-20">
                <div className="halftone-effect relative w-full h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=80"
                    alt="Athlète Nike en pleine accélération"
                    className="w-full h-auto object-cover filter contrast-125 grayscale-25"
                    style={{
                      clipPath: 'polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)'
                    }}
                  />
                  {/* Subtle orange lighting rim effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FA5400]/25 via-transparent to-transparent mix-blend-color" />
                </div>
              </div>

              {/* Rotating Circular Nike Orange & Volt Badge */}
              <div className="absolute left-2 sm:left-auto sm:right-[38vw] -top-8 sm:-top-16 z-30">
                <div
                  className="w-20 h-20 sm:w-28 sm:h-28 bg-[#FA5400] text-[#FFFFFF] rounded-full p-2 flex items-center justify-center text-center shadow-lg animate-spin"
                  style={{ animationDuration: '20s' }}
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="font-anton text-[11px] uppercase tracking-[0.22em] fill-[#FFFFFF]">
                      <textPath href="#circlePath" startOffset="0%">
                        • NIKE RUNNING • JUST DO IT • 2026
                      </textPath>
                    </text>
                  </svg>
                  <Zap className="w-5 h-5 absolute text-[#CCFF00]" />
                </div>
              </div>
            </div>

            {/* CTAs Below Headline */}
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 z-30 relative max-w-md">
              <Link
                to="/catalogue"
                className="px-8 py-4 bg-[#FA5400] text-[#FFFFFF] font-anton text-base tracking-wider uppercase text-center rounded-xs hover:bg-[#E03A00] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Découvrir la collection</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/catalogue?nouveautes=true"
                className="px-6 py-4 text-[#111111] hover:text-[#FA5400] font-semibold text-sm tracking-wider uppercase text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Voir les nouveautés</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Ticker bar */}
        <div className="w-full border-t border-[#E5E5E5] bg-white/60 py-2.5 px-4 sm:px-8 flex items-center justify-between text-xs text-[#111111]/80 font-medium">
          <span className="font-anton uppercase tracking-widest text-[#111111]">
            NIKE RUNNING — HAUTE PERFORMANCE 2026
          </span>
          <span className="hidden md:inline">
            ÉNERGIE EXPLOSIVE · FIBRE CARBONE · MOUSSE ZOOM
          </span>
          <span className="text-[#FA5400] font-bold">
            EXPÉDITION EXPRESS
          </span>
        </div>
      </section>

      {/* SECTION 2 : BANDE « SÉRIE » NIKE */}
      <section
        ref={horizontalSectionRef}
        className="relative bg-[#111111] text-[#FFFFFF] overflow-hidden py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FA5400]">
              Série de modèles exclusifs
            </span>
            <h3 className="font-anton text-3xl sm:text-5xl text-[#FFFFFF] mt-1">
              LA BANDE SÉRIE 01-06
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#FFFFFF]/60 max-w-xs text-right hidden sm:block">
            Défilement latéral continu · L’ADN de la vitesse Nike.
          </p>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="w-full bg-[#222222] h-1.5 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="bg-[#FA5400] h-full origin-left transition-transform duration-75"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>

        {/* Cards Track */}
        <div
          ref={horizontalTrackRef}
          className="flex gap-6 sm:gap-8 px-4 sm:px-12 w-max items-center"
        >
          {SERIES_PRODUCTS.map((product, idx) => (
            <HomeSerieCard key={product.id} product={product} idx={idx} />
          ))}
        </div>
      </section>

      {/* SECTION 3 : LE MANIFESTE NIKE */}
      <section className="py-24 sm:py-36 bg-[#FFFFFF] border-b border-[#E5E5E5] flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 text-center" ref={manifestoRef}>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FA5400] mb-6 inline-block">
            Le Manifeste Nike Rebuild
          </span>
          <h3 className="font-anton text-3xl sm:text-5xl lg:text-6xl leading-tight tracking-tight uppercase text-[#111111]">
            {[
              'LE', 'CORPS', 'SAIT', 'CE', 'QUE', 'L’ESPRIT', 'CHERCHE', ':',
              'LA', 'VITESSE', 'NE', 'MENT', 'JAMAIS,', 'CHAQUE', 'FOULÉE', 'ÉCRIT', 'TA', 'VICTOIRE.'
            ].map((word, i) => (
              <span
                key={i}
                className="manifesto-word inline-block mx-1.5 transition-colors duration-100"
              >
                {word}
              </span>
            ))}
          </h3>
        </div>
      </section>

      {/* SECTION 4 : MOSAÏQUE ASYMÉTRIQUE DES CATÉGORIES */}
      <section className="py-20 bg-[#F5F5F5] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FA5400]">
              Explorer par univers
            </span>
            <h3 className="font-anton text-3xl sm:text-4xl text-[#111111] mt-1">
              LES COLLECTIONS SPÉCIALISÉES NIKE
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Tile 1 : Homme */}
            <Link
              to="/catalogue?genre=homme"
              className="md:col-span-7 relative h-96 sm:h-[480px] bg-[#111111] rounded-xs overflow-hidden group shadow-xs focus-visible:outline-2 focus-visible:outline-[#FA5400]"
            >
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80"
                alt="Sprinteur masculin en séance d'intensité"
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <span className="text-xs font-bold uppercase text-[#FA5400] tracking-widest">Énergie & Puissance</span>
                <h4 className="font-anton text-3xl sm:text-4xl text-[#FFFFFF] mt-1 flex items-center justify-between">
                  <span>COLLECTION HOMME</span>
                  <ArrowRight className="w-6 h-6 text-[#FA5400] group-hover:translate-x-2 transition-transform" />
                </h4>
              </div>
            </Link>

            {/* Tile 2 : Femme */}
            <Link
              to="/catalogue?genre=femme"
              className="md:col-span-5 relative h-96 sm:h-[480px] bg-[#111111] rounded-xs overflow-hidden group shadow-xs focus-visible:outline-2 focus-visible:outline-[#FA5400]"
            >
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80"
                alt="Coureuse en mouvement dynamique"
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <span className="text-xs font-bold uppercase text-[#FA5400] tracking-widest">Fluidité & Vitesse</span>
                <h4 className="font-anton text-3xl sm:text-4xl text-[#FFFFFF] mt-1 flex items-center justify-between">
                  <span>COLLECTION FEMME</span>
                  <ArrowRight className="w-6 h-6 text-[#FA5400] group-hover:translate-x-2 transition-transform" />
                </h4>
              </div>
            </Link>

            {/* Tile 3 : Trail & Outdoor */}
            <Link
              to="/catalogue?usage=trail"
              className="md:col-span-5 relative h-80 sm:h-[380px] bg-[#111111] rounded-xs overflow-hidden group shadow-xs focus-visible:outline-2 focus-visible:outline-[#FA5400]"
            >
              <img
                src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80"
                alt="Sentiers trail et nature"
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <span className="text-xs font-bold uppercase text-[#FA5400] tracking-widest">Accroche Tout-Terrain</span>
                <h4 className="font-anton text-2xl sm:text-3xl text-[#FFFFFF] mt-1 flex items-center justify-between">
                  <span>TRAIL & OUTDOOR</span>
                  <ArrowRight className="w-5 h-5 text-[#FA5400] group-hover:translate-x-2 transition-transform" />
                </h4>
              </div>
            </Link>

            {/* Tile 4 : Vitesse & Piste */}
            <Link
              to="/catalogue?usage=piste"
              className="md:col-span-7 relative h-80 sm:h-[380px] bg-[#111111] rounded-xs overflow-hidden group shadow-xs focus-visible:outline-2 focus-visible:outline-[#FA5400]"
            >
              <img
                src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80"
                alt="Piste d'athlétisme et pointes"
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-transparent p-6 sm:p-8 flex flex-col justify-end">
                <span className="text-xs font-bold uppercase text-[#FA5400] tracking-widest">Pointes & Chrono</span>
                <h4 className="font-anton text-2xl sm:text-3xl text-[#FFFFFF] mt-1 flex items-center justify-between">
                  <span>PISTE & COMPÉTITION</span>
                  <ArrowRight className="w-5 h-5 text-[#FA5400] group-hover:translate-x-2 transition-transform" />
                </h4>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* EDITORIAL LOOKBOOK */}
      <section className="py-24 bg-[#111111] text-[#FFFFFF] border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FA5400] flex items-center gap-2">
                <Camera className="w-4 h-4" /> Le Mouvement sur le Terrain
              </span>
              <h3 className="font-anton text-3xl sm:text-5xl text-[#FFFFFF] mt-2">
                COMMUNAUTÉ NIKE EN ACTION
              </h3>
            </div>
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 text-sm font-anton uppercase text-[#FA5400] hover:text-[#FFFFFF] transition-colors"
            >
              <span>Rejoindre le peloton</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOOKBOOK_IMAGES.map((img, index) => (
              <div
                key={index}
                className="group relative h-80 sm:h-96 bg-[#1A1A1A] border border-[#FFFFFF]/10 rounded-xs overflow-hidden shadow-md"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/95 via-[#111111]/20 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FA5400]">
                    {img.tag}
                  </span>
                  <h4 className="font-anton text-2xl text-[#FFFFFF] mt-1 leading-tight">
                    {img.title}
                  </h4>
                  <p className="text-xs text-[#FFFFFF]/60 mt-1 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-[#CCFF00]" /> {img.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 : CHIFFRES CLÉS */}
      <section id="counters-section" className="py-20 bg-[#1A1A1A] text-[#FFFFFF] border-b border-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-6 border-b md:border-b-0 md:border-r border-[#FFFFFF]/10">
              <p className="font-anton text-5xl sm:text-6xl text-[#FA5400] tabular-nums">
                +{counts.km.toLocaleString('fr-FR')}
              </p>
              <p className="text-sm uppercase font-bold text-[#FFFFFF]/80 mt-2">
                Kilomètres parcourus en 2026
              </p>
              <p className="text-xs text-[#FFFFFF]/50 mt-1">
                Enregistrés par la communauté Nike Running
              </p>
            </div>

            <div className="p-6 border-b md:border-b-0 md:border-r border-[#FFFFFF]/10">
              <p className="font-anton text-5xl sm:text-6xl text-[#CCFF00] tabular-nums">
                {counts.podiums}
              </p>
              <p className="text-sm uppercase font-bold text-[#FFFFFF]/80 mt-2">
                Podiums & Records d’athlètes
              </p>
              <p className="text-xs text-[#FFFFFF]/50 mt-1">
                Courses sur route et marathons majeurs
              </p>
            </div>

            <div className="p-6">
              <p className="font-anton text-5xl sm:text-6xl text-[#FA5400] tabular-nums">
                {counts.hours}H
              </p>
              <p className="text-sm uppercase font-bold text-[#FFFFFF]/80 mt-2">
                Délai moyen de livraison garanti
              </p>
              <p className="text-xs text-[#FFFFFF]/50 mt-1">
                Expédition directe et prioritaire
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 : TÉMOIGNAGES */}
      <section className="py-20 bg-[#F5F5F5] border-b border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FA5400]">
                Retours d'athlètes
              </span>
              <h3 className="font-anton text-3xl sm:text-4xl text-[#111111] mt-1">
                PAROLES DE COUREURS
              </h3>
            </div>

            {/* Manual Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setActiveTestimonial((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  )
                }
                className="p-3 bg-white border border-[#111111] rounded-xs text-[#111111] hover:bg-[#FA5400] hover:text-[#FFFFFF] hover:border-[#FA5400] transition-colors cursor-pointer"
                aria-label="Témoignage précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setActiveTestimonial((prev) =>
                    prev === testimonials.length - 1 ? 0 : prev + 1
                  )
                }
                className="p-3 bg-white border border-[#111111] rounded-xs text-[#111111] hover:bg-[#FA5400] hover:text-[#FFFFFF] hover:border-[#FA5400] transition-colors cursor-pointer"
                aria-label="Témoignage suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonial Display Box */}
          <div className="bg-[#FFFFFF] border-2 border-[#111111] p-8 sm:p-12 shadow-sm relative">
            <span className="font-anton text-7xl text-[#E5E5E5] absolute top-4 right-6 select-none opacity-60">
              “
            </span>
            <div className="relative z-10 space-y-6">
              <p className="text-lg sm:text-2xl text-[#111111] leading-relaxed font-medium">
                « {testimonials[activeTestimonial].quote} »
              </p>

              <div className="pt-6 border-t border-[#E5E5E5] flex items-center justify-between">
                <div>
                  <h4 className="font-anton text-xl text-[#111111]">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-sm text-[#111111]/70">
                    {testimonials[activeTestimonial].sport} · {testimonials[activeTestimonial].city}
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#111111] text-[#CCFF00] font-anton text-sm rounded-2xs">
                  {testimonials[activeTestimonial].model}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 : CTA FINAL */}
      <section className="py-28 bg-[#111111] text-[#FFFFFF] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FA5400]">
            Prêt pour le départ
          </span>
          <h2 className="font-anton text-4xl sm:text-6xl lg:text-7xl leading-none text-[#FFFFFF] tracking-tight uppercase">
            TON PROCHAIN RECORD T'ATTEND.
          </h2>
          <p className="text-base sm:text-lg text-[#FFFFFF]/70 max-w-xl mx-auto">
            Trouve la paire Nike adaptée à ton terrain, ta distance et ta cadence.
          </p>
          <div className="pt-4">
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#FA5400] text-[#FFFFFF] font-anton text-lg tracking-wider uppercase rounded-xs hover:bg-[#E03A00] transition-colors shadow-lg hover:shadow-xl cursor-pointer"
            >
              <span>Accéder au catalogue complet</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
