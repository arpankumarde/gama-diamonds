import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

type CategoryCardProps = {
  slug: string;
  image: string;
  title: string;
};

export default function CategoryCard({
  slug,
  image,
  title,
}: CategoryCardProps) {
  return (
    <Link to={`/category/${slug}`} className="group text-center block">
      <div className="relative overflow-hidden rounded-2xl border border-brand-gold/15 bg-white shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_16px_40px_rgba(0,0,0,0.10)] transition duration-500 group-hover:border-brand-gold/50 group-hover:shadow-[0_0_0_1px_rgba(211,160,42,0.20),0_20px_48px_rgba(0,0,0,0.15)]">
        <div className="overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-[150px] md:h-[180px] lg:h-[200px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />
        </div>
        
        {/* Explore button - always visible, no overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-6 group-hover:bg-gradient-to-t group-hover:from-brand-green/50 group-hover:via-brand-green/10 group-hover:to-transparent transition-all duration-500">
          <div className="flex items-center gap-2 text-white">
            <span className="text-[10px] tracking-[2px] uppercase font-medium">Explore</span>
            <ArrowRight className="w-3 h-3" strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6">
        <p className="text-[11px] md:text-[12px] lg:text-[13px] tracking-[3px] md:tracking-[4px] uppercase font-light text-brand-gold group-hover:text-brand-green transition duration-300">
          {title}
        </p>
        
        {/* Decorative underline - always visible */}
        <div className="w-8 h-[1px] bg-brand-gold/60 mx-auto mt-2 group-hover:bg-brand-gold transition-all duration-300"></div>
      </div>
    </Link>
  );
}
