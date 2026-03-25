export default function EditorialSection() {
  return (
    <section className="bg-[#f8f8f8] py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16">
        <div className="px-4 md:px-8 lg:pl-24 lg:pr-12 max-w-full md:max-w-[560px] order-2 md:order-1">
          <p className="text-[11px] md:text-[12px] tracking-[3px] md:tracking-[4px] uppercase text-[#555] mb-6 md:mb-8">
            Hatton Garden Jewellers
          </p>

          <h3 className="text-[16px] md:text-[17px] lg:text-[19px] tracking-[4px] md:tracking-[5px] uppercase font-light text-[#333] leading-[1.9] mb-6 md:mb-8">
            Create Your Ring With Top-Rated Jewellers
          </h3>

          <p className="text-[13px] md:text-[14px] leading-7 md:leading-8 text-[#444] font-light mb-6 md:mb-8">
            Discover the brilliance of Gama Diamonds, Hatton Garden's top-rated
            jeweller, where our team of talented designers and artisans are
            passionate about bringing your vision to life, ensuring every Gama
            Diamond creation is as unique and radiant as our clients.
          </p>

          <a
            href="#"
            className="text-[13px] md:text-[14px] text-[#333] border-b border-[#333] pb-1 inline-block uppercase"
          >
            Book an Appointment
          </a>
        </div>

        <div className="order-1 md:order-2">
          <div className="group overflow-hidden">
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
