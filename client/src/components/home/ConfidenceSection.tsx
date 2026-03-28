import { homeReviews as reviews } from "../../pages/dummyData";
import FeatureCard from "./FeatureCard";
import { confidenceFeatures } from "./homeData";
import { useHomeContext } from "@/contexts/storefront/HomeContext";

export default function ConfidenceSection() {
  const { reviewIndex } = useHomeContext();

  return (
    <section className="bg-white py-14 md:py-20 px-4 md:px-8 lg:px-12 border-t border-brand-gold/10">
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
        <p className="text-[10px] tracking-[4px] uppercase text-brand-gold/70">Our Promise</p>
        <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
      </div>

      <h2 className="font-luxury text-center text-[26px] md:text-[32px] lg:text-[38px] leading-[1.1] tracking-[0.5px] font-semibold mb-12 md:mb-16">
        <span className="text-[#111]">Luxury With </span>
        <span className="text-brand-gold">Confidence</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 max-w-[1400px] mx-auto mb-16 md:mb-20">
        {confidenceFeatures.map((item, index) => (
          <FeatureCard key={index} icon={item.icon} text={item.text} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
        <span className="block w-10 h-[1px] bg-brand-gold/40"></span>
        <div className="text-center">
          <h3 className="text-[22px] md:text-[26px] lg:text-[30px] font-semibold text-[#111]">Excellent</h3>
          <div className="text-brand-gold text-[16px] my-1">★★★★★</div>
          <p className="text-[12px] md:text-[13px] text-black/50 tracking-[1px]">Based on Google Reviews</p>
        </div>
        <span className="block w-10 h-[1px] bg-brand-gold/40"></span>
      </div>

      <div className="max-w-full md:max-w-[560px] mx-auto">
        <div className="relative bg-white p-7 md:p-10 rounded-2xl border border-brand-gold/20 shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_20px_50px_rgba(0,0,0,0.10)] text-center transition-all duration-700">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-green text-[18px] w-8 h-8 flex items-center justify-center rounded-full shadow-md">❝</div>
          <h4 className="text-[15px] md:text-[17px] font-semibold mb-3 md:mb-4 text-[#111] mt-2">
            {reviews[reviewIndex].name}
          </h4>
          <div className="text-brand-gold text-[16px] md:text-[18px] mb-4">
            ★★★★★
          </div>
          <p className="text-[13px] md:text-[14px] text-black/65 leading-6 md:leading-7 italic">
            {reviews[reviewIndex].text}
          </p>
        </div>
      </div>
    </section>
  );
}
