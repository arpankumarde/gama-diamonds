import { Link } from "react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "./cart-context";
import { Sheet, SheetContent } from "@/components/ui/sheet";

function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

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
        /* FIX 1: Responsive width - full on mobile, 450px on desktop */
        className="w-full sm:max-w-[450px] border-l border-[#dddddd] bg-white p-0"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#e8e8e8] px-4 py-5 sm:px-6">
            <h2 className="text-[18px] sm:text-[20px] font-light tracking-[4px] uppercase text-[#3d3d3d]">Cart</h2>
            <button
              type="button"
              onClick={closeCart}
              className="text-[#555] transition hover:text-black cursor-pointer "
              aria-label="Close cart"
            >
              <X size={24} strokeWidth={1.2} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <p className="text-[14px] tracking-[2px] uppercase text-[#4b4b4b]">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                {items.map((item) => (
                  /* FIX 2: Responsive Grid - smaller image on small screens */
                  <div key={item.id} className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] items-start gap-4 sm:gap-5">
                    {/* Image */}
                    <Link 
                      to={`/product/${item.productSlug}`} 
                      className="block hover:opacity-90 transition"
                      onClick={handleDrawerNavigation}
                    >
                      <div className="aspect-square overflow-hidden bg-[#f5f5f5]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover cursor-pointer"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <Link 
                      to={`/product/${item.productSlug}`} 
                      className="flex-1 hover:opacity-90 transition"
                      onClick={handleDrawerNavigation}
                    >
                      <div className="flex flex-col min-w-0 cursor-pointer"> {/* min-w-0 prevents text from pushing the container */}
                        <p className="text-[12px] sm:text-[13px] leading-tight tracking-[2px] uppercase text-[#333] break-words">
                          "{item.title}"
                        </p>
                        <span className="mt-2 inline-flex h-6 items-center text-[11px] font-semibold tracking-[1px] uppercase text-black sm:h-7 sm:text-[12px]">
                          x{item.quantity}
                        </span>
                        <p className="mt-1 text-[10px] sm:text-[11px] tracking-[1px] uppercase text-[#777]">
                          {item.diamondType} Diamond
                        </p>
                        <p className="text-[10px] sm:text-[11px] tracking-[1px] text-[#777]">{item.metal}</p>
                        
                        <p className="mt-2 sm:mt-3 text-[13px] sm:text-[14px] tracking-[1px] text-[#333]">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </Link>

                      <div className="flex items-center justify-between flex-wrap gap-2 ml-auto">
                        {/* Quantity Selector - Smaller on mobile */}
                        <div className="flex h-[30px] sm:h-[35px] text-black items-center border border-[#eeeeee] px-1 sm:px-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-black hover:text-black"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="mx-2 sm:mx-4 text-black min-w-[15px] text-center  text-[12px] sm:text-[13px]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-black hover:text-black"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[10px] tracking-[2px] uppercase text-black underline underline-offset-4 hover:text-black"
                        >
                          Remove
                        </button>
                      </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[#e8e8e8] px-4 py-6 sm:px-6">
            <p className="mb-4 sm:mb-6 text-[12px] sm:text-[13px] text-[#666]">Shipping & taxes calculated at checkout</p>
            
            <Link
              to="/cart"
              onClick={handleDrawerNavigation}
              className="flex h-[50px] flex-col items-center justify-center bg-black text-white transition hover:bg-[#1a1a1a] w-full"
            >
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[3px] uppercase">
                <span>Checkout</span>
                <span>•</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
