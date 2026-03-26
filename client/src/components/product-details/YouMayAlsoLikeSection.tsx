import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useProductDetailsContext } from "@/contexts/storefront/ProductDetailsContext";

export default function YouMayAlsoLikeSection() {
  const {
    youMayAlsoLikeCards,
    canScrollLeft,
    canScrollRight,
    youMayLikeSliderRef,
    slideYouMayLike,
  } = useProductDetailsContext();

  const cards = youMayAlsoLikeCards;

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="mt-14 md:mt-20 lg:mt-8 px-2 md:px-6 lg:px-10">
      <h2 className="text-[24px] md:text-[30px] lg:text-[34px] font-light text-[#4b4b4b] mb-8 md:mb-10 lg:text-center">
        You May Also Like
      </h2>

      <div className="relative">
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => slideYouMayLike("left")}
            className="absolute left-0 top-[34%] -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full border border-[#d8d8d8] bg-white/95 text-[#333] flex items-center justify-center shadow-sm"
            aria-label="Previous products"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => slideYouMayLike("right")}
            className="absolute right-0 top-[34%] -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full border border-[#d8d8d8] bg-white/95 text-[#333] flex items-center justify-center shadow-sm"
            aria-label="Next products"
          >
            <ChevronRight size={18} />
          </button>
        )}

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
              <div className="relative aspect-square bg-[#f7f7f7] mb-4 overflow-hidden">
                {index % 2 === 1 && (
                  <span className="absolute top-4 left-4 text-[12px] tracking-[3px] uppercase text-[#666] z-10">
                    On Sale
                  </span>
                )}
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>

              <p className="min-h-[48px] md:min-h-[56px] text-[14px] md:text-[17px] tracking-[3px] uppercase text-[#4b4b4b] leading-[1.5] mb-2 overflow-hidden">
                {card.title}
              </p>
              <p className="text-[18px] md:text-[22px] font-light text-[#b14b4b]">
                ${card.price.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
