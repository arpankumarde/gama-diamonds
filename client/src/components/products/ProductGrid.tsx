import { useProductListingContext } from "@/contexts/storefront/ProductListingContext";
import { Link } from "react-router";

export default function ProductGrid() {
  const { products: sortedProducts, isLoading } = useProductListingContext();

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-x-6 lg:gap-y-12">
      {sortedProducts.map((item) => (
        <Link
          to={`/product/${item.slug}`}
          key={item._id}
          className="group cursor-pointer block"
        >
          <div className="relative overflow-hidden bg-[#FAFAFA] aspect-square">
            <img
              src={item.images?.[0] || '/placeholder.jpg'}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute top-0 left-0 w-full block text-center bg-[#1A1A1A] text-white text-[9px] py-1.5 md:py-2 tracking-[1px] uppercase">
              Next Day Delivery
            </span>
          </div>
          <div className="pt-3 md:pt-4 text-center">
            <p className="text-[9px] md:text-[10px] tracking-[1.5px] text-[#999999] mb-1 md:mb-2">
              {item.sku}
            </p>
            <h3 className="text-[12px] md:text-[14px] lg:text-[15px] font-serif text-[#1A1A1A] mb-1 md:mb-2">
              {item.name}
            </h3>
            <p className="text-[10px] md:text-[12px] text-[#999999] mb-2 md:mb-3 font-light">
              {item.description}
            </p>
            <p className="text-[14px] md:text-[16px] font-semibold text-[#1A1A1A]">
              ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
