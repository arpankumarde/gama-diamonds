export default function FindUsSection() {
  return (
    <section className="bg-[#f8f8f8] py-16 md:py-24 px-4 md:px-8 lg:px-12 border-t border-[#d9d9d9]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center max-w-[1400px] mx-auto">
        <div className="max-w-full md:max-w-[520px]">
          <p className="text-[11px] md:text-[12px] tracking-[3px] md:tracking-[4px] uppercase text-[#666] mb-6 md:mb-8">
            Consult With Our Bespoke Specialists
          </p>

          <h3 className="text-[16px] md:text-[18px] lg:text-[20px] tracking-[4px] md:tracking-[5px] uppercase font-light text-[#333] mb-8 md:mb-10">
            Where To Find Us
          </h3>

          <div className="text-[13px] md:text-[14px] leading-7 md:leading-8 text-[#444] font-light space-y-5 md:space-y-7">
            <p>
              We invite you to a tailored consultation with one of our experts in
              store. Our experts will advise you on a range of topics, from diamond
              options to engagement ring styles, to help you find the perfect piece
              of jewellery.
            </p>

            <p>
              Visit us in Hatton Garden, London. Situated between Chancery Lane &
              Farringdon station.
              <a href="#" className="text-blue-600 ml-1">
                Find us here.
              </a>
            </p>

            <p>Get in touch with one of our diamond experts today!</p>

            <p>
              Call us on{" "}
              <a href="#" className="text-blue-600">
                02037 953 782
              </a>{" "}
              or{" "}
              <a href="#" className="text-blue-600">
                07535 125 095
              </a>
            </p>

            <a
              href="#"
              className="inline-block border-b border-[#333] text-[#333] pb-1"
            >
              Book An Appointment Online or Instore
            </a>
          </div>
        </div>

        <div>
          <div className="group overflow-hidden">
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
