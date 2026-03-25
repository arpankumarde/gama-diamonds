import { brandSections } from "./homeData";
import { useHomeContext } from "@/contexts/storefront/HomeContext";

export default function BrandCollectionSection() {
  const { activeBrand, setActiveBrand } = useHomeContext();

  return (
    <section className="bg-[#f8f8f8] py-10 md:py-12 px-4 md:px-8 lg:px-12">
      <div className="flex justify-center gap-4 md:gap-8 lg:gap-10 mb-10 md:mb-16 flex-wrap">
        {brandSections.map((item, index) => (
          <button
            key={item.title}
            onClick={() => setActiveBrand(index)}
            className={`tracking-[2px] md:tracking-[3px] uppercase pb-2 transition ${
              activeBrand === index
                ? "text-[14px] md:text-[16px] lg:text-[18px] border-b-2 border-[#333] text-[#333]"
                : "text-[11px] md:text-[13px] text-[#777]"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center max-w-[1400px] mx-auto">
        <div className="group overflow-hidden">
          <img
            src={brandSections[activeBrand].image}
            alt=""
            className="w-full h-[300px] md:h-[420px] lg:h-[520px] object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
          />
        </div>

        <div className="max-w-full md:max-w-[520px]">
          <p className="text-[11px] md:text-[12px] tracking-[3px] md:tracking-[4px] uppercase text-[#666] mb-6 md:mb-8">
            {brandSections[activeBrand].address}
          </p>

          <h3 className="text-[16px] md:text-[18px] lg:text-[20px] tracking-[4px] md:tracking-[5px] uppercase font-light mb-6 md:mb-8 text-[#333]">
            {brandSections[activeBrand].heading}
          </h3>

          <p className="text-[13px] md:text-[14px] leading-7 md:leading-8 text-[#444] font-light">
            {brandSections[activeBrand].text}
          </p>
        </div>
      </div>
    </section>
  );
}
