import { useCurrency } from "@/contexts/storefront/CurrencyContext";

type SocialVideoCardProps = {
  poster: string;
  video: string;
  title: string;
  price: number;
};

export default function SocialVideoCard({
  poster,
  video,
  title,
  price,
}: SocialVideoCardProps) {
  const { formatPriceFromUSD } = useCurrency();
  return (
    <div className="min-w-[240px] md:min-w-[280px] bg-[#0a1f1d] rounded-2xl overflow-hidden border border-brand-gold/20 shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_16px_40px_rgba(0,0,0,0.45)] hover:border-brand-gold/50 transition duration-300">
      <video
        className="w-full h-[350px] md:h-[420px] object-cover"
        poster={poster}
        src={video}
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="p-3 md:p-4 text-center border-t border-brand-gold/15">
        <p className="text-[11px] md:text-[13px] mb-2 leading-5 md:leading-6 text-white/80 tracking-[1px]">
          {title}
        </p>
        <p className="font-semibold text-[14px] md:text-[15px] text-brand-gold">
          {formatPriceFromUSD(price)}
        </p>
      </div>
    </div>
  );
}
