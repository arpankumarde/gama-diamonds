import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useProductDetailsContext } from "@/contexts/storefront/ProductDetailsContext";

export default function MediaModal() {
  const {
    isMediaModalOpen,
    product,
    fullMedia,
    currentMediaIndex,
    currentMediaItem,
    mediaModalRef,
    closeMediaModal,
    setCurrentMediaIndex,
  } = useProductDetailsContext();
  const thumbnailStripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMediaModalOpen) {
      return;
    }

    const strip = thumbnailStripRef.current;
    const activeThumbnail = strip?.querySelector<HTMLElement>(
      `[data-media-thumb="${currentMediaIndex}"]`,
    );

    activeThumbnail?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [currentMediaIndex, isMediaModalOpen]);

  if (!isMediaModalOpen || !product) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] bg-white"
      ref={mediaModalRef}
      onClick={(e) => {
        if (e.target === mediaModalRef.current) closeMediaModal();
      }}
    >
      <div className="relative flex h-screen w-full flex-col overflow-hidden">
        <button
          onClick={closeMediaModal}
          className="absolute left-4 top-4 z-30 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/8 transition hover:bg-[#f6f6f6] md:left-8 md:top-8 md:h-12 md:w-12"
          aria-label="Close media modal"
        >
          <X size={24} strokeWidth={2.1} />
        </button>

        <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-32 pt-20 md:px-18 md:pb-40 md:pt-24">
          <button
            onClick={() =>
              setCurrentMediaIndex(
                (prev) => (prev - 1 + fullMedia.length) % fullMedia.length,
              )
            }
            className="absolute left-8 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-2xl bg-white text-[#222] shadow-[0_12px_34px_rgba(0,0,0,0.12)] ring-1 ring-black/8 transition hover:bg-[#f6f6f6] disabled:cursor-not-allowed disabled:opacity-40 md:flex"
            disabled={fullMedia.length <= 1}
            aria-label="Previous media"
          >
            <ChevronLeft size={24} strokeWidth={2.3} />
          </button>

          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            {currentMediaItem ? (
              (() => {
                if (currentMediaItem.type === "image") {
                  return (
                    <img
                      src={currentMediaItem.src}
                      alt={`${product.title} - Image ${currentMediaIndex + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  );
                } else {
                  return (
                    <video
                      src={currentMediaItem.src}
                      poster={currentMediaItem.poster}
                      className="max-h-full max-w-full rounded-[20px] object-contain"
                      controls
                      autoPlay
                      muted
                      playsInline
                    />
                  );
                }
              })()
            ) : (
              <img
                src={product.image || ""}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            )}
          </div>

          <button
            onClick={() =>
              setCurrentMediaIndex((prev) => (prev + 1) % fullMedia.length)
            }
            className="absolute right-8 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-2xl bg-white text-[#222] shadow-[0_12px_34px_rgba(0,0,0,0.12)] ring-1 ring-black/8 transition hover:bg-[#f6f6f6] disabled:cursor-not-allowed disabled:opacity-40 md:flex"
            disabled={fullMedia.length <= 1}
            aria-label="Next media"
          >
            <ChevronRight size={24} strokeWidth={2.3} />
          </button>
        </div>

        <div className="absolute bottom-5 left-1/2 z-30 w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 md:bottom-8 md:w-[calc(100%-4rem)]">
          <div className="rounded-[26px] bg-white/96 px-3 py-3 shadow-[0_18px_50px_rgba(0,0,0,0.14)] ring-1 ring-black/8 backdrop-blur md:px-4 md:py-4">
            <div className="flex items-center justify-center gap-1.5 md:gap-0">
              <button
                onClick={() =>
                  setCurrentMediaIndex(
                    (prev) => (prev - 1 + fullMedia.length) % fullMedia.length,
                  )
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f7f7] text-[#222] transition hover:bg-[#efefef] disabled:cursor-not-allowed disabled:opacity-40 md:hidden"
                disabled={fullMedia.length <= 1}
                aria-label="Previous media"
              >
                <ChevronLeft size={20} strokeWidth={2.3} />
              </button>

              <div
                ref={thumbnailStripRef}
                className="no-scrollbar flex w-0 flex-1 items-center justify-start gap-2 overflow-x-auto px-2 md:max-w-full md:justify-center md:gap-3 md:px-1"
              >
                {fullMedia.map((thumbItem, thumbIndex) => (
                  <button
                    key={thumbIndex}
                    onClick={() => setCurrentMediaIndex(thumbIndex)}
                    data-media-thumb={thumbIndex}
                    className={`group relative h-14 w-14 shrink-0 overflow-hidden rounded-[18px] transition-all ${
                      thumbIndex === currentMediaIndex
                        ? "scale-[1.02] ring-2 ring-[#222] ring-offset-1 ring-offset-white md:scale-[1.03] md:ring-offset-2"
                        : "opacity-70 ring-1 ring-black/8 hover:opacity-100"
                    } ${thumbIndex === 0 ? "ml-0.5" : ""} ${thumbIndex === fullMedia.length - 1 ? "mr-0.5" : ""}`}
                    aria-label={`View media ${thumbIndex + 1}`}
                  >
                    {thumbItem.type === "image" ? (
                      <img
                        src={thumbItem.src}
                        alt=""
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="relative flex h-full w-full items-center justify-center bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${thumbItem.poster || product.image})`,
                        }}
                      >
                        <div className="absolute inset-0 bg-black/28" />
                        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/92 text-[#222] shadow-sm">
                          <Play size={14} fill="currentColor" />
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentMediaIndex((prev) => (prev + 1) % fullMedia.length)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f7f7] text-[#222] transition hover:bg-[#efefef] disabled:cursor-not-allowed disabled:opacity-40 md:hidden"
                disabled={fullMedia.length <= 1}
                aria-label="Next media"
              >
                <ChevronRight size={20} strokeWidth={2.3} />
              </button>
            </div>

            <div className="mt-3 text-center text-xs font-medium tracking-[0.24em] text-[#7a7a7a] md:text-sm">
              {currentMediaIndex + 1} / {fullMedia.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
