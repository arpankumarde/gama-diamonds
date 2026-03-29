import { useEffect, useRef, useState, type RefObject } from "react";
import { getAllCategories } from "@/lib/api";
import CategoryCard from "./CategoryCard";
import { useHomeContext } from "@/contexts/storefront/HomeContext";

interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export default function CategorySection() {
  const { categorySectionRef } = useHomeContext();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        if (res.success) setCategories(res.data as any);
      })
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <section
      ref={categorySectionRef as RefObject<HTMLElement | null>}
      className="bg-white py-12 md:py-16 px-4 md:px-8 lg:px-16 border-t border-brand-gold/10"
    >
      <div className="text-center mb-10 md:mb-16">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
          <p className="text-[13px] tracking-[3px] uppercase text-brand-gold/70">Discover Our Collections</p>
          <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
        </div>
        
        <h3 className="text-[16px] md:text-[18px] lg:text-[20px] tracking-[4px] md:tracking-[6px] font-light uppercase">
          <span className="text-[#111]">Shop By </span>
          <span className="text-brand-gold">Category</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1320px] mx-auto">
        {categories.map((item) => (
          <CategoryCard
            key={item._id}
            slug={item.slug}
            image={item.image || "/images/newarrival.webp"}
            title={item.name}
          />
        ))}
      </div>
      
      {/* Decorative bottom accent */}
      <div className="flex justify-center mt-12 md:mt-16">
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
      </div>
    </section>
  );
}
