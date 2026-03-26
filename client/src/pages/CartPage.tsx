import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";

function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD`;
}

export default function CartPage() {
  const [orderNote, setOrderNote] = useState("");
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-screen border-t border-[#dddddd] bg-[#f8f8f8] px-4 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[1620px]">
        <h1 className="mb-10 text-center text-[24px] tracking-[8px] uppercase text-[#4b4b4b] md:mb-14 md:text-[32px]">
          Cart
        </h1>

        {items.length === 0 ? (
          <div className="border border-[#e3e3e3] bg-white px-6 py-16 text-center md:px-10">
            <p className="text-[18px] tracking-[4px] uppercase text-[#4b4b4b]">Your cart is empty</p>
            <p className="mt-4 text-[15px] text-[#666]">Add a product from the catalog to see it here.</p>
            <Link
              to="/products"
              className="mt-8 inline-block bg-black px-10 py-4 text-[12px] tracking-[4px] uppercase text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden border-b border-[#dddddd] pb-6 md:grid md:grid-cols-[1.5fr_280px_160px] md:gap-8">
              <p className="text-[13px] tracking-[4px] uppercase text-[#666]">Product</p>
              <p className="text-[13px] tracking-[4px] uppercase text-[#666] text-center">Quantity</p>
              <p className="text-[13px] tracking-[4px] uppercase text-[#666] text-right">Total</p>
            </div>

            <div className="divide-y divide-[#dddddd] border-y border-[#dddddd]">
              {items.map((item) => (
                <div key={item.id} className="grid gap-4 py-6 md:grid-cols-[1.5fr_280px_160px] md:items-center md:gap-8 md:py-8">
                  <div className="grid grid-cols-[110px_1fr] items-start gap-4 md:grid-cols-[180px_1fr] md:gap-8">

                    <Link to={`/product/${item.productSlug}`} className="block hover:opacity-90 transition">
                      <div className="overflow-hidden bg-white">
                        <img src={item.image} alt={item.title} className="h-[110px] w-full object-cover md:h-[180px] cursor-pointer" />
                      </div>
                    </Link>


                    <Link to={`/product/${item.productSlug}`} className="block hover:opacity-90 transition">
                      <div className="cursor-pointer">
                        <p className="text-[14px] leading-[1.45] tracking-[3px] uppercase text-[#4b4b4b] md:text-[18px] md:tracking-[4px]">
                          {item.title}
                        </p>
                        <span className="mt-2 inline-flex h-6 items-center text-[12px] font-semibold tracking-[2px] uppercase text-black md:mt-3 md:h-7">
                          x{item.quantity}
                        </span>
                        <p className="mt-3 text-[12px] tracking-[2px] uppercase text-[#666] md:mt-4 md:text-[14px] md:tracking-[3px]">
                          {item.diamondType} Diamond
                        </p>
                        <p className="mt-1 text-[12px] text-[#666] md:text-[14px]">{item.metal}</p>
                        {item.size && <p className="mt-1 text-[12px] text-[#666] md:text-[14px]">Size: {item.size}</p>}
                        <p className="mt-3 text-[15px] tracking-[2px] text-[#666] md:mt-4 md:text-[18px] md:tracking-[3px]">{formatPrice(item.price)}</p>

                        <div className="mt-4 flex items-center justify-between md:hidden">
                          <div className="flex h-[44px] items-center border border-[#dddddd] px-2">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.preventDefault();
                                updateQuantity(item.id, item.quantity - 1);
                              }}
                              className="p-2 text-[#666] transition hover:text-black"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="mx-3 min-w-6 text-center text-[16px] text-[#555]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.preventDefault();
                                updateQuantity(item.id, item.quantity + 1);
                              }}
                              className="p-2 text-[#666] transition hover:text-black"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={(event) => {
                              event.preventDefault();
                              removeItem(item.id);
                            }}
                            className="text-[12px] tracking-[3px] uppercase text-[#666] underline underline-offset-4"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </Link>

                  </div>

                  <div className="hidden md:flex md:flex-col md:items-center md:gap-4">
                    <div className="flex h-[72px] items-center border border-[#dddddd] px-4">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-3 text-[#666] transition hover:text-black"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={22} />
                      </button>
                      <span className="mx-6 min-w-8 text-center text-[20px] text-[#555]">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-3 text-[#666] transition hover:text-black"
                        aria-label="Increase quantity"
                      >
                        <Plus size={22} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[14px] tracking-[4px] uppercase text-[#666] underline underline-offset-4"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="text-left text-[18px] tracking-[4px] text-[#666] md:text-right">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
              <div>
                <label htmlFor="order-note" className="mb-5 block text-[16px] text-[#4b4b4b] md:text-[18px]">
                  Add Order Note
                </label>
                <textarea
                  id="order-note"
                  value={orderNote}
                  onChange={(event) => setOrderNote(event.target.value)}
                  placeholder="Please add additional instructions here."
                  className="min-h-[180px] w-full border border-[#dddddd] bg-white px-6 py-5 text-[15px] text-[#555] outline-none"
                />
              </div>

              <div className="lg:justify-self-end lg:text-right">
                <p className="text-[20px] tracking-[4px] uppercase text-[#4b4b4b]">
                  Total: {formatPrice(subtotal)}
                </p>
                <p className="mt-6 text-[18px] text-[#666]">Shipping & taxes calculated at checkout</p>
                <button className="mt-8 w-full bg-black px-10 py-5 text-[13px] tracking-[5px] uppercase text-white lg:w-auto lg:min-w-[280px]">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
