import { coverageFeatures } from "./productDetailsData";

export default function CoveredSection() {
  return (
    <div className="bg-white py-14 md:py-20 px-4 md:px-8 lg:px-12 border-t border-brand-gold/10">
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
        <p className="text-[13px] tracking-[3px] uppercase text-brand-gold/70">Our Promise</p>
        <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
      </div>

      <h2 className="text-center text-[22px] md:text-[28px] lg:text-[34px] tracking-[1px] font-semibold mb-12 md:mb-16">
        <span className="text-[#111]">We've Got You </span>
        <span className="text-brand-gold">Covered</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-[1000px] mx-auto">
        {coverageFeatures.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="group bg-white p-4 md:p-6 text-center rounded-2xl border border-brand-gold/15 shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-brand-gold/50 hover:shadow-[0_0_0_1px_rgba(211,160,42,0.20),0_20px_48px_rgba(0,0,0,0.12)] transition duration-300"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-brand-green mx-auto flex items-center justify-center mb-3 md:mb-4 shadow-[0_8px_20px_rgba(15,45,42,0.25)] group-hover:shadow-[0_8px_24px_rgba(15,45,42,0.40)] transition duration-300">
                <Icon className="w-6 h-6 md:w-8 md:h-8 text-brand-gold" strokeWidth={1.5} />
              </div>
              <p className="text-[12px] md:text-[14px] tracking-[1px] uppercase font-medium text-[#111] group-hover:text-brand-green transition duration-300">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom accent */}
      <div className="flex justify-center mt-12 md:mt-16">
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
      </div>
    </div>
  );
}
