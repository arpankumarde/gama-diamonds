import { ProductListingProvider, useProductListingContext } from "@/contexts/storefront/ProductListingContext";
import { SlidersHorizontal, X } from "lucide-react";
import FilterDrawer from "../components/products/FilterDrawer";
import FilterContent from "../components/products/FilterContent";
import SortDropdown from "../components/products/SortDropdown";
import ProductGrid from "../components/products/ProductGrid";

interface ProductsProps {
  category?: string;
  collection?: string;
}

export default function Product({ category, collection }: ProductsProps) {
  return (
    <ProductListingProvider category={category} collection={collection}>
      <ProductContent />
    </ProductListingProvider>
  );
}

function ProductContent() {
  const {
    products: sortedProducts,
    total,
    isFilterOpen,
    setIsFilterOpen,
    clearAllFilters,
    handleBack,
    isLoading,
    error,
    loadMore,
    hasMore,
    activeCategory: activeCategoryRaw,
    activeCollection: activeCollectionRaw,
  } = useProductListingContext();

  const activeCategory = activeCategoryRaw?.title ? activeCategoryRaw : null;
  const activeCollection = activeCollectionRaw?.title ? activeCollectionRaw : null;

  if (error) {
    return <div className="text-center py-20">Error: {error}</div>;
  }

  return (
    <section className="min-h-screen bg-white font-sans">
      <div className="max-w-[1600px] mx-auto">
        {/* Top bar */}
        <div className="bg-brand-green px-4 py-4 md:px-6 lg:px-6 flex items-center justify-between border-b border-brand-gold/30">
          <button
            type="button"
            onClick={handleBack}
            className="text-[12px] tracking-[2px] uppercase text-white hover:text-brand-gold transition duration-300 w-[100px]"
          >
            ← Back
          </button>
          <div className="flex-1 text-center">
            {(activeCategory || activeCollection) && (
              <p className="text-[14px] uppercase tracking-[3px] text-brand-gold font-semibold drop-shadow-[0_0_8px_rgba(211,160,42,0.6)]">
                {activeCategory ? "Category" : "Collection"}
              </p>
            )}
            <p className="text-[12px] tracking-[2px] uppercase font-light text-white/80">
              {activeCategory
                ? `${activeCategory.title} • ${total} Products`
                : activeCollection
                ? `${activeCollection.title} • ${total} Products`
                : `All Products • ${total}`}
            </p>
          </div>
          <div className="hidden lg:flex justify-end w-[100px]">
            <SortDropdown />
          </div>
          <div className="lg:hidden flex justify-end w-[100px]">
            <SortDropdown mobile />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block lg:sticky lg:top-24 h-fit px-6 py-8 lg:py-12 border-r border-brand-gold/15">
            <div className="flex items-center gap-3 mb-6">
              <span className="block flex-1 h-[1px] bg-brand-gold/40"></span>
              <p className="text-[11px] tracking-[3px] uppercase text-brand-gold">Filters</p>
              <span className="block flex-1 h-[1px] bg-brand-gold/40"></span>
            </div>
            <FilterContent />
          </aside>

          <main className="px-4 md:px-6 py-6 md:py-8 lg:py-12">
            <div className="lg:hidden mb-6 space-y-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 border border-brand-gold/20 bg-white text-brand-green rounded-lg hover:border-brand-gold/50 transition duration-300"
              >
                <SlidersHorizontal size={18} className="text-brand-gold" />
                <span className="text-[13px] uppercase font-medium tracking-[2px]">Filter By</span>
              </button>
            </div>

            <ProductGrid />

            {hasMore && (
              <div className="text-center py-12">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="bg-brand-gold text-brand-green px-10 py-4 text-[12px] tracking-[3px] uppercase font-semibold rounded-lg hover:bg-brand-gold-soft hover:shadow-[0_8px_24px_rgba(211,160,42,0.25)] transition duration-300 disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}

            {sortedProducts.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <p className="text-[14px] text-black/50 tracking-[1px]">
                  {activeCategory || activeCollection
                    ? "No products in this category yet."
                    : "No products found matching your criteria."}
                </p>
                {!(activeCategory || activeCollection) && (
                  <button
                    onClick={clearAllFilters}
                    className="mt-6 text-[12px] uppercase tracking-[2px] text-brand-gold border-b border-brand-gold pb-1 hover:text-brand-green hover:border-brand-green transition duration-300"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
        <div className="h-full flex flex-col bg-brand-green">
          <div className="flex-none border-b border-brand-gold/20 px-4 py-4 flex items-center justify-between">
            <span className="text-[13px] uppercase tracking-[3px] text-white font-medium">
              Filter By
            </span>
            <button onClick={() => setIsFilterOpen(false)} className="text-brand-gold hover:text-white transition duration-300">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2 [&_span]:text-white/80 [&_.border-b]:border-brand-gold/20 [&_input[type=number]]:bg-white/10 [&_input[type=number]]:border-brand-gold/30 [&_input[type=number]]:text-white [&_input[type=number]]:placeholder:text-white/50">
            <FilterContent />
          </div>
          <div className="flex-none border-t border-brand-gold/20 p-4">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-brand-gold text-brand-green py-3 text-[12px] tracking-[3px] uppercase font-semibold rounded-lg hover:bg-brand-gold-soft transition duration-300"
            >
              View Results
            </button>
          </div>
        </div>
      </FilterDrawer>
    </section>
  );
}
