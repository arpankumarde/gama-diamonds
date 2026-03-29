type ShapeCardProps = {
  image: string;
  title: string;
};

export default function ShapeCard({ image, title }: ShapeCardProps) {
  return (
    <div className="group text-center cursor-pointer">
      <div className="overflow-hidden rounded-xl border border-brand-gold/20 bg-white/5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition duration-500 group-hover:border-brand-gold/70 group-hover:shadow-[0_0_0_1px_rgba(211,160,42,0.35),0_12px_32px_rgba(0,0,0,0.45)]">
        <img
          src={image}
          alt={title}
          className="w-full h-[120px] md:h-[150px] lg:h-[180px] object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.07]"
        />
      </div>

      <p className="mt-3 md:mt-5 text-[10px] md:text-[11px] tracking-[2px] md:tracking-[3px] uppercase font-light text-brand-gold group-hover:text-white transition duration-300">
        {title}
      </p>
    </div>
  );
}
