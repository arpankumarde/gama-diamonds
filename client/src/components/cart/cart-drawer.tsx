import { Link } from "react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "./cart-context";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useCurrency } from "@/contexts/storefront/CurrencyContext";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    subtotal,
    openCart,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();
  const { formatPriceFromUSD } = useCurrency();

  const handleDrawerNavigation = () => {
    closeCart();
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-[450px] border-l border-brand-gold/20 bg-white p-0"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-brand-green border-b border-brand-gold/30 px-4 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="block w-5 h-[1px] bg-brand-gold/60"></span>
              <h2 className="text-[16px] sm:text-[18px] font-light tracking-[4px] uppercase text-white">Cart</h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="text-brand-gold hover:text-white transition duration-300 cursor-pointer"
              aria-label="Close cart"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center gap-4">
                <p className="text-[13px] tracking-[3px] uppercase text-black/50">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] items-start gap-4 sm:gap-5 pb-6 border-b border-brand-gold/10 last:border-0">
                    {/* Image */}
                    <Link
                      to={`/product/${item.productSlug}`}
                      className="block group"
                      onClick={handleDrawerNavigation}
                    >
                      <div className="aspect-square overflow-hidden rounded-lg border border-brand-gold/15 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex flex-col min-w-0">
                      <Link
                        to={`/product/${item.productSlug}`}
                        onClick={handleDrawerNavigation}
                      >
                        <p className="text-[11px] sm:text-[12px] leading-tight tracking-[2px] uppercase text-brand-gold hover:text-brand-green transition duration-300 break-words">
                          {item.title}
                        </p>
                      </Link>

                      <div className="mt-2 space-y-1">
                        <p className="text-[10px] sm:text-[11px] tracking-[1px] uppercase text-black/50">
                          {item.diamondType} Diamond
                        </p>
                        <p className="text-[10px] sm:text-[11px] tracking-[1px] text-black/50">{item.metal}</p>
                        {item.size && <p className="text-[10px] sm:text-[11px] tracking-[1px] text-black/50">Size: {item.size}</p>}
                      </div>

                      <p className="mt-2 text-[13px] sm:text-[14px] font-medium text-brand-green">
                        {formatPriceFromUSD(item.price)}
                      </p>

                      <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                        {/* Quantity */}
                        <div className="flex h-[30px] sm:h-[34px] items-center border border-brand-gold/20 rounded-lg px-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-brand-green hover:text-brand-gold transition duration-200"
                          >
                            <Minus size={12} strokeWidth={2} />
                          </button>
                          <span className="mx-2 sm:mx-3 min-w-[15px] text-center text-[12px] sm:text-[13px] text-[#111]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-brand-green hover:text-brand-gold transition duration-200"
                          >
                            <Plus size={12} strokeWidth={2} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[10px] tracking-[2px] uppercase text-red-400 hover:text-red-500 transition duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-brand-gold/15 px-4 py-6 sm:px-6 bg-white">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[12px] tracking-[2px] uppercase text-black/50">Subtotal</span>
              <span className="text-[15px] font-semibold text-brand-green">{formatPriceFromUSD(subtotal)}</span>
            </div>
            <p className="mb-5 text-[11px] text-black/40 tracking-[1px]">Shipping & taxes calculated at checkout</p>

            <Link
              to="/cart"
              onClick={handleDrawerNavigation}
              className="flex h-[52px] items-center justify-center bg-brand-gold text-brand-green rounded-lg hover:bg-brand-gold-soft hover:shadow-[0_8px_24px_rgba(211,160,42,0.25)] transition duration-300 w-full"
            >
              <span className="text-[11px] sm:text-[12px] tracking-[3px] uppercase font-semibold">
                Checkout • {formatPriceFromUSD(subtotal)}
              </span>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
