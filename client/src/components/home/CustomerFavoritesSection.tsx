import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";
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
    <section className="bg-white py-12 md:py-20 px-4 md:px-8 lg:px-12 border-t border-brand-gold/10">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-brand-gold/70" strokeWidth={1.5} />
            <p className="text-[10px] tracking-[4px] uppercase text-brand-gold/70">Highly Rated</p>
          </div>
          <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
        </div>
        
        <h3 className="text-[24px] md:text-[32px] lg:text-[40px] font-light tracking-[2px] md:tracking-[3px] uppercase mb-4">
          <span className="text-[#111]">Customer </span>
          <span className="text-brand-gold">Favorites</span>
        </h3>
        
        <div className="flex items-center justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" strokeWidth={1} />
          ))}
        </div>
        <p className="text-[12px] md:text-[13px] text-black/60 tracking-[1px]">Based on 2,847+ customer reviews</p>
      </div>

      {/* Products Grid */}
      <div className="relative max-w-[1400px] mx-auto">
        {/* Navigation Arrows - Desktop */}
        <button
          onClick={prevProducts}
          disabled={!canGoPrevProducts}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-12 h-12 rounded-full items-center justify-center transition duration-300 ${
            canGoPrevProducts
              ? "bg-white border border-brand-gold/20 text-brand-green shadow-[0_8px_24px_rgba(0,0,0,0.10)] hover:border-brand-gold/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2} />
        </button>

        <button
          onClick={nextProducts}
          disabled={!canGoNextProducts}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-12 h-12 rounded-full items-center justify-center transition duration-300 ${
            canGoNextProducts
              ? "bg-white border border-brand-gold/20 text-brand-green shadow-[0_8px_24px_rgba(0,0,0,0.10)] hover:border-brand-gold/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <ChevronRight className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-0 md:px-16">
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
      </div>

      {/* Mobile Navigation */}
      <div className="flex justify-center items-center gap-4 mt-8 md:hidden">
        <button
          onClick={prevProducts}
          disabled={!canGoPrevProducts}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition duration-300 ${
            canGoPrevProducts
              ? "bg-white border border-brand-gold/20 text-brand-green shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalProductPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setFavoriteProductIndex(index * productsPerPage)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition duration-300 ${
                activeProductPage === index ? "bg-brand-gold" : "bg-black/20 hover:bg-brand-gold/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextProducts}
          disabled={!canGoNextProducts}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition duration-300 ${
            canGoNextProducts
              ? "bg-white border border-brand-gold/20 text-brand-green shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* Bottom Accent */}
      <div className="flex justify-center mt-12 md:mt-16">
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
      </div>
    </section>
  );
}
