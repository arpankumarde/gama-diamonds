import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type RefObject,
} from "react";
import { useNavigate } from "react-router";
import type { Product } from "@/lib/api";
import { getAllProducts, getFilterOptions } from "@/lib/api";

interface FilterOptions {
  colors: string[];
  clarities: string[];
  cuts: string[];
  shapes: string[];
  metals: string[];
  categories: any[];
  priceRange: { min: number; max: number };
}

type ProductListingContextValue = {
  category?: string;
  collection?: string;
  products: Product[];
  total: number;
  pages: number;
  isLoading: boolean;
  error: string | null;
  filterOptions: FilterOptions | null;
  activeCategory: { title: string; image: string };
  activeCollection: { title: string; image: string };
  openAccordions: string[];
  inStockOnly: boolean;
  selectedDiamond: string[];
  selectedMetal: string[];
  selectedStyle: string[];
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  isFilterOpen: boolean;
  mobileSortOpen: boolean;
  desktopSortOpen: boolean;
  currentPage: number;
  hasMore: boolean;
  mobileSortRef: RefObject<HTMLDivElement | null>;
  desktopSortRef: RefObject<HTMLDivElement | null>;
  loadMore: () => void;
  refetch: () => void;
  setIsFilterOpen: (value: boolean) => void;
  toggleAccordion: (item: string) => void;
  setInStockOnly: (value: boolean) => void;
  toggleDiamond: (value: string) => void;
  toggleMetal: (value: string) => void;
  toggleStyle: (value: string) => void;
  handleMinPriceChange: (value: string) => void;
  handleMaxPriceChange: (value: string) => void;
  clearPriceFilter: () => void;
  clearAllFilters: () => void;
  handleBack: () => void;
  toggleMobileSort: () => void;
  toggleDesktopSort: () => void;
  selectSortOption: (value: string, mobile?: boolean) => void;
};

const ProductListingContext = createContext<ProductListingContextValue | null>(
  null,
);

type ProductListingProviderProps = {
  children: ReactNode;
  category?: string;
  collection?: string;
};

