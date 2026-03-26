export default function WeddingRingsSection() {
  return (
    <section className="bg-[#f8f8f8] px-4 md:px-8 py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="relative overflow-hidden group">
          <img
            src="/images/menswedding.webp"
            alt="Men's Wedding Rings"
            className="w-full h-[400px] md:h-[480px] lg:h-[550px] object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
          />

          <button className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 bg-white px-8 md:px-10 py-3 md:py-4 text-[11px] md:text-[13px] tracking-[2px] md:tracking-[3px] uppercase text-[#333]">
            Men's Wedding Rings
          </button>
        </div>

        <div className="relative overflow-hidden group">
          <img
            src="/images/womenswedding.webp"
            alt="Women's Wedding Rings"
            className="w-full h-[400px] md:h-[480px] lg:h-[550px] object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
          />

          <button className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 bg-white px-8 md:px-10 py-3 md:py-4 text-[11px] md:text-[13px] tracking-[2px] md:tracking-[3px] uppercase text-[#333]">
            Women's Wedding Rings
          </button>
        </div>
      </div>
    </section>
  );
}
