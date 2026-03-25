import { Star } from "lucide-react";

export default function CustomerReviewsSection() {
  return (
    <div className="max-w-[900px] mx-auto">
      <h3 className="text-center text-[25px] font-light text-[#4b4b4b] mb-3">
        Customer Reviews
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex flex-col items-center justify-center py-5 md:py-6 border-b md:border-b-0 md:border-r border-[#eeeeee]">
          <div className="flex gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={26}
                className="text-[#b89212]"
                strokeWidth={1.8}
              />
            ))}
          </div>

          <p className="text-[18px] text-[#4b4b4b]">
            Be the first to write a review
          </p>
        </div>

        <div className="flex items-center justify-center py-5 md:py-6">
          <button className="bg-[#b89212] text-white px-14 py-3 text-[18px] md:text-[20px] font-semibold hover:opacity-90 transition">
            Write a review
          </button>
        </div>
      </div>
    </div>
  );
}
