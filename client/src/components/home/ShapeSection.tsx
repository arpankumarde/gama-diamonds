import { shapeItems } from "./homeData";
import ShapeCard from "./ShapeCard";

export default function ShapeSection() {
  return (
    <section className="bg-[#f8f8f8] px-4 md:px-8 lg:px-12 py-10 md:py-14">
      <h3 className="text-center text-[16px] md:text-[18px] lg:text-[20px] tracking-[4px] md:tracking-[5px] font-light text-[#444] uppercase mb-10 md:mb-14">
        Shop By Shape
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6 max-w-[1500px] mx-auto">
        {shapeItems.map((item) => (
          <ShapeCard key={item.title} image={item.image} title={item.title} />
        ))}
      </div>
    </section>
  );
}
