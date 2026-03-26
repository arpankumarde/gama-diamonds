import { coverageFeatures } from "./productDetailsData";

export default function CoveredSection() {
  return (
    <div className="mt-14">
      <h2 className="text-[34px] font-light  text-[#4b4b4b] mb-10 lg:text-center">
        We’ve Got You Covered
      </h2>

      <div className="grid grid-cols-3 md:grid-cols-3 gap-8 mb-14">
        {coverageFeatures.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={index} className="flex flex-col items-center text-center gap-4">
              <Icon size={item.size} strokeWidth={1.5} className="text-[#555]" />
              <p className="text-[18px]  text-[#4b4b4b] leading-[1.8]">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
