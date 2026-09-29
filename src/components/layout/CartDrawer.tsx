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
      className="fixed inset-0 z-50 bg-[#262421]/60 backdrop-blur-xs flex justify-end transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Panier d'achat"
      onClick={closeCart}
    >
      <div
        ref={drawerRef}
        className="w-full max-w-md bg-[#F5F3EE] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="p-6 border-b border-[#E4E0D6] flex items-center justify-between bg-[#F5F3EE]">
          <div className="flex items-center gap-2">
            <h2 className="font-anton text-2xl tracking-wider text-[#201C18]">
              VOTRE PANIER
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 bg-[#E4E0D6] rounded-xs text-[#201C18]">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-[#201C18] hover:text-[#C23B2E] transition-colors rounded-xs focus-visible:outline-2 focus-visible:outline-[#C23B2E]"
            aria-label="Fermer le panier"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="bg-[#E4E0D6]/40 px-6 py-3 border-b border-[#E4E0D6] text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-[#201C18] mb-1.5 font-medium">
              Plus que <span className="font-bold text-[#C23B2E] tabular-nums">{formatPrice(remainingForFreeShipping)}</span> pour la livraison offerte !
            </p>
          ) : (
            <p className="text-[#201C18] font-bold text-emerald-800 mb-1.5 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Livraison offerte activée sur votre commande !
            </p>
          )}
          <div className="w-full bg-[#E4E0D6] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C23B2E] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List or Order Confirmed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orderConfirmed ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-anton text-2xl text-[#201C18] uppercase">
                COMMANDE ENREGISTRÉE !
              </h3>
              <p className="text-sm text-[#262421]/80 max-w-xs leading-relaxed">
                Votre commande a été transmise à notre atelier. Un coursier prendra contact avec vous sous 24 à 48h pour la livraison.
              </p>
              <div className="p-4 bg-white border border-[#E4E0D6] rounded-xs w-full text-xs space-y-1.5 text-left">
                <div className="flex justify-between font-semibold text-[#201C18]">
                  <span>Référence :</span>
                  <span className="font-anton text-[#C23B2E]">REB-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between text-[#262421]/70">
                  <span>Délai estimé :</span>
                  <span>24-48h ouvrées</span>
                </div>
                <div className="flex justify-between text-[#262421]/70">
                  <span>Paiement :</span>
                  <span>À la livraison</span>
                </div>
              </div>
              <button
                onClick={handleFinish}
                className="w-full mt-4 py-3.5 bg-[#C23B2E] text-[#F5F3EE] font-anton text-sm tracking-wider uppercase rounded-xs hover:bg-[#a83327] transition-colors"
              >
                Continuer mes achats
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#262421]/60">
              <div className="w-16 h-16 bg-[#E4E0D6] rounded-full flex items-center justify-center mb-4 text-[#201C18]">
                <Truck className="w-8 h-8 opacity-40" />
              </div>
              <p className="font-anton text-xl text-[#201C18] uppercase">Votre panier est vide</p>
              <p className="text-sm mt-1 text-[#262421]/70 max-w-xs">
                Chaque grand run commence par un premier pas. Découvrez notre sélection running.
              </p>
              <Link
                to="/catalogue"
                onClick={closeCart}
                className="mt-6 px-6 py-3 bg-[#C23B2E] text-[#F5F3EE] font-anton text-sm tracking-wider uppercase rounded-xs hover:bg-[#a83327] transition-colors flex items-center gap-2"
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
                  className="flex gap-4 p-3 bg-white border border-[#E4E0D6] rounded-xs shadow-2xs"
                >
                  <img
                    src={item.selectedColor.image || item.product.gallery[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-[#F5F3EE] border border-[#E4E0D6] rounded-xs shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-anton text-base text-[#201C18] truncate">
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
                          className="text-[#262421]/40 hover:text-[#C23B2E] p-1 transition-colors"
                          aria-label={`Supprimer ${item.product.name} du panier`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#262421]/70 mt-0.5">
                        Pointure : <span className="font-semibold text-[#201C18]">{item.selectedSize}</span> · {item.selectedColor.name}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#E4E0D6]/50">
                      {/* Quantity switcher */}
                      <div className="flex items-center border border-[#E4E0D6] rounded-xs bg-[#F5F3EE]">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity - 1
                            )
                          }
                          className="p-1 text-[#201C18] hover:bg-[#E4E0D6] transition-colors"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold tabular-nums text-[#201C18]">
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
                          className="p-1 text-[#201C18] hover:bg-[#E4E0D6] transition-colors"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-sm tabular-nums text-[#C23B2E]">
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
          <div className="p-6 bg-[#F5F3EE] border-t border-[#E4E0D6] space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#262421]/70">
                <span>Sous-total</span>
                <span className="font-semibold tabular-nums text-[#201C18]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#262421]/70">
                <span>Frais d'expédition estimés</span>
                <span className="font-semibold text-emerald-800">
                  {remainingForFreeShipping === 0 ? 'Offerts' : '2\u00A0500\u00A0FCFA'}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E4E0D6] flex justify-between font-anton text-lg text-[#201C18]">
                <span>TOTAL</span>
                <span className="text-[#C23B2E] tabular-nums">
                  {formatPrice(
                    subtotal + (remainingForFreeShipping === 0 ? 0 : 2500)
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-[#C23B2E] text-[#F5F3EE] font-anton text-base tracking-wider uppercase rounded-xs hover:bg-[#a83327] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Valider ma commande</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-[#262421]/60 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Paiement 100% Sécurisé
              </span>
              <span>·</span>
              <span>Retours gratuits 14j</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
