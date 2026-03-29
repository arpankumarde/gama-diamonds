import { useProductDetailsContext } from "@/contexts/storefront/ProductDetailsContext";

export default function ProductMediaGrid() {
  const { product, fullMedia, openMediaModal, openMediaAtIndex } =
    useProductDetailsContext();

  if (!product) {
    return null;
  }

  return (
    <div
      className="grid grid-cols-2 items-start gap-1 lg:ml-15 cursor-pointer"
      onClick={openMediaModal}
    >
      {fullMedia.map((item, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-xl border border-brand-gold/15 bg-white cursor-pointer shadow-[0_0_0_1px_rgba(211,160,42,0.05)] hover:border-brand-gold/40 transition duration-500"
        >
          {index === 0 && (
            <span className="absolute top-0 left-0 w-full block text-center bg-brand-green text-brand-gold text-[11px] py-2 tracking-[2px] z-10 font-medium">
              NEXT DAY DELIVERY
            </span>
          )}

          {item.type === "image" ? (
            <img
              src={item.src}
              alt={product.title}
              className="h-[180px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] md:h-[280px] lg:h-[350px]"
              onClick={(e) => {
                e.stopPropagation();
                openMediaAtIndex(index);
              }}
            />
          ) : (
            <video
              className="h-[180px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] md:h-[280px] lg:h-[350px] cursor-pointer"
              poster={item.poster}
              src={item.src}
              autoPlay
              muted
              playsInline
              onClick={(e) => {
                e.stopPropagation();
                openMediaAtIndex(index);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
