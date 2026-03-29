import { shapeItems } from "./homeData";
import ShapeCard from "./ShapeCard";

export default function ShapeSection() {
  return (
    <section className="bg-brand-green px-4 md:px-8 lg:px-12 py-12 md:py-16 border-y-2 border-brand-gold/60">
      <p className="text-center text-[13px] tracking-[3px] uppercase text-brand-gold mb-3">Browse Our Collection</p>
      <h3 className="text-center text-[16px] md:text-[18px] lg:text-[20px] tracking-[4px] md:tracking-[5px] font-light uppercase mb-10 md:mb-14">
        <span className="text-white">Shop By </span>
        <span className="text-brand-gold">Shape</span>
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6 max-w-[1500px] mx-auto">
        {shapeItems.map((item) => (
          <ShapeCard key={item.title} image={item.image} title={item.title} />
        ))}
      </div>
    </section>
  );
}
