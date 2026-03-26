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
          className="group relative overflow-hidden bg-white cursor-pointer"
        >
          {index === 0 && (
            <span className="absolute top-0 left-0 w-full block text-center bg-black text-white text-[11px] py-2 tracking-[2px] z-10">
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
