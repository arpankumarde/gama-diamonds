import type { RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { socialVideos } from "../../pages/dummyData";
import SocialVideoCard from "./SocialVideoCard";
import { useHomeContext } from "@/contexts/storefront/HomeContext";

export default function SocialHighlightsSection() {
  const { socialSliderRef, scrollSocialLeft, scrollSocialRight } =
    useHomeContext();

  return (
    <section className="bg-[#f8f8f8] py-12 md:py-20 px-4 md:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10 gap-3 md:gap-0">
        <h3 className="text-[16px] md:text-[20px] tracking-[3px] md:tracking-[4px] uppercase text-black">
          Social Highlights
        </h3>

        <button className="text-[12px] md:text-[14px] tracking-[2px] uppercase text-black">
          Show all Reviews
        </button>
      </div>

      <div className="relative">
        <button
          onClick={scrollSocialLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 md:p-3 shadow rounded-full hidden md:block"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-black" />
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 md:p-3 shadow rounded-full hidden md:block"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-black" />
        </button>
      </div>
    </section>
  );
}
