import type { RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { socialVideos } from "../../pages/dummyData";
import SocialVideoCard from "./SocialVideoCard";
import { useHomeContext } from "@/contexts/storefront/HomeContext";

export default function SocialHighlightsSection() {
  const { socialSliderRef, scrollSocialLeft, scrollSocialRight } =
    useHomeContext();

  return (
    <section className="bg-brand-green py-12 md:py-20 px-4 md:px-8 lg:px-12 border-t-2 border-brand-gold/60">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-3 md:gap-0">
        <div>
          <p className="text-[13px] tracking-[3px] uppercase text-brand-gold mb-2">As Seen Online</p>
          <h3 className="text-[16px] md:text-[20px] tracking-[3px] md:tracking-[4px] uppercase">
            <span className="text-white">Social </span>
            <span className="text-brand-gold">Highlights</span>
          </h3>
        </div>

        <button className="text-[11px] md:text-[12px] tracking-[2px] uppercase border border-brand-gold/40 text-brand-gold px-5 py-2 rounded-lg hover:bg-brand-gold hover:text-brand-green transition duration-300">
          Show All Reviews
        </button>
      </div>

      <div className="relative">
        <button
          onClick={scrollSocialLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-brand-green p-2 md:p-3 shadow-lg rounded-full hidden md:block border border-brand-gold/30 hover:border-brand-gold/70 hover:bg-brand-gold/10 transition"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-brand-gold" />
        </button>

        <div
          ref={socialSliderRef as RefObject<HTMLDivElement | null>}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth no-scrollbar px-0 md:px-12"
        >
          {socialVideos.map((item, index) => (
            <SocialVideoCard
              key={index}
              poster={item.poster}
              video={item.video}
              title={item.title}
              price={item.price}
            />
          ))}
        </div>

        <button
          onClick={scrollSocialRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-brand-green p-2 md:p-3 shadow-lg rounded-full hidden md:block border border-brand-gold/30 hover:border-brand-gold/70 hover:bg-brand-gold/10 transition"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-brand-gold" />
        </button>
      </div>
    </section>
  );
}
