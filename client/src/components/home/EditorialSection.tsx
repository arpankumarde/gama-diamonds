export default function EditorialSection() {
  return (
    <section className="bg-white py-12 md:py-16 border-t border-brand-gold/10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16">
        <div className="px-4 md:px-8 lg:pl-24 lg:pr-12 max-w-full md:max-w-[560px] order-2 md:order-1">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <span className="block w-8 h-[1px] bg-brand-gold"></span>
            <p className="text-[11px] md:text-[12px] tracking-[3px] md:tracking-[4px] uppercase text-brand-gold">
              Hatton Garden Jewellers
            </p>
          </div>

          <h3 className="text-[16px] md:text-[17px] lg:text-[19px] tracking-[4px] md:tracking-[5px] uppercase font-light leading-[1.9] mb-6 md:mb-8">
            <span className="text-[#111]">Create Your Ring With </span>
            <span className="text-brand-gold">Top-Rated</span>
            <span className="text-[#111]"> Jewellers</span>
          </h3>

          <p className="text-[13px] md:text-[14px] leading-7 md:leading-8 text-black/65 font-light mb-8 md:mb-10">
            Discover the brilliance of Gama Diamonds, Hatton Garden's top-rated
            jeweller, where our team of talented designers and artisans are
            passionate about bringing your vision to life, ensuring every Gama
            Diamond creation is as unique and radiant as our clients.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 text-[12px] md:text-[13px] tracking-[2px] uppercase text-brand-green border border-brand-gold/40 px-6 py-3 rounded-lg hover:bg-brand-green hover:text-white hover:border-brand-green transition duration-300 font-medium"
          >
            Book an Appointment
          </a>
        </div>

        <div className="order-1 md:order-2">
          <div className="group overflow-hidden rounded-2xl border border-brand-gold/15 shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_20px_50px_rgba(0,0,0,0.14)]">
            <img
              src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1600"
              alt="Luxury showroom"
              className="w-full h-[300px] md:h-[380px] lg:h-[430px] object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
