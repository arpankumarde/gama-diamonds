import { Star } from "lucide-react";

export default function CustomerReviewsSection() {
  return (
    <div className="max-w-[900px] mx-auto py-12 md:py-16 px-4">
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
        <h3 className="text-center text-[18px] md:text-[22px] tracking-[3px] uppercase font-light text-[#111]">
          Customer <span className="text-brand-gold">Reviews</span>
        </h3>
        <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border border-brand-gold/15 rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_16px_40px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col items-center justify-center py-8 md:py-10 px-6 border-b md:border-b-0 md:border-r border-brand-gold/15">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className="text-brand-gold fill-brand-gold" strokeWidth={1} />
            ))}
          </div>
          <p className="text-[14px] md:text-[15px] text-black/60 tracking-[1px]">
            Be the first to write a review
          </p>
        </div>

        <div className="flex items-center justify-center py-8 md:py-10 px-6">
          <button className="bg-brand-gold text-brand-green px-10 md:px-14 py-3 md:py-4 text-[13px] md:text-[14px] tracking-[3px] uppercase font-semibold rounded-lg hover:bg-brand-gold-soft hover:shadow-[0_8px_24px_rgba(211,160,42,0.25)] transition duration-300">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}
