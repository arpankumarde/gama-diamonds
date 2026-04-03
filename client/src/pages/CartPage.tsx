import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { useCurrency } from "@/contexts/storefront/CurrencyContext";

export default function CartPage() {
  const [orderNote, setOrderNote] = useState("");
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const { formatPriceFromUSD } = useCurrency();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen bg-white px-4 py-8 md:px-10 md:py-12 border-t border-brand-gold/10">
      <div className="mx-auto max-w-[1620px]">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
            <p className="text-[13px] tracking-[4px] uppercase text-brand-gold/70">Your Selection</p>
            <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
          </div>
          <h1 className="text-[24px] md:text-[32px] tracking-[6px] md:tracking-[8px] uppercase font-light">
            <span className="text-[#111]">Shopping </span>
            <span className="text-brand-gold">Cart</span>
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm border border-brand-gold/15 rounded-2xl shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_20px_50px_rgba(0,0,0,0.10)] px-8 md:px-12 py-16 md:py-20 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-green/10 mx-auto flex items-center justify-center mb-6 md:mb-8">
              <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-brand-green" strokeWidth={1.5} />
            </div>
            <h2 className="text-[18px] md:text-[22px] tracking-[4px] uppercase font-light text-[#111] mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-[14px] md:text-[15px] text-black/60 mb-8 md:mb-10 leading-6">
              Discover our exquisite collection of diamonds and fine jewelry
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-brand-gold text-brand-green px-8 md:px-10 py-4 md:py-5 text-[12px] md:text-[13px] tracking-[3px] uppercase font-semibold rounded-lg hover:bg-brand-gold-soft hover:shadow-[0_8px_24px_rgba(211,160,42,0.25)] transition duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Header */}
            <div className="hidden border-b border-brand-gold/20 pb-6 md:grid md:grid-cols-[1.5fr_280px_160px] md:gap-8 bg-white px-6 md:px-8">
              <p className="text-[12px] md:text-[13px] tracking-[3px] md:tracking-[4px] uppercase text-brand-green font-medium">Product</p>
              <p className="text-[12px] md:text-[13px] tracking-[3px] md:tracking-[4px] uppercase text-brand-green font-medium text-center">Quantity</p>
              <p className="text-[12px] md:text-[13px] tracking-[3px] md:tracking-[4px] uppercase text-brand-green font-medium text-right">Total</p>
            </div>

            {/* Cart Items */}
            <div className="bg-white border border-brand-gold/15 rounded-2xl shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_20px_50px_rgba(0,0,0,0.10)] divide-y divide-brand-gold/30">
              {items.map((item, index) => (
                <div key={item.id} className={`grid gap-4 p-6 md:p-8 md:grid-cols-[1.5fr_280px_160px] md:items-center md:gap-8 ${index === 0 ? 'rounded-t-2xl' : ''} ${index === items.length - 1 ? 'rounded-b-2xl' : ''}`}>
                  <div className="grid grid-cols-[110px_1fr] items-start gap-4 md:grid-cols-[180px_1fr] md:gap-8">
                    <Link to={`/product/${item.productSlug}`} className="block group">
                      <div className="overflow-hidden rounded-xl border border-brand-gold/10 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="h-[110px] w-full object-cover md:h-[180px] transition-transform duration-500 group-hover:scale-105" 
                        />
                      </div>
                    </Link>

                    <Link to={`/product/${item.productSlug}`} className="block group">
                      <div>
                        <h3 className="text-[14px] md:text-[16px] leading-[1.4] tracking-[2px] md:tracking-[3px] uppercase font-light text-[#111] group-hover:text-brand-gold transition duration-300">
                          {item.title}
                        </h3>
                        <div className="mt-3 md:mt-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                            <p className="text-[11px] md:text-[12px] tracking-[2px] uppercase text-black/60">
                              {item.diamondType} Diamond
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                            <p className="text-[11px] md:text-[12px] text-black/60">{item.metal}</p>
                          </div>
                          {item.size && (
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                              <p className="text-[11px] md:text-[12px] text-black/60">Size: {item.size}</p>
                            </div>
                          )}
                        </div>
                        <p className="mt-4 md:mt-5 text-[15px] md:text-[18px] tracking-[2px] md:tracking-[3px] font-medium text-brand-green">
                          {formatPriceFromUSD(item.price)}
                        </p>

                        {/* Mobile Quantity Controls */}
                        <div className="mt-6 flex items-center justify-between md:hidden">
                          <div className="flex items-center border border-brand-gold/20 rounded-lg bg-white">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.preventDefault();
                                updateQuantity(item.id, item.quantity - 1);
                              }}
                              className="p-3 text-brand-green hover:text-brand-gold transition duration-300"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} strokeWidth={2} />
                            </button>
                            <span className="mx-4 min-w-8 text-center text-[16px] font-medium text-[#111]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.preventDefault();
                                updateQuantity(item.id, item.quantity + 1);
                              }}
                              className="p-3 text-brand-green hover:text-brand-gold transition duration-300"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} strokeWidth={2} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              removeItem(item.id);
                            }}
                            className="flex items-center gap-2 text-[11px] tracking-[2px] uppercase text-red-500 hover:text-red-600 transition duration-300"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Desktop Quantity Controls */}
                  <div className="hidden md:flex md:flex-col md:items-center md:gap-4">
                    <div className="flex items-center border border-brand-gold/20 rounded-lg bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-4 text-brand-green hover:text-brand-gold transition duration-300"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={20} strokeWidth={2} />
                      </button>
                      <span className="mx-6 min-w-10 text-center text-[18px] font-medium text-[#111]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-4 text-brand-green hover:text-brand-gold transition duration-300"
                        aria-label="Increase quantity"
                      >
                        <Plus size={20} strokeWidth={2} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-2 text-[12px] tracking-[3px] uppercase text-red-500 hover:text-red-600 transition duration-300"
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                      Remove
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-left md:text-right">
                    <p className="text-[16px] md:text-[18px] tracking-[3px] md:tracking-[4px] font-medium text-brand-green">
                      {formatPriceFromUSD(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="mt-12 md:mt-16 grid gap-10 lg:grid-cols-[1fr_480px] lg:items-start">
              {/* Order Note */}
              <div className="bg-white border border-brand-gold/15 rounded-2xl shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_20px_50px_rgba(0,0,0,0.10)] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                  <span className="block w-6 h-[1px] bg-brand-gold"></span>
                  <label htmlFor="order-note" className="text-[14px] md:text-[16px] tracking-[2px] uppercase font-medium text-brand-green">
                    Add Order Note
                  </label>
                </div>
                <textarea
                  id="order-note"
                  value={orderNote}
                  onChange={(event) => setOrderNote(event.target.value)}
                  placeholder="Please add any special instructions or requests here..."
                  className="min-h-[160px] md:min-h-[180px] w-full border border-brand-gold/20 bg-white rounded-lg px-4 md:px-6 py-4 md:py-5 text-[14px] md:text-[15px] text-[#111] placeholder:text-black/40 outline-none focus:border-brand-gold/60 transition duration-300 resize-none"
                />
              </div>

              {/* Order Summary */}
              <div className="bg-white border border-brand-gold/15 rounded-2xl shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_20px_50px_rgba(0,0,0,0.10)] p-6 md:p-8 lg:justify-self-end">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <span className="block w-6 h-[1px] bg-brand-gold"></span>
                  <h3 className="text-[14px] md:text-[16px] tracking-[2px] uppercase font-medium text-brand-green">
                    Order Summary
                  </h3>
                </div>
                
                <div className="space-y-4 mb-6 md:mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] md:text-[14px] text-black/60">Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                    <span className="text-[14px] md:text-[15px] font-medium text-[#111]">{formatPriceFromUSD(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] md:text-[14px] text-black/60">Shipping</span>
                    <span className="text-[14px] md:text-[15px] font-medium text-brand-gold">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] md:text-[14px] text-black/60">Tax</span>
                    <span className="text-[14px] md:text-[15px] font-medium text-brand-gold">Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-brand-gold/20 pt-4 mb-6 md:mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[16px] md:text-[18px] tracking-[3px] uppercase font-medium text-brand-green">Total</span>
                    <span className="text-[18px] md:text-[20px] tracking-[3px] font-semibold text-brand-green">{formatPriceFromUSD(subtotal)}</span>
                  </div>
                </div>
                
                <button className="w-full bg-brand-gold text-brand-green px-8 md:px-10 py-4 md:py-5 text-[12px] md:text-[13px] tracking-[3px] md:tracking-[4px] uppercase font-semibold rounded-lg hover:bg-brand-gold-soft hover:shadow-[0_8px_24px_rgba(211,160,42,0.25)] transition duration-300">
                  Proceed to Checkout
                </button>
                
                <Link 
                  to="/products"
                  className="block w-full text-center mt-4 text-[11px] md:text-[12px] tracking-[2px] uppercase text-brand-green hover:text-brand-gold transition duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
