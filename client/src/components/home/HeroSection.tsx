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

        <div className="absolute inset-0 bg-brand-green/55"></div>
      </div>

      <div
        className={`absolute inset-0 z-10 flex flex-col items-center justify-center text-white mt-50 px-4 ${
          loaded ? "animate-fadeUp" : ""
        }`}
      >
        <p className="text-[9px] md:text-[10px] lg:text-[11px] tracking-[3px] md:tracking-[4px] mb-3 md:mb-4 font-medium text-center text-white/90">
          ENGAGEMENT RINGS, WEDDING BANDS AND JEWELLERY SPECIALISTS
        </p>

        <h2 className="text-[18px] md:text-[24px] lg:text-[30px] tracking-[3px] md:tracking-[4px] font-normal mb-6 md:mb-10 leading-none text-center">
          <span className="text-white">HATTON GARDEN, </span>
          <span className="text-brand-gold">LONDON</span>
        </h2>

        <div
          className={`${loaded ? "animate-fadeUp [animation-delay:500ms]" : ""} flex flex-col md:flex-row gap-3 md:gap-4 mb-2 md:mt-4 items-center`}
        >
          <button className="bg-brand-gold text-brand-green px-6 md:px-10 py-2 md:py-3 text-[10px] md:text-[12px] tracking-[2px] md:tracking-[3px] uppercase font-semibold hover:bg-brand-gold-soft transition duration-500 w-full md:w-auto rounded-lg">
            Explore Engagement Rings
          </button>

          <button className="border border-brand-gold bg-transparent text-brand-gold px-6 md:px-10 py-2 md:py-3 text-[10px] md:text-[12px] tracking-[2px] md:tracking-[3px] uppercase font-semibold hover:bg-brand-gold hover:text-brand-green transition duration-500 w-full md:w-auto rounded-lg">
            Book an Appointment
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToCategories}
        className="absolute -bottom-5 left-1/2 z-20 flex h-[54px] w-[54px] -translate-x-1/2 items-center justify-center rounded-full bg-white text-brand-gold shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition hover:scale-[1.04] md:-bottom-7 md:h-[62px] md:w-[62px]"
        aria-label="Scroll to category section"
      >
        <ChevronDown
          className="h-[26px] w-[26px] md:h-7 md:w-7 text-brand-gold"
          strokeWidth={2.5}
        />
      </button>
    </section>
  );
}
