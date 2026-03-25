import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  text: string;
};

export default function FeatureCard({ icon: Icon, text }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 md:p-10 text-center shadow-sm hover:shadow-md transition">
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#f2f2f2] mx-auto flex items-center justify-center mb-4 md:mb-6">
        <Icon className="w-6 h-6 md:w-8 md:h-8 text-black" strokeWidth={1.5} />
      </div>

      <p className="text-[13px] md:text-[15px] font-medium text-black">{text}</p>
    </div>
  );
}
