import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  rows: { size: string; mm: string }[][];
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, rows, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[84vh] overflow-y-auto rounded-2xl bg-white shadow-[0_0_0_1px_rgba(211,160,42,0.15),0_32px_64px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/20 text-brand-gold hover:bg-brand-green hover:text-white hover:border-brand-green transition duration-300"
          aria-label="Close size guide"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Header */}
        <div className="bg-brand-green border-b border-brand-gold/30 px-5 py-5 md:px-8 md:py-6">
          <div className="flex items-center justify-center gap-4">
            <span className="block w-8 h-[1px] bg-brand-gold/60"></span>
            <p className="text-center text-[11px] tracking-[4px] text-brand-gold uppercase">
              Ring Size Guide
            </p>
            <span className="block w-8 h-[1px] bg-brand-gold/60"></span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8">
          <div className="mx-auto max-w-[44rem] text-center mb-8">
            <h3
              id="size-guide-title"
              className="mb-4 text-[24px] md:text-[30px] font-light text-[#111] tracking-[2px] uppercase"
            >
              Size <span className="text-brand-gold">Chart</span>
            </h3>
            <p className="mb-3 text-[13px] md:text-[14px] leading-7 text-black/60">
              1. Find a ring that is the right fit for you, or for the person you are buying for.
            </p>
            <p className="text-[13px] md:text-[14px] leading-7 text-black/60">
              2. Match the inside edge of your ring to the circle below. If your ring is not perfectly round, measure the shortest inside diameter.
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {row.map((item) => (
                  <div
                    key={item.size}
                    className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-brand-green border-2 border-brand-gold/40 text-center shadow-[0_4px_16px_rgba(15,45,42,0.25)] md:h-24 md:w-24 hover:border-brand-gold hover:shadow-[0_4px_20px_rgba(211,160,42,0.25)] transition duration-300"
                  >
                    <span className="text-[18px] font-medium leading-none text-brand-gold">
                      {item.size}
                    </span>
                    <span className="mt-1 text-[12px] leading-none text-white/80 md:text-[13px]">
                      {item.mm}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-[12px] md:text-[13px] leading-6 text-black/50 md:mt-12">
            If you need help choosing the right size, contact our customer support team and we can guide you.
          </p>
        </div>
      </div>
    </div>
  );
}
