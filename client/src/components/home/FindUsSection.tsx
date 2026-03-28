export default function FindUsSection() {
  return (
    <section className="bg-brand-green py-14 md:py-20 px-4 md:px-8 lg:px-12 border-y-2 border-brand-gold/60">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center max-w-[1400px] mx-auto">
        <div className="max-w-full md:max-w-[520px]">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <span className="block w-8 h-[1px] bg-brand-gold"></span>
            <p className="text-[11px] md:text-[12px] tracking-[3px] md:tracking-[4px] uppercase text-brand-gold">
              Consult With Our Bespoke Specialists
            </p>
          </div>

          <h3 className="text-[16px] md:text-[18px] lg:text-[20px] tracking-[4px] md:tracking-[5px] uppercase font-light mb-8 md:mb-10">
            <span className="text-white">Where To </span>
            <span className="text-brand-gold">Find Us</span>
          </h3>

          <div className="text-[13px] md:text-[14px] leading-7 md:leading-8 text-white/75 font-light space-y-5 md:space-y-7">
            <p>
              We invite you to a tailored consultation with one of our experts in
              store. Our experts will advise you on a range of topics, from diamond
              options to engagement ring styles, to help you find the perfect piece
              of jewellery.
            </p>
            <p>
              Visit us in Hatton Garden, London. Situated between Chancery Lane &
              Farringdon station.{" "}
              <a href="#" className="text-brand-gold hover:text-white transition underline underline-offset-4">
                Find us here.
              </a>
            </p>
            <p>Get in touch with one of our diamond experts today!</p>
            <p>
              Call us on{" "}
              <a href="#" className="text-brand-gold hover:text-white transition">02037 953 782</a>
              {" "}or{" "}
              <a href="#" className="text-brand-gold hover:text-white transition">07535 125 095</a>
            </p>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 mt-8 md:mt-10 text-[11px] md:text-[12px] tracking-[2px] uppercase bg-brand-gold text-brand-green px-7 py-3 rounded-lg font-semibold hover:bg-brand-gold-soft transition duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          >
            Book An Appointment
          </a>
        </div>

        <div>
          <div className="group overflow-hidden rounded-2xl border border-brand-gold/30 shadow-[0_0_0_1px_rgba(211,160,42,0.15),0_20px_50px_rgba(0,0,0,0.40)]">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600"
              alt="Hatton Garden"
              className="w-full h-[300px] md:h-[420px] lg:h-[500px] object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
