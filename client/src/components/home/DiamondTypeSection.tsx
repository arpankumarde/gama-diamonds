import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { diamondCollections } from "../../data/products";

export default function DiamondTypeSection() {
  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-8 lg:px-12 border-t border-brand-gold/10">
      <div className="text-center mb-10 md:mb-16">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
          <p className="text-[10px] tracking-[4px] uppercase text-brand-gold/70">Premium Collections</p>
          <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
        </div>
        
        <h3 className="text-[16px] md:text-[18px] lg:text-[20px] tracking-[4px] md:tracking-[5px] font-light uppercase">
          <span className="text-[#111]">Select Diamond </span>
          <span className="text-brand-gold">Type</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-8 max-w-[1300px] mx-auto">
        {diamondCollections.map((item) => (
          <Link
            key={item.slug}
            to={`/collections/${item.slug}`}
            className="text-center block group"
          >
            <div className="relative overflow-hidden rounded-2xl border border-brand-gold/15 bg-white shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_16px_40px_rgba(0,0,0,0.10)] transition duration-500 group-hover:border-brand-gold/50 group-hover:shadow-[0_0_0_1px_rgba(211,160,42,0.20),0_20px_48px_rgba(0,0,0,0.15)]">
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[250px] md:h-[280px] lg:h-[320px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
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
              <p className="text-[11px] md:text-[13px] tracking-[3px] md:tracking-[4px] uppercase font-light text-brand-gold group-hover:text-brand-green transition duration-300">
                {item.title}
              </p>
              
              {/* Decorative underline - always visible */}
              <div className="w-8 h-[1px] bg-brand-gold/60 mx-auto mt-2 group-hover:bg-brand-gold transition-all duration-300"></div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Decorative bottom accent */}
      <div className="flex justify-center mt-12 md:mt-16">
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
      </div>
    </section>
  );
}
