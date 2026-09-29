/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPrice } from '../../data/products';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal, clearCart } = useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const subtotal = getSubtotal();
  const freeShippingThreshold = 100000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Close on Escape & trap focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      setOrderConfirmed(false);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setOrderConfirmed(true);
  };

  const handleFinish = () => {
    clearCart();
    setOrderConfirmed(false);
    closeCart();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#111111]/70 backdrop-blur-xs flex justify-end transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Panier d'achat Nike"
      onClick={closeCart}
    >
      <div
        ref={drawerRef}
        className="w-full max-w-md bg-[#FFFFFF] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-2">
            <h2 className="font-anton text-2xl tracking-wider text-[#111111]">
              VOTRE PANIER NIKE
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 bg-[#111111] text-[#CCFF00] rounded-2xs font-anton">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-[#111111] hover:text-[#FA5400] transition-colors rounded-xs focus-visible:outline-2 focus-visible:outline-[#FA5400] cursor-pointer"
            aria-label="Fermer le panier"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="bg-[#F5F5F5] px-6 py-3 border-b border-[#E5E5E5] text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-[#111111] mb-1.5 font-medium">
              Plus que <span className="font-bold text-[#FA5400] tabular-nums">{formatPrice(remainingForFreeShipping)}</span> pour la livraison offerte !
            </p>
          ) : (
            <p className="text-[#111111] font-bold text-emerald-700 mb-1.5 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Livraison offerte activée sur votre commande !
            </p>
          )}
          <div className="w-full bg-[#E5E5E5] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#FA5400] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List or Order Confirmed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orderConfirmed ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#CCFF00]/30 text-[#111111] border-2 border-[#111111] rounded-full flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-[#111111]" />
              </div>
              <h3 className="font-anton text-2xl text-[#111111] uppercase">
                COMMANDE NIKE VALIDÉE !
              </h3>
              <p className="text-sm text-[#111111]/80 max-w-xs leading-relaxed">
                Votre commande a été transmise à notre service logistique. Vous recevrez un SMS avec votre numéro de suivi en direct.
              </p>
              <div className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xs w-full text-xs space-y-1.5 text-left">
                <div className="flex justify-between font-semibold text-[#111111]">
                  <span>Référence Nike :</span>
                  <span className="font-anton text-[#FA5400]">NK-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between text-[#111111]/70">
                  <span>Délai d'expédition :</span>
                  <span>24-48h ouvrées</span>
                </div>
                <div className="flex justify-between text-[#111111]/70">
                  <span>Paiement :</span>
                  <span>À la livraison</span>
                </div>
              </div>
              <button
                onClick={handleFinish}
                className="w-full mt-4 py-3.5 bg-[#FA5400] text-[#FFFFFF] font-anton text-sm tracking-wider uppercase rounded-xs hover:bg-[#E03A00] transition-colors cursor-pointer shadow-xs"
              >
                Continuer mes achats
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#111111]/60">
              <div className="w-16 h-16 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full flex items-center justify-center mb-4 text-[#111111]">
                <Truck className="w-8 h-8 opacity-40" />
              </div>
              <p className="font-anton text-xl text-[#111111] uppercase">Votre panier Nike est vide</p>
              <p className="text-sm mt-1 text-[#111111]/70 max-w-xs">
                Chaque grand run commence par un premier pas. Découvrez nos dernières innovations running.
              </p>
              <Link
                to="/catalogue"
                onClick={closeCart}
                className="mt-6 px-6 py-3 bg-[#FA5400] text-[#FFFFFF] font-anton text-sm tracking-wider uppercase rounded-xs hover:bg-[#E03A00] transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>Découvrir la collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const itemKey = `${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`;
              return (
                <div
                  key={itemKey}
                  className="flex gap-4 p-3.5 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xs shadow-2xs"
                >
                  <img
                    src={item.selectedColor.image || item.product.gallery[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-[#FFFFFF] border border-[#E5E5E5] rounded-xs shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-anton text-base text-[#111111] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            removeItem(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name
                            )
                          }
                          className="text-[#111111]/40 hover:text-[#FA5400] p-1 transition-colors cursor-pointer"
                          aria-label={`Supprimer ${item.product.name} du panier`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#111111]/70 mt-0.5">
                        Pointure : <span className="font-semibold text-[#111111]">{item.selectedSize}</span> · {item.selectedColor.name}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E5E5E5]">
                      {/* Quantity switcher */}
                      <div className="flex items-center border border-[#E5E5E5] rounded-xs bg-[#FFFFFF]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity - 1
                            )
                          }
                          className="p-1 text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold tabular-nums text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity + 1
                            )
                          }
                          className="p-1 text-[#111111] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-sm tabular-nums text-[#FA5400]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Actions */}
        {!orderConfirmed && items.length > 0 && (
          <div className="p-6 bg-[#FFFFFF] border-t border-[#E5E5E5] space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#111111]/70">
                <span>Sous-total</span>
                <span className="font-semibold tabular-nums text-[#111111]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#111111]/70">
                <span>Frais d'expédition estimés</span>
                <span className="font-semibold text-emerald-700">
                  {remainingForFreeShipping === 0 ? 'Offerts' : '2\u00A0500\u00A0FCFA'}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E5E5E5] flex justify-between font-anton text-lg text-[#111111]">
                <span>TOTAL</span>
                <span className="text-[#FA5400] tabular-nums">
                  {formatPrice(
                    subtotal + (remainingForFreeShipping === 0 ? 0 : 2500)
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-[#FA5400] text-[#FFFFFF] font-anton text-base tracking-wider uppercase rounded-xs hover:bg-[#E03A00] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Valider ma commande</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-[#111111]/60 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Paiement 100% Sécurisé
              </span>
              <span>·</span>
              <span>Retours gratuits 30j</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
