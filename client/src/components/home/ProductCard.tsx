type ProductCardProps = {
  image: string;
  title: string;
  price: string;
};

export default function ProductCard({
  image,
  title,
  price,
}: ProductCardProps) {
  return (
    <div className="group text-center">
      <div className="overflow-hidden bg-[#f2f2f2]">
        <img
          src={image}
          alt={title}
          className="w-full h-[220px] md:h-[250px] lg:h-[280px] object-cover bg-[#f2f2f2] transition-transform duration-[1800ms] ease-out group-hover:scale-[1.05]"
        />
      </div>

      <p className="mt-4 md:mt-5 text-[13px] md:text-[14px] leading-5 md:leading-6 text-[#444] font-light">
        {title}
      </p>

      <p className="mt-2 md:mt-3 text-[16px] md:text-[18px] font-semibold text-[#444]">
        {price}
      </p>
    </div>
  );
}
