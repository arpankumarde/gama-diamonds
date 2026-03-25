type ShapeCardProps = {
  image: string;
  title: string;
};

export default function ShapeCard({ image, title }: ShapeCardProps) {
  return (
    <div className="group text-center">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[120px] md:h-[150px] lg:h-[180px] object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
        />
      </div>

      <p className="mt-3 md:mt-5 text-[10px] md:text-[13px] tracking-[2px] md:tracking-[3px] uppercase font-light text-[#333]">
        {title}
      </p>
    </div>
  );
}
