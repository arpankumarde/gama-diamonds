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
    getAllCategories().then((res) => {
      if (res.success) setCategories(res.data as any);
    });
  }, []);

  return (
    <section
      ref={categorySectionRef as RefObject<HTMLElement | null>}
      className="bg-[#f8f8f8] px-4 py-10 md:px-8 md:py-14 lg:px-16"
    >
      <h3 className="text-center text-[16px] md:text-[18px] lg:text-[20px] tracking-[4px] md:tracking-[6px] font-light text-[#333] mb-10 md:mb-16 uppercase">
        Shop By Category
      </h3>

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
    </section>
  );
}
