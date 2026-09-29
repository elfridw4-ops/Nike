/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, CheckCircle2, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: number) => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, onSelectSize }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeTable = [
    { eu: 36, usM: '4', usW: '5.5', uk: '3.5', cm: '22.5' },
    { eu: 37, usM: '5', usW: '6.5', uk: '4.5', cm: '23.5' },
    { eu: 38, usM: '5.5', usW: '7', uk: '5', cm: '24.0' },
    { eu: 39, usM: '6.5', usW: '8', uk: '6', cm: '24.5' },
    { eu: 40, usM: '7', usW: '8.5', uk: '6', cm: '25.0' },
    { eu: 41, usM: '8', usW: '9.5', uk: '7', cm: '26.0' },
    { eu: 42, usM: '8.5', usW: '10', uk: '7.5', cm: '26.5' },
    { eu: 43, usM: '9.5', usW: '11', uk: '8.5', cm: '27.5' },
    { eu: 44, usM: '10', usW: '11.5', uk: '9', cm: '28.0' },
    { eu: 45, usM: '11', usW: '12.5', uk: '10', cm: '29.0' },
    { eu: 46, usM: '12', usW: '13.5', uk: '11', cm: '30.0' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#111111]/80 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Guide officiel des pointures Nike"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FFFFFF] border-2 border-[#111111] p-6 sm:p-8 rounded-xs shadow-2xl overflow-y-auto max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-2">
            <Ruler className="w-6 h-6 text-[#FA5400]" />
            <h3 className="font-anton text-2xl tracking-wider text-[#111111]">
              GUIDE OFFICIEL DES POINTURES NIKE
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#111111] hover:text-[#FA5400] transition-colors rounded-xs cursor-pointer"
            aria-label="Fermer le guide des pointures"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tip Box */}
        <div className="my-5 p-4 bg-[#F5F5F5] border-l-4 border-[#FA5400] text-xs text-[#111111]/80 space-y-1">
          <p className="font-bold text-[#111111] uppercase flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#FA5400]" /> Conseil pour la course à pied :
          </p>
          <p>
            Pour les chaussures de compétition (mousse ZoomX ou plaque carbone Flyplate), nous vous recommandons de prendre votre pointure habituelle. Pour les modèles de trail longue distance, prévoyez une demi-pointure au-dessus pour laisser de l'espace à l'avant-pied lors des descentes.
          </p>
        </div>

        {/* Conversion Table */}
        <div className="overflow-x-auto border border-[#E5E5E5] rounded-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#111111] text-[#FFFFFF] font-anton uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Pointure EU</th>
                <th className="py-3 px-4">US Homme</th>
                <th className="py-3 px-4">US Femme</th>
                <th className="py-3 px-4">UK</th>
                <th className="py-3 px-4">Longueur (cm)</th>
                {onSelectSize && <th className="py-3 px-4 text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] text-[#111111]">
              {sizeTable.map((row) => (
                <tr key={row.eu} className="hover:bg-[#F5F5F5] transition-colors">
                  <td className="py-2.5 px-4 font-anton text-base text-[#FA5400] tabular-nums">{row.eu}</td>
                  <td className="py-2.5 px-4 tabular-nums">{row.usM}</td>
                  <td className="py-2.5 px-4 tabular-nums">{row.usW}</td>
                  <td className="py-2.5 px-4 tabular-nums">{row.uk}</td>
                  <td className="py-2.5 px-4 font-semibold tabular-nums">{row.cm} cm</td>
                  {onSelectSize && (
                    <td className="py-2.5 px-4 text-right">
                      <button
                        onClick={() => {
                          onSelectSize(row.eu);
                          onClose();
                        }}
                        className="px-2.5 py-1 bg-[#111111] text-[#FFFFFF] hover:bg-[#FA5400] text-xs font-anton uppercase rounded-2xs cursor-pointer transition-colors"
                      >
                        Choisir
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#111111]/60 pt-4 border-t border-[#E5E5E5]">
          <span>Échange gratuit sous 30 jours si la pointure ne convient pas</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#FA5400] text-[#FFFFFF] font-anton text-xs uppercase tracking-wider rounded-xs hover:bg-[#E03A00] transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
