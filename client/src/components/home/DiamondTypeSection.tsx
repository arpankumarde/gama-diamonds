import { Link } from "react-router";
import { diamondCollections } from "../../data/products";

export default function DiamondTypeSection() {
  return (
    <section className="bg-[#f8f8f8] px-4 md:px-8 lg:px-12 py-10 md:py-14">
      <h3 className="text-center text-[16px] md:text-[18px] lg:text-[20px] tracking-[4px] md:tracking-[5px] font-light text-[#444] uppercase mb-10 md:mb-14">
        Select Diamond Type
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-8 max-w-[1300px] mx-auto">
        {diamondCollections.map((item) => (
          <Link
            key={item.slug}
            to={`/collections/${item.slug}`}
            className="text-center block group"
          >
            <div className="overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[250px] md:h-[280px] lg:h-[320px] object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
              />
            </div>

            <p className="mt-4 md:mt-6 text-[11px] md:text-[13px] tracking-[3px] md:tracking-[4px] uppercase font-light text-[#333]">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
