import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useHomeContext } from "@/contexts/storefront/HomeContext";

export default function CustomerFavoritesSection() {
  const {
    favoriteProducts,
    favoriteProductIndex,
    productsPerPage,
    totalProductPages,
    activeProductPage,
    canGoPrevProducts,
    canGoNextProducts,
    prevProducts,
    nextProducts,
    setFavoriteProductIndex,
  } = useHomeContext();

  return (
    <section className="bg-[#f8f8f8] px-4 md:px-8 lg:px-12 py-10 md:py-14">
      <h3 className="text-center text-[16px] md:text-[18px] lg:text-[20px] tracking-[4px] md:tracking-[5px] font-light text-[#555] uppercase mb-10 md:mb-16">
        Customer Favorites
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1400px] mx-auto">
        {favoriteProducts
          .slice(favoriteProductIndex, favoriteProductIndex + productsPerPage)
          .map((item) => (
          <ProductCard
            key={item.title}
            image={item.image}
            title={item.title}
            price={item.price}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 md:gap-5 mt-8 md:mt-12">
        <button
          onClick={prevProducts}
          disabled={!canGoPrevProducts}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition ${
            canGoPrevProducts ? "bg-black text-white" : "bg-[#d9d9d9] text-[#777]"
          }`}
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalProductPages }).map((_, index) => (
            <span
              key={index}
              onClick={() => setFavoriteProductIndex(index * productsPerPage)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition ${
                activeProductPage === index ? "bg-black" : "bg-[#d9d9d9]"
              }`}
            ></span>
          ))}
        </div>

        <button
          onClick={nextProducts}
          disabled={!canGoNextProducts}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition ${
            canGoNextProducts ? "bg-black text-white" : "bg-[#d9d9d9] text-[#777]"
          }`}
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </section>
  );
}
