import { Heart } from "lucide-react";

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
      <div className="relative overflow-hidden rounded-2xl border border-brand-gold/15 bg-white shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_16px_40px_rgba(0,0,0,0.10)] transition duration-500 group-hover:border-brand-gold/50 group-hover:shadow-[0_0_0_1px_rgba(211,160,42,0.20),0_20px_48px_rgba(0,0,0,0.15)]">
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-[220px] md:h-[250px] lg:h-[280px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />
        </div>
        
        {/* Heart icon - always visible */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition duration-300">
          <Heart className="w-4 h-4 text-brand-gold group-hover:text-white" strokeWidth={1.5} />
        </div>
        
        {/* Rating overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green/50 via-brand-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
          <div className="flex items-center gap-1 text-white">
            <span className="text-[10px] tracking-[2px] uppercase font-medium">★★★★★</span>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-5">
        <p className="text-[12px] md:text-[13px] leading-5 md:leading-6 text-brand-gold font-light group-hover:text-[#111] transition duration-300">
          {title}
        </p>

        <p className="mt-2 md:mt-3 text-[15px] md:text-[16px] font-semibold text-brand-gold group-hover:text-[#111] transition duration-300">
          {price}
        </p>
        
        {/* Decorative underline - always visible */}
        <div className="w-8 h-[1px] bg-brand-gold mx-auto mt-2 transition-all duration-300"></div>
      </div>
    </div>
  );
}