export function ProductListingProvider({
  children,
  category,
  collection,
}: ProductListingProviderProps) {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [selectedMetal, setSelectedMetal] = useState<string[]>([]);
  const [selectedDiamond, setSelectedDiamond] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<string[]>(["price"]);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);
  const [desktopSortOpen, setDesktopSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const mobileSortRef = useRef<HTMLDivElement>(null);
  const desktopSortRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load filter options
  const loadFilterOptions = useCallback(async () => {
    try {
      const response = await getFilterOptions();
      setFilterOptions(response.data);
    } catch (err) {
      console.error("Failed to load filter options:", err);
    }
  }, []);

  useEffect(() => {
    loadFilterOptions();
  }, [loadFilterOptions]);

  // Build filters object for backend
    const buildFilters = useMemo(() => {
    const filters: Record<string, any> = {};
    
    if (category) filters.category = category;
    if (collection) filters.search = collection;
    
    if (minPrice && minPrice !== '') filters.minPrice = Number(minPrice);
    if (maxPrice && maxPrice !== '') filters.maxPrice = Number(maxPrice);
    
    if (selectedDiamond.length > 0) {
      filters.diamondType = selectedDiamond.join(',');
    }
    if (selectedMetal.length > 0) {
      filters.metal = selectedMetal.join(',');
    }
    if (selectedStyle.length > 0) {
      filters.shape = selectedStyle.join(',');
    }
    
    return filters;
  }, [category, collection, minPrice, maxPrice, selectedDiamond, selectedMetal, selectedStyle]);

  // Map sortBy to backend sort param
  const getSortParam = useMemo(() => {
    switch (sortBy) {
      case "price-low": return "price";
      case "price-high": return "-price";
      case "newest": return "-createdAt";
      default: return "-createdAt";
    }
  }, [sortBy]);

  // Fetch products
  const fetchProducts = useCallback(async (page: number = 1, append = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getAllProducts(page, 20, buildFilters, getSortParam, controller.signal);
      
      // Check if this request was aborted before processing results
      if (controller.signal.aborted) {
        return;
      }
      
      if (!response.success) throw new Error("Failed to fetch products");
      
      setProducts(append ? prev => [...prev, ...response.data] : response.data);
      setTotal(response.pagination?.total || 0);
      setPages(response.pagination?.pages || 0);
      setHasMore(page < (response.pagination?.pages || 0));
      
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load products");
      }
    } finally {
      setIsLoading(false);
    }
  }, [buildFilters, getSortParam]);

  // Reset page and refetch on filter/sort/category change
  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1, false);
  }, [buildFilters, getSortParam, category, collection, fetchProducts]);

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProducts(nextPage, true);
  };

  const refetch = useCallback(() => {
    fetchProducts(1, false);
  }, [fetchProducts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (mobileSortRef.current && !mobileSortRef.current.contains(target)) {
        setMobileSortOpen(false);
      }
      if (desktopSortRef.current && !desktopSortRef.current.contains(target)) {
        setDesktopSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const toggleAccordion = (item: string) => {
    setOpenAccordions((prev) =>
      prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item],
    );
  };

  const toggleCheckbox = (
    values: string[],
    setValues: React.Dispatch<React.SetStateAction<string[]>>,
    value: string,
  ) => {
    if (values.includes(value)) {
      setValues(values.filter((item) => item !== value));
      return;
    }

    setValues([...values, value]);
  };

  const activeCategory = { title: category || '', image: '' };
  const activeCollection = { title: collection || '', image: '' };

  const handleMinPriceChange = (value: string) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value: string) => {
    setMaxPrice(value);
  };

  const clearPriceFilter = () => {
    setMinPrice("");
    setMaxPrice("");
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  const clearAllFilters = () => {
    setSelectedMetal([]);
    setSelectedDiamond([]);
    setSelectedStyle([]);
    setInStockOnly(false);
    setMinPrice("");
    setMaxPrice("");
  };

  const toggleMobileSort = () => {
    setMobileSortOpen((prev) => !prev);
  };

  const toggleDesktopSort = () => {
    setDesktopSortOpen((prev) => !prev);
  };

  const selectSortOption = (value: string, mobile = false) => {
    setSortBy(value);

    if (mobile) {
      setMobileSortOpen(false);
      return;
    }

    setDesktopSortOpen(false);
  };

  const value = useMemo<ProductListingContextValue>(
    () => ({
      category,
      collection,
      products,
      total,
      pages,
      isLoading,
      error,
      filterOptions,
      activeCategory,
      activeCollection,
      openAccordions,
      inStockOnly,
      selectedDiamond,
      selectedMetal,
      selectedStyle,
      minPrice,
      maxPrice,
      sortBy,
      isFilterOpen,
      mobileSortOpen,
      desktopSortOpen,
      currentPage,
      hasMore,
      mobileSortRef,
      desktopSortRef,
      loadMore,
      refetch,
      setIsFilterOpen,
      toggleAccordion,
      setInStockOnly,
      toggleDiamond: (value) =>
        toggleCheckbox(selectedDiamond, setSelectedDiamond, value),
      toggleMetal: (value) => toggleCheckbox(selectedMetal, setSelectedMetal, value),
      toggleStyle: (value) => toggleCheckbox(selectedStyle, setSelectedStyle, value),
      handleMinPriceChange,
      handleMaxPriceChange,
      clearPriceFilter,
      clearAllFilters,
      handleBack,
      toggleMobileSort,
      toggleDesktopSort,
      selectSortOption,
    }),
    [
      category,
      collection,
      products,
      total,
      pages,
      isLoading,
      error,
      filterOptions,
      activeCategory,
      activeCollection,
      openAccordions,
      inStockOnly,
      selectedDiamond,
      selectedMetal,
      selectedStyle,
      minPrice,
      maxPrice,
      sortBy,
      isFilterOpen,
      mobileSortOpen,
      desktopSortOpen,
      currentPage,
      hasMore,
    ],
  );

  return (
    <ProductListingContext.Provider value={value}>
      {children}
    </ProductListingContext.Provider>
  );
}

export function useProductListingContext() {
  const context = useContext(ProductListingContext);

  if (!context) {
    throw new Error(
      "useProductListingContext must be used within a ProductListingProvider",
    );
  }

  return context;
}
