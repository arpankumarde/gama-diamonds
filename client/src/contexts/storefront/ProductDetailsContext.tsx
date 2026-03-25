import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate, useParams } from "react-router";
import { useCart } from "@/components/cart/cart-context";
import { getProductBySlug, getRelatedProducts } from "@/lib/api";
import type { Product } from "@/lib/api";
import {
  diamondTypeOptions,
  fingerSizeOptions,
  sizeGuideRows,
} from "@/components/product-details/productDetailsData";

type MediaItem = {
  type: 'image' | 'video';
  src: string;
};

type FrontendProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  video?: string;
  carat?: number;
  color?: string;
  clarity?: string;
  cut?: string;
  shape?: string;
  metal?: string;
  stock: number;
  tags: string[];
  isActive: boolean;
  media: MediaItem[];
  image: string;
  title: string;
};

type ProductDetailsContextValue = {
  product: FrontendProduct | null;
  fullMedia: MediaItem[];
  currentMediaIndex: number;
  currentMediaItem: MediaItem | undefined;
  mediaModalRef: React.RefObject<HTMLDivElement | null>;
  isSizeGuideOpen: boolean;
  isMediaModalOpen: boolean;
  size: string;
  selectedDiamond: string;
  totalPrice: number;
  diamondTypeOptions: typeof diamondTypeOptions;
  fingerSizeOptions: typeof fingerSizeOptions;
  sizeGuideRows: typeof sizeGuideRows;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  youMayAlsoLikeCards: Array<{
    id: string;
    title: string;
    price: number;
    image: string;
    link: string;
  }>;
  youMayLikeSliderRef: React.RefObject<HTMLDivElement | null>;
  backLabel: string;
  loading: boolean;
  error: string | null;
  sizeError: string | null;
  setCurrentMediaIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedDiamond: (value: string) => void;
  setSize: (value: string) => void;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
  openMediaModal: () => void;
  closeMediaModal: () => void;
  openMediaAtIndex: (index: number) => void;
  slideYouMayLike: (direction: "left" | "right") => void;
  handleBack: () => void;
  handleAddToCart: () => void;
  clearSizeError: () => void;
};

const ProductDetailsContext = createContext<ProductDetailsContextValue | null>(null);

