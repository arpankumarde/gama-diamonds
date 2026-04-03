import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useProductDetailsContext } from "@/contexts/storefront/ProductDetailsContext";
import { useCurrency } from "@/contexts/storefront/CurrencyContext";

export default function YouMayAlsoLikeSection() {
  const {
    youMayAlsoLikeCards,
    canScrollLeft,
    canScrollRight,
    youMayLikeSliderRef,
    slideYouMayLike,
  } = useProductDetailsContext();
  const { currency, formatPriceFromUSD } = useCurrency();

  const cards = youMayAlsoLikeCards;

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 md:mt-12 px-2 md:px-6 lg:px-10 pb-14 md:pb-20">
      <div className="flex items-center justify-center gap-4 mb-8 md:mb-10">
        <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
        <h2 className="text-[18px] md:text-[22px] tracking-[3px] uppercase font-light text-[#111]">
          You May <span className="text-brand-gold">Also Like</span>
        </h2>
        <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
      </div>

      <div className="relative px-10 md:px-14">
        <button
          type="button"
          onClick={() => slideYouMayLike("left")}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition duration-300 ${
            canScrollLeft
              ? "bg-brand-gold text-black shadow-[0_8px_24px_rgba(211,160,42,0.35)] hover:bg-brand-gold-soft hover:shadow-[0_12px_32px_rgba(211,160,42,0.45)]"
              : "bg-brand-gold/20 text-black/20 cursor-not-allowed"
          }`}
          aria-label="Previous products"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        <button
          type="button"
          onClick={() => slideYouMayLike("right")}
          disabled={!canScrollRight}
          className={`absolute right-0 top-[40%] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition duration-300 ${
            canScrollRight
              ? "bg-brand-gold text-black shadow-[0_8px_24px_rgba(211,160,42,0.35)] hover:bg-brand-gold-soft hover:shadow-[0_12px_32px_rgba(211,160,42,0.45)]"
              : "bg-brand-gold/20 text-black/20 cursor-not-allowed"
          }`}
          aria-label="Next products"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>

        <div
          ref={youMayLikeSliderRef}
          className="flex gap-3 md:gap-4 lg:gap-6 overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory px-1"
        >
          {cards.map((card, index) => (
            <Link
              key={card.id}
              to={card.link}
              data-you-may-like-card="true"
              className="group block text-center flex-none w-[calc(50%-6px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-18px)] snap-start"
            >
              <div className="relative overflow-hidden rounded-xl border border-brand-gold/15 bg-white shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_8px_24px_rgba(0,0,0,0.08)] transition duration-500 group-hover:border-brand-gold/50 group-hover:shadow-[0_0_0_1px_rgba(211,160,42,0.20),0_16px_40px_rgba(0,0,0,0.12)] aspect-square mb-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-0 left-0 w-full block text-center bg-brand-green text-brand-gold text-[9px] py-1.5 tracking-[2px] uppercase font-medium z-10">
                  Next Day Delivery
                </span>
              </div>

              <div className="pt-3 md:pt-4 text-center">
                <h3 className="text-[13px] md:text-[16px] font-serif text-brand-gold mb-1 md:mb-2 group-hover:text-[#111] transition duration-300 leading-[1.5] overflow-hidden">
                  {card.title}
                </h3>
                <p className="text-[12px] md:text-[14px] text-black/50 mb-2 font-light">
                  {card.description}
                </p>
                <p className="text-[14px] md:text-[16px] font-semibold text-brand-gold group-hover:text-[#111] transition duration-300">
                  {formatPriceFromUSD(card.price)} {currency}
                </p>
                <div className="w-0 h-[1px] bg-brand-gold mx-auto mt-2 group-hover:w-8 transition-all duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
