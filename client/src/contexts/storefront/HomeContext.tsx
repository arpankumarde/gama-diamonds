import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { homeProducts } from "@/pages/dummyData";
import { heroImages } from "@/components/home/homeData";

type HomeContextValue = {
  heroImages: string[];
  current: number;
  loaded: boolean;
  categorySectionRef: RefObject<HTMLElement | null>;
  favoriteProducts: typeof homeProducts;
  favoriteProductIndex: number;
  productsPerPage: number;
  totalProductPages: number;
  activeProductPage: number;
  canGoPrevProducts: boolean;
  canGoNextProducts: boolean;
  activeBrand: number;
  reviewIndex: number;
  socialSliderRef: RefObject<HTMLDivElement | null>;
  scrollToCategories: () => void;
  nextProducts: () => void;
  prevProducts: () => void;
  setFavoriteProductIndex: (index: number) => void;
  setActiveBrand: (index: number) => void;
  scrollSocialLeft: () => void;
  scrollSocialRight: () => void;
};

const HomeContext = createContext<HomeContextValue | null>(null);

export function HomeProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState(0);
  const [favoriteProductIndex, setFavoriteProductIndex] = useState(0);
  const [activeBrand, setActiveBrand] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const socialSliderRef = useRef<HTMLDivElement>(null);
  const categorySectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextProducts = () => {
    if (favoriteProductIndex + 4 < homeProducts.length) {
      setFavoriteProductIndex(favoriteProductIndex + 4);
    }
  };

  const prevProducts = () => {
    if (favoriteProductIndex - 4 >= 0) {
      setFavoriteProductIndex(favoriteProductIndex - 4);
    }
  };

  const scrollSocialLeft = () => {
    socialSliderRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollSocialRight = () => {
    socialSliderRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  const scrollToCategories = () => {
    if (!categorySectionRef.current) return;

    const navbarOffset = window.innerWidth >= 768 ? 150 : 110;
    const top =
      categorySectionRef.current.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const productsPerPage = 4;
  const totalProductPages = Math.ceil(homeProducts.length / productsPerPage);
  const activeProductPage = Math.floor(favoriteProductIndex / productsPerPage);
  const canGoPrevProducts = favoriteProductIndex > 0;
  const canGoNextProducts =
    favoriteProductIndex + productsPerPage < homeProducts.length;

  const value = useMemo<HomeContextValue>(
    () => ({
      heroImages,
      current,
      loaded,
      categorySectionRef,
      favoriteProducts: homeProducts,
      favoriteProductIndex,
      productsPerPage,
      totalProductPages,
      activeProductPage,
      canGoPrevProducts,
      canGoNextProducts,
      activeBrand,
      reviewIndex,
      socialSliderRef,
      scrollToCategories,
      nextProducts,
      prevProducts,
      setFavoriteProductIndex,
      setActiveBrand,
      scrollSocialLeft,
      scrollSocialRight,
    }),
    [
      current,
      loaded,
      favoriteProductIndex,
      totalProductPages,
      activeProductPage,
      canGoPrevProducts,
      canGoNextProducts,
      activeBrand,
      reviewIndex,
    ],
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

export function useHomeContext() {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }

  return context;
}
