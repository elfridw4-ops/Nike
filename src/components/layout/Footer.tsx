/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const columns = [
    {
      title: 'Produits',
      links: [
        { label: 'Chaussures Route', path: '/catalogue?usage=route' },
        { label: 'Chaussures Trail', path: '/catalogue?usage=trail' },
        { label: 'Spikes & Piste', path: '/catalogue?usage=piste' },
        { label: 'Récupération', path: '/catalogue?usage=recuperation' },
        { label: 'Nouveautés 2026', path: '/catalogue?nouveautes=true' },
        { label: 'Toutes les collections', path: '/catalogue' }
      ]
    },
    {
      title: 'Aide & Conseils',
      links: [
        { label: 'Guide des pointures', path: '/catalogue' },
        { label: 'Suivi de commande', path: '/catalogue' },
        { label: 'Livraison & Délais', path: '/catalogue' },
        { label: 'Retours sous 14 jours', path: '/catalogue' },
        { label: 'Foire aux questions (FAQ)', path: '/catalogue' },
        { label: 'Nous contacter', path: '/catalogue' }
      ]
    },
    {
      title: 'Communauté',
      links: [
        { label: 'Rebuild Running Club', path: '/catalogue' },
        { label: 'Sessions Cotonou', path: '/catalogue' },
        { label: 'Programme Ambassadeurs', path: '/catalogue' },
        { label: 'Événements & Courses', path: '/catalogue' },
        { label: 'Stories d’athlètes', path: '/catalogue' }
      ]
    },
    {
      title: 'Légal & Éthique',
      links: [
        { label: 'Conditions Générales (CGV)', path: '/catalogue' },
        { label: 'Politique de confidentialité', path: '/catalogue' },
        { label: 'Gestion des cookies', path: '/catalogue' },
        { label: 'Transparence & Matériaux', path: '/catalogue' },
        { label: 'Mentions légales', path: '/catalogue' }
      ]
    }
  ];

  return (
    <footer className="bg-[#201C18] text-[#F5F3EE] pt-16 pb-12 border-t border-[#262421] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-[#262421]/60">
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#C23B2E]">
              <span className="font-anton text-3xl sm:text-4xl tracking-wider text-[#F5F3EE]">
                REBUILD
              </span>
              <span className="w-2.5 h-2.5 bg-[#C23B2E] rounded-full inline-block"></span>
            </Link>
            <p className="text-[#F5F3EE]/70 text-sm max-w-sm leading-relaxed">
              Le mouvement d’abord. Performance, géométrie et vitesse conçues pour les coureurs urbains et tout-terrain.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#262421] p-6 sm:p-8 rounded-xs border border-[#F5F3EE]/10">
            <h4 className="font-anton text-xl tracking-wider uppercase text-[#F5F3EE]">
              REJOIGNEZ LE PELOTON D’ÉLITE
            </h4>
            <p className="text-xs sm:text-sm text-[#F5F3EE]/70 mt-1 mb-4">
              Recevez en avant-première nos lancements de séries limitées et invitations aux sessions running.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-900/40 border border-emerald-500/50 text-emerald-200 text-sm flex items-center gap-2 rounded-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Merci ! Vous êtes inscrit aux alertes exclusives REBUILD.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Votre adresse email professionnelle ou personnelle"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#201C18] border border-[#F5F3EE]/20 text-[#F5F3EE] px-4 py-3 text-sm flex-1 focus:outline-none focus:border-[#C23B2E] rounded-xs"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C23B2E] text-[#F5F3EE] font-anton text-sm tracking-wider uppercase hover:bg-[#a83327] transition-colors flex items-center justify-center gap-2 rounded-xs"
                >
                  <span>S'inscrire</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-[#F5F3EE]/40 mt-2">
              Pas de spam. Désabonnement en un clic à tout moment.
            </p>
          </div>
        </div>

        {/* 4 Columns (max 6 links per column) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h5 className="font-anton text-base tracking-wider text-[#F5F3EE]">
                {col.title}
              </h5>
              <ul className="space-y-2 text-sm text-[#F5F3EE]/70">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="hover:text-[#C23B2E] transition-colors focus-visible:outline-1 focus-visible:outline-[#C23B2E]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="pt-8 mt-8 border-t border-[#262421]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F3EE]/50">
          <p>© {new Date().getFullYear()} REBUILD Sportswear. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span>Atelier & Distribution : Cotonou, Bénin</span>
            <span>·</span>
            <span>Performance Lab</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
