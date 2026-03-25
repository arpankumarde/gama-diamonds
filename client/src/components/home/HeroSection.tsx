import { useHomeContext } from "@/contexts/storefront/HomeContext";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const { heroImages, current, loaded, scrollToCategories } = useHomeContext();

  return (
    <section className="relative h-[50vh] md:h-[58vh] overflow-visible">
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[4000ms] ease-out ${
              current === index ? "opacity-100" : "opacity-0"
            } ${
              index === 0
                ? loaded
                  ? "scale-100"
                  : "scale-110"
                : "scale-100"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/35"></div>
      </div>

      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-white mt-50 px-4 ${
          loaded ? "animate-fadeUp" : ""
        }`}
      >
        <p className="text-[9px] md:text-[10px] lg:text-[11px] tracking-[3px] md:tracking-[4px] mb-3 md:mb-4 font-dark text-center">
          ENGAGEMENT RINGS, WEDDING BANDS AND JEWELLERY SPECIALISTS
        </p>

        <h2 className="text-[18px] md:text-[24px] lg:text-[30px] tracking-[3px] md:tracking-[4px] font-light mb-6 md:mb-10 leading-none text-center">
          HATTON GARDEN, LONDON
        </h2>

        <div
          className={`${loaded ? "animate-fadeUp [animation-delay:500ms]" : ""} flex flex-col md:flex-row gap-3 md:gap-4 mb-2 md:mt-4 items-center`}
        >
          <button className="bg-white text-black px-6 md:px-10 py-2 md:py-3 text-[10px] md:text-[12px] tracking-[2px] md:tracking-[3px] uppercase hover:bg-[#f5f5f5] transition duration-500 w-full md:w-auto">
            Explore Engagement Rings
          </button>

          <button className="bg-white text-black px-6 md:px-10 py-2 md:py-3 text-[10px] md:text-[12px] tracking-[2px] md:tracking-[3px] uppercase hover:bg-[#f5f5f5] transition duration-500 w-full md:w-auto ">
            Book an Appointment
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToCategories}
        className="absolute -bottom-5 left-1/2 z-20 flex h-[54px] w-[54px] -translate-x-1/2 items-center justify-center rounded-full bg-white text-black shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition hover:scale-[1.04] md:-bottom-7 md:h-[62px] md:w-[62px]"
        aria-label="Scroll to category section"
      >
        <ChevronDown
          className="h-[18px] w-[18px] md:h-5 md:w-5"
          strokeWidth={1.5}
        />
      </button>
    </section>
  );
}
