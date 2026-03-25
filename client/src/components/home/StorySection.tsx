export default function StorySection() {
  return (
    <section className="bg-[#f8f8f8] py-10 md:py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="px-4 md:px-8 lg:pl-24 lg:pr-16 max-w-full md:max-w-[620px] order-2 md:order-1">
          <h3 className="text-[16px] md:text-[17px] lg:text-[19px] tracking-[4px] md:tracking-[5px] uppercase font-light text-[#333] leading-[1.8] mb-5 md:mb-7">
            Forever Begins With A Sparkle
          </h3>

          <p className="text-[13px] md:text-[14px] leading-7 md:leading-8 text-[#444] font-light mb-5 md:mb-7">
            Discover our stunning collection of eternity rings, designed to
            symbolize everlasting love and timeless elegance.
          </p>

          <p className="text-[13px] md:text-[14px] leading-7 md:leading-8 text-[#444] font-light mb-5 md:mb-7">
            At Gama Diamonds, we commit to the highest quality.
          </p>

          <a
            href="#"
            className="text-[13px] md:text-[14px] text-[#333] border-b border-[#333] pb-1 inline-block"
          >
            Click to Explore our Eternity Rings Collection
          </a>
        </div>

        <div className="order-1 md:order-2">
          <div className="group overflow-hidden">
            <img
              src="/images/eternityring2.webp"
              alt="Luxury ring"
              className="w-full h-[300px] md:h-[380px] lg:h-[450px] object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
