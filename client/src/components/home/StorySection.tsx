export default function StorySection() {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-[1440px] px-2 md:px-4">
        <div className="overflow-hidden rounded-2xl border-2 border-brand-gold/90 bg-brand-green shadow-[0_0_0_1px_rgba(211,160,42,0.24),0_12px_28px_rgba(0,0,0,0.18)]">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="px-4 md:px-8 lg:pl-16 lg:pr-14 max-w-full md:max-w-[620px] order-2 md:order-1 py-8 md:py-10">
              <h3 className="text-[16px] md:text-[17px] lg:text-[19px] tracking-[4px] md:tracking-[5px] uppercase font-medium text-white leading-[1.8] mb-5 md:mb-7">
                <span className="text-white">Forever Begins With A </span>
                <span className="text-brand-gold">Sparkle</span>
              </h3>

              <p className="text-[13px] md:text-[14px] leading-7 md:leading-8 text-white/85 font-medium mb-5 md:mb-7">
                Discover our stunning collection of eternity rings, designed to
                symbolize everlasting love and timeless elegance.
              </p>

              <p className="text-[13px] md:text-[14px] leading-7 md:leading-8 text-white/85 font-medium mb-5 md:mb-7">
                At Gama Diamonds, we commit to the highest quality.
              </p>

              <a
                href="#"
                className="text-[13px] md:text-[14px] text-brand-gold border-b border-brand-gold pb-1 inline-block hover:text-white hover:border-white transition font-semibold"
              >
                Click to Explore our Eternity Rings Collection
              </a>
            </div>

            <div className="order-1 md:order-2">
              <div className="group overflow-hidden">
                <img
                  src="https://heeradiamonds.com/cdn/shop/files/ETERNITY_RINGS_ON_HAND_2_1200x.jpg?v=1741996951"
                  alt="Luxury ring"
                  className="w-full h-[300px] md:h-[380px] lg:h-[450px] object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
