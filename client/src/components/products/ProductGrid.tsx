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
          <div className="relative overflow-hidden rounded-xl border border-brand-gold/15 bg-white shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_8px_24px_rgba(0,0,0,0.08)] transition duration-500 group-hover:border-brand-gold/50 group-hover:shadow-[0_0_0_1px_rgba(211,160,42,0.20),0_16px_40px_rgba(0,0,0,0.12)] aspect-square">
            <img
              src={item.images?.[0] || '/placeholder.jpg'}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute top-0 left-0 w-full block text-center bg-brand-green text-brand-gold text-[9px] py-1.5 md:py-2 tracking-[2px] uppercase font-medium">
              Next Day Delivery
            </span>
          </div>
          <div className="pt-3 md:pt-4 text-center">
            <h3 className="text-[13px] md:text-[16px] lg:text-[17px] font-serif text-brand-gold mb-1 md:mb-2 group-hover:text-[#111] transition duration-300">
              {item.name}
            </h3>
            <p className="text-[12px] md:text-[14px] text-black/50 mb-2 md:mb-3 font-light">
              {item.description}
            </p>
            <p className="text-[15px] md:text-[17px] font-semibold text-brand-gold group-hover:text-[#111] transition duration-300">
              ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
            <div className="w-0 h-[1px] bg-brand-gold mx-auto mt-2 group-hover:w-8 transition-all duration-500"></div>
          </div>
        </Link>
      ))}
    </div>
  );
}
