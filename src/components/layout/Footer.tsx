/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Ruler, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { SizeGuideModal } from '../ui/SizeGuideModal';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  // Only links leading to real dedicated sections / filtered views
  const navigationColumns = [
    {
      title: 'Terrains & Usages',
      links: [
        { label: 'Chaussures Route', path: '/catalogue?usage=route' },
        { label: 'Chaussures Trail', path: '/catalogue?usage=trail' },
        { label: 'Spikes & Piste', path: '/catalogue?usage=piste' },
        { label: 'Récupération Active', path: '/catalogue?usage=recuperation' },
        { label: 'Nouveautés 2026', path: '/catalogue?nouveautes=true' }
      ]
    },
    {
      title: 'Collections',
      links: [
        { label: 'Collection Homme', path: '/catalogue?genre=homme' },
        { label: 'Collection Femme', path: '/catalogue?genre=femme' },
        { label: 'Modèles Populaires', path: '/catalogue?sort=populaires' },
        { label: 'Prix Croissants', path: '/catalogue?sort=prix-asc' },
        { label: 'Tout le Catalogue', path: '/catalogue' }
      ]
    },
    {
      title: 'Modèles Signature',
      links: [
        { label: 'Nike Tempo 400', path: '/produit/tempo-400' },
        { label: 'Nike Vireur Trail', path: '/produit/vireur-trail' },
        { label: 'Nike AeroPulse Elite', path: '/produit/aeropulse-elite' },
        { label: 'Nike Strata Glide', path: '/produit/strata-glide' },
        { label: 'Nike Rebound Recovery', path: '/produit/rebound-recovery' }
      ]
    }
  ];

  return (
    <footer className="bg-[#111111] text-[#FFFFFF] pt-16 pb-12 border-t border-[#222222] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#222222]">
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-[#FA5400] group">
              <span className="font-anton text-3xl sm:text-4xl tracking-wider text-[#FFFFFF] group-hover:text-[#FA5400] transition-colors">
                NIKE
              </span>
              <span className="px-1.5 py-0.5 bg-[#222222] text-[#CCFF00] font-anton text-[9px] uppercase tracking-widest rounded-2xs">
                REBUILD
              </span>
            </Link>
            <p className="text-[#FFFFFF]/70 text-sm max-w-sm leading-relaxed">
              Le mouvement d’abord. Performance brute, réactivité explosive et amorti de pointe conçus pour repousser vos records.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#1A1A1A] p-6 sm:p-8 rounded-xs border border-[#FFFFFF]/10">
            <h4 className="font-anton text-xl tracking-wider uppercase text-[#FFFFFF] flex items-center gap-2">
              <span>REJOIGNEZ NIKE RUNNING</span>
              <span className="px-2 py-0.5 bg-[#FA5400] text-[#FFFFFF] text-[10px] rounded-2xs font-anton">VIP</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#FFFFFF]/70 mt-1 mb-4">
              Recevez en avant-première nos lancements exclusifs, coloris limités et accès aux sessions d'entraînement.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-900/40 border border-emerald-500/50 text-emerald-200 text-sm flex items-center gap-2 rounded-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Bienvenue chez Nike ! Vous êtes désormais inscrit aux lancements prioritaires.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#111111] border border-[#FFFFFF]/20 text-[#FFFFFF] px-4 py-3 text-sm flex-1 focus:outline-none focus:border-[#FA5400] rounded-xs"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#FA5400] text-[#FFFFFF] font-anton text-sm tracking-wider uppercase hover:bg-[#E03A00] transition-colors flex items-center justify-center gap-2 rounded-xs cursor-pointer shadow-xs"
                >
                  <span>S'inscrire</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-[#FFFFFF]/40 mt-2">
              Pas de spam. Désabonnement en un clic à tout moment.
            </p>
          </div>
        </div>

        {/* Dedicated Navigation Columns + Interactive Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {navigationColumns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h5 className="font-anton text-base tracking-wider text-[#FFFFFF]">
                {col.title}
              </h5>
              <ul className="space-y-2 text-sm text-[#FFFFFF]/70">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="hover:text-[#FA5400] transition-colors focus-visible:outline-1 focus-visible:outline-[#FA5400] block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 4th Column: Interactive Services & Size Guide */}
          <div className="space-y-4">
            <h5 className="font-anton text-base tracking-wider text-[#FFFFFF]">
              Services & Outils
            </h5>
            <div className="space-y-2.5 text-xs text-[#FFFFFF]/80">
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="w-full text-left p-3 bg-[#1A1A1A] hover:bg-[#222222] border border-[#FFFFFF]/10 hover:border-[#FA5400] rounded-xs transition-colors flex items-center gap-2.5 cursor-pointer text-[#FFFFFF] group"
              >
                <Ruler className="w-4 h-4 text-[#FA5400] shrink-0" />
                <div>
                  <p className="font-anton text-sm text-[#FFFFFF] group-hover:text-[#FA5400]">Guide des Pointures</p>
                  <p className="text-[11px] text-[#FFFFFF]/60">Tableau de correspondance EU/US/CM</p>
                </div>
              </button>

              <div className="p-3 bg-[#1A1A1A] border border-[#FFFFFF]/10 rounded-xs flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <div>
                  <p className="font-semibold text-xs text-[#FFFFFF]">Expédition Express 24-48h</p>
                  <p className="text-[11px] text-[#FFFFFF]/60">Suivi SMS & appel coursier</p>
                </div>
              </div>

              <div className="p-3 bg-[#1A1A1A] border border-[#FFFFFF]/10 rounded-xs flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#FA5400] shrink-0" />
                <div>
                  <p className="font-semibold text-xs text-[#FFFFFF]">Retours Gratuits 30 Jours</p>
                  <p className="text-[11px] text-[#FFFFFF]/60">Échange simple de pointure</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="pt-8 mt-8 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFFFFF]/50">
          <p>© {new Date().getFullYear()} NIKE, Inc. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span>Performance & Innovation Sportswear</span>
            <span>·</span>
            <span>Just Do It.</span>
          </div>
        </div>
      </div>

      {/* Global Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </footer>
  );
};
