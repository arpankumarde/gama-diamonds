import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  text: string;
};

export default function FeatureCard({ icon: Icon, text }: FeatureCardProps) {
  return (
    <div className="group bg-white p-6 md:p-10 text-center rounded-2xl border border-brand-gold/15 shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-brand-gold/50 hover:shadow-[0_0_0_1px_rgba(211,160,42,0.20),0_20px_48px_rgba(0,0,0,0.12)] transition duration-300">
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-brand-green mx-auto flex items-center justify-center mb-4 md:mb-6 shadow-[0_8px_20px_rgba(15,45,42,0.25)] group-hover:shadow-[0_8px_24px_rgba(15,45,42,0.40)] transition duration-300">
        <Icon className="w-6 h-6 md:w-8 md:h-8 text-brand-gold" strokeWidth={1.5} />
      </div>
      <p className="text-[12px] md:text-[14px] tracking-[1px] uppercase font-medium text-[#111] group-hover:text-brand-green transition duration-300">{text}</p>
    </div>
  );
}
