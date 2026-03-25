import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  rows: { size: string; mm: string }[][];
  onClose: () => void;
}

export default function SizeGuideModal({
  isOpen,
  rows,
  onClose,
}: SizeGuideModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[84vh] overflow-y-auto rounded-[20px] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 cursor-pointer top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-[#888] transition hover:bg-[#f4f4f4] hover:text-black"
          aria-label="Close size guide"
        >
          <X size={28} strokeWidth={1.5} />
        </button>

        <div className="border-b border-[#e8e8e8] px-5 py-4 md:px-8 md:py-5">
          <p className="text-center text-[12px] tracking-[4px] text-[#6c6c6c] uppercase">
            Ring Size Guide
          </p>
        </div>

        <div className="px-5 pb-7 pt-5 md:px-10 md:pb-10 md:pt-8">
          <div className="mx-auto max-w-[44rem] text-center">
            <h3
              id="size-guide-title"
              className="mb-3 text-[28px] font-light text-[#2e2e2e] md:text-[34px]"
            >
              Size Chart
            </h3>
            <p className="mb-3 text-[15px] leading-7 text-[#4b4b4b] md:text-[17px]">
              1. Find a ring that is the right fit for you, or for the person you are buying for.
            </p>
            <p className="text-[15px] leading-7 text-[#4b4b4b] md:text-[17px]">
              2. Match the inside edge of your ring to the circle below. If your ring is not perfectly round, measure the shortest inside diameter.
            </p>
          </div>

          <div className="mt-8 space-y-6 md:space-y-8">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-wrap items-center justify-center gap-4 md:gap-6"
              >
                {row.map((item) => (
                  <div
                    key={item.size}
                    className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[#b39210] text-center text-white shadow-sm md:h-24 md:w-24"
                  >
                    <span className="text-[18px] font-medium leading-none">
                      {item.size}
                    </span>
                    <span className="mt-1 text-[13px] leading-none md:text-[14px]">
                      {item.mm}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-[13px] leading-6 text-[#666] md:mt-12 md:text-[14px]">
            If you need help choosing the right size, contact our customer support team and we can guide you.
          </p>
        </div>
      </div>
    </div>
  );
}