export function ProductDetailsProvider({ children }: { children: ReactNode }) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [size, setSize] = useState("");
  const [selectedDiamond, setSelectedDiamond] = useState("Lab Grown");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const youMayLikeSliderRef = useRef<HTMLDivElement | null>(null);
  const mediaModalRef = useRef<HTMLDivElement | null>(null);
  const [product, setProduct] = useState<FrontendProduct | null>(null);

  useEffect(() => {
    if (!slug) {
      setError("No slug provided");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProductBySlug(slug);
        if (response.success && response.data) {
          const dbProduct: Product = response.data;
          // Map to frontend format
          const frontendProduct: FrontendProduct = {
            id: dbProduct._id,
            name: dbProduct.name,
            slug: dbProduct.slug,
            description: dbProduct.description,
            price: dbProduct.salePrice || dbProduct.price,
            salePrice: dbProduct.salePrice,
            images: dbProduct.images,
            video: dbProduct.video,
            carat: dbProduct.carat,
            color: dbProduct.color,
            clarity: dbProduct.clarity,
            cut: dbProduct.cut,
            shape: dbProduct.shape,
            metal: dbProduct.metal,
            stock: dbProduct.stock,
            tags: dbProduct.tags,
            isActive: dbProduct.isActive,
            image: dbProduct.images[0] || "",
            title: dbProduct.name,
            media: [
              ...dbProduct.images.map((src: string) => ({
                type: "image" as const,
                src,
              } as MediaItem)),
              ...(dbProduct.video ? [{
                type: "video" as const,
                src: dbProduct.video,
              } as MediaItem] : []),
            ],
          };
          setProduct(frontendProduct);
        } else {
          setError("Product not found");
        }
      } catch (err: any) {
        console.error("Fetch product error:", err);
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const fullMedia = product?.media || [];
  const currentMediaItem = fullMedia[currentMediaIndex];

  useEffect(() => {
    if (!isMediaModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          setCurrentMediaIndex((prev) => Math.max(0, prev - 1));
          break;
        case "ArrowRight":
          setCurrentMediaIndex((prev) => (prev + 1) % fullMedia.length);
          break;
        case "Escape":
          setIsMediaModalOpen(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMediaModalOpen, fullMedia.length]);

  useEffect(() => {
    setCurrentMediaIndex(0);
    setIsMediaModalOpen(false);
    setIsSizeGuideOpen(false);
    setSize("");
    setSelectedDiamond("Lab Grown");
  }, [slug]);

  // Fetch related products
  useEffect(() => {
    if (!product || !product.id) return;

    const fetchRelated = async () => {
      try {
        const response = await getRelatedProducts(product.id, 8);
        if (response.success && response.data) {
          setRelatedProducts(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch related products:", err);
        // Silently fail - component will just show empty related section
      }
    };

    fetchRelated();
  }, [product?.id]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const basePrice = product?.price || 0;
  const diamondTypePrice = selectedDiamond === "Natural" ? basePrice * 1.5 : basePrice;
  const totalPrice = diamondTypePrice;

  const youMayAlsoLikeCards = relatedProducts.slice(0, 8).map((item, index) => ({
    id: item._id,
    title: item.name,
    price: item.salePrice || item.price,
    image: item.images[0] || "",
    link: `/product/${item.slug}`,
  }));
  const backLabel = "Products";

  const updateSliderState = () => {
    const slider = youMayLikeSliderRef.current;
    if (!slider) return;
    setCanScrollLeft(slider.scrollLeft > 4);
    setCanScrollRight(slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 4);
  };

  useEffect(() => {
    updateSliderState();
    const slider = youMayLikeSliderRef.current;
    slider?.addEventListener("scroll", updateSliderState);
    window.addEventListener("resize", updateSliderState);
    return () => {
      slider?.removeEventListener("scroll", updateSliderState);
      window.removeEventListener("resize", updateSliderState);
    };
  }, [youMayAlsoLikeCards.length]);

  useEffect(() => {
    if (!isSizeGuideOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSizeGuideOpen(false);
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSizeGuideOpen]);

  const slideYouMayLike = (direction: "left" | "right") => {
    const slider = youMayLikeSliderRef.current;
    if (!slider) return;
    const offset = 300;
    slider.scrollBy({
      left: direction === "right" ? offset : -offset,
      behavior: "smooth",
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Validate finger size is selected
    if (!size || size.trim() === "") {
      setSizeError("Please select finger size");
      return;
    }

    // Clear error if validation passes
    setSizeError(null);

    addToCart({
      productId: product.id,
      productSlug: product.slug,
      title: product.title,
      image: product.image,
      price: totalPrice,
      diamondType: selectedDiamond,
      metal: product.metal || "",
      size: size,
    });
  }; 

  const openSizeGuide = () => setIsSizeGuideOpen(true);
  const closeSizeGuide = () => setIsSizeGuideOpen(false);
  const openMediaModal = () => setIsMediaModalOpen(true);
  const closeMediaModal = () => setIsMediaModalOpen(false);
  const openMediaAtIndex = (index: number) => {
    setCurrentMediaIndex(index);
    setIsMediaModalOpen(true);
  };

  const value = useMemo(() => ({
    product,
    fullMedia,
    currentMediaIndex,
    currentMediaItem,
    mediaModalRef,
    isSizeGuideOpen,
    isMediaModalOpen,
    size,
    selectedDiamond,
    totalPrice,
    diamondTypeOptions,
    fingerSizeOptions,
    sizeGuideRows,
    canScrollLeft,
    canScrollRight,
    youMayAlsoLikeCards,
    youMayLikeSliderRef,
    backLabel,
    loading,
    error,
    sizeError,
    setCurrentMediaIndex,
    setSelectedDiamond,
    setSize: (value: string) => {
      setSize(value);
      setSizeError(null); // Clear error when user selects a size
    },
    openSizeGuide,
    closeSizeGuide,
    openMediaModal,
    closeMediaModal,
    openMediaAtIndex,
    slideYouMayLike,
    handleBack,
    handleAddToCart,
    clearSizeError: () => setSizeError(null),
  }), [
    product,
    fullMedia,
    currentMediaIndex,
    currentMediaItem,
    isSizeGuideOpen,
    isMediaModalOpen,
    size,
    selectedDiamond,
    totalPrice,
    canScrollLeft,
    canScrollRight,
    youMayAlsoLikeCards,
    backLabel,
    loading,
    error,
    sizeError,
  ]);

  return (
    <ProductDetailsContext.Provider value={value}>
      {children}
    </ProductDetailsContext.Provider>
  );
}

export function useProductDetailsContext() {
  const context = useContext(ProductDetailsContext);
  if (!context) {
    throw new Error("useProductDetailsContext must be used within ProductDetailsProvider");
  }
  return context;
}

