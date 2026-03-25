import { homeReviews as reviews } from "../../pages/dummyData";
import FeatureCard from "./FeatureCard";
import { confidenceFeatures } from "./homeData";
import { useHomeContext } from "@/contexts/storefront/HomeContext";

export default function ConfidenceSection() {
  const { reviewIndex } = useHomeContext();

  return (
    <section className="bg-[#f8f8f8] py-8 px-4 md:px-8 lg:px-12">
      <h2 className="text-center text-[18px] md:text-[20px] lg:text-[22px] tracking-[2px] md:tracking-[3px] font-semibold mb-10 md:mb-16 uppercase">
        Luxury With Confidence
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 max-w-[1400px] mx-auto mb-14 md:mb-20">
        {confidenceFeatures.map((item, index) => (
          <FeatureCard key={index} icon={item.icon} text={item.text} />
        ))}
      </div>

      <div className="text-center mb-8 md:mb-12">
        <h3 className="text-[24px] md:text-[28px] lg:text-[34px] font-semibold text-black">
          Excellent
        </h3>
        <p className="text-[13px] md:text-[14px] text-[#555] mt-2">
          Based on Google Reviews
        </p>
      </div>

      <div className="max-w-full md:max-w-[500px] mx-auto">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm text-center transition-all duration-700">
          <h4 className="text-[16px] md:text-[18px] font-semibold mb-3 md:mb-4 text-black">
            {reviews[reviewIndex].name}
          </h4>

          <div className="text-yellow-500 text-[18px] md:text-[20px] mb-3 md:mb-4">
            ★★★★★
          </div>

          <p className="text-[13px] md:text-[14px] text-[#555] leading-6 md:leading-7">
            {reviews[reviewIndex].text}
          </p>
        </div>
      </div>
    </section>
  );
}
