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
    <section className="min-h-screen bg-[#FFFFFF] font-sans">
      <div className="max-w-[1600px] mx-auto">
        <div className="px-4 pt-6 md:px-6 md:pt-8 lg:px-6 lg:pt-10">
          <button
            type="button"
            onClick={handleBack}
            className="text-[12px] text-black hover:text-[#666666] transition"
          >
            ← Back
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block lg:sticky lg:top-24 h-fit px-6 py-8 lg:py-12 border-r border-[#E5E5E5]">
            <FilterContent />
          </aside>

          <main className="px-4 md:px-6 py-6 md:py-8 lg:py-12">
            <div className="lg:hidden mb-6 space-y-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 border border-[#E5E5E5] bg-white text-[#1A1A1A]"
              >
                <SlidersHorizontal size={18} />
                <span className="text-[13px] uppercase font-medium">Filter By</span>
              </button>
              <div className="flex items-center justify-end">
                <SortDropdown mobile />
              </div>
            </div>

            <div className="hidden lg:flex justify-between items-center mb-10">
              <div>
                {(activeCategory || activeCollection) && (
                  <p className="text-[11px] uppercase tracking-[2px] text-[#999999] mb-1">
                    {activeCategory ? "Category" : "Collection"}
                  </p>
                )}
                <p className="text-[13px] text-[#666666]">
                  {activeCategory
                    ? `${activeCategory.title} • ${total} Products`
                    : activeCollection
                    ? `${activeCollection.title} • ${total} Products`
                    : `All Products ${total}`}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <SortDropdown />
              </div>
            </div>

            <ProductGrid />

            {hasMore && (
              <div className="text-center py-12">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="bg-[#1A1A1A] text-white px-8 py-3 text-[12px] uppercase hover:bg-[#333] disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}

            {sortedProducts.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <p className="text-[14px] text-[#999999]">
                  {activeCategory || activeCollection
                    ? "No products in this category yet."
                    : "No products found matching your criteria."}
                </p>
                {!(activeCategory || activeCollection) && (
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 text-[12px] uppercase text-[#1A1A1A] border-b border-[#1A1A1A] pb-1"
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
        <div className="h-full flex flex-col bg-white">
          <div className="flex-none bg-white border-b border-[#E5E5E5] px-4 py-4 flex items-center justify-between">
            <span className="text-[14px] uppercase text-[#1A1A1A] font-medium">
              Filter By
            </span>
            <button onClick={() => setIsFilterOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-2">
            <FilterContent />
          </div>
          <div className="flex-none border-t border-[#E5E5E5] p-4 bg-white">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-[#1A1A1A] text-white py-3 text-[12px] uppercase hover:bg-[#333]"
            >
              View Results
            </button>
          </div>
        </div>
      </FilterDrawer>
    </section>
  );
}
