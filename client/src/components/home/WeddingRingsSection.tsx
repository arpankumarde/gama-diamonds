export default function WeddingRingsSection() {
  return (
    <section className="bg-[#0a1f1d] px-4 md:px-8 py-12 md:py-16 border-y border-brand-gold/20">
      <p className="text-center text-[13px] tracking-[3px] uppercase text-brand-gold mb-3">Timeless Elegance</p>
      <h3 className="text-center text-[16px] md:text-[18px] lg:text-[20px] tracking-[4px] md:tracking-[5px] font-light uppercase mb-10 md:mb-14">
        <span className="text-white">Wedding </span>
        <span className="text-brand-gold">Rings</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-[1400px] mx-auto">
        <div className="relative overflow-hidden rounded-2xl group border border-brand-gold/15 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
          <img
            src="https://heeradiamonds.com/cdn/shop/files/mens_wedding_ring_3_750x832_crop_center.jpg?v=1741985876&quot;"
            alt="Men's Wedding Rings"
            className="w-full h-[400px] md:h-[480px] lg:h-[550px] object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col items-center gap-3">
            <p className="text-[10px] tracking-[3px] uppercase text-brand-gold/80">For Him</p>
            <button className="rounded-lg bg-brand-gold px-8 md:px-10 py-3 md:py-4 text-[11px] md:text-[13px] tracking-[2px] md:tracking-[3px] uppercase text-brand-green font-semibold shadow-[0_12px_28px_rgba(0,0,0,0.35)] hover:bg-brand-gold-soft transition duration-300">
              Men's Wedding Rings
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl group border border-brand-gold/15 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
          <img
            src="https://heeradiamonds.com/cdn/shop/files/ETERNITY_RINGS_ON_HAND_3_750x832_crop_center.jpg?v=1741996951&quot;"
            alt="Women's Wedding Rings"
            className="w-full h-[400px] md:h-[480px] lg:h-[550px] object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col items-center gap-3">
            <p className="text-[10px] tracking-[3px] uppercase text-brand-gold/80">For Her</p>
            <button className="rounded-lg bg-brand-gold px-8 md:px-10 py-3 md:py-4 text-[11px] md:text-[13px] tracking-[2px] md:tracking-[3px] uppercase text-brand-green font-semibold shadow-[0_12px_28px_rgba(0,0,0,0.35)] hover:bg-brand-gold-soft transition duration-300">
              Women's Wedding Rings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
