import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getAllProducts, createProduct, updateProductAPI, deleteProductAPI, getAllCategories, createCategory, updateCategoryAPI, deleteCategoryAPI, getAdminUsers, getAllCollections, createCollectionAPI, updateCollectionAPI, deleteCollectionAPI } from "@/lib/api";
import type {
  CategoryItem,
  CollectionItem,
  ProductItem,
  RecentOrder,
  StatMetric,
  UserItem,
} from "./types";


type AdminDataState = {
  products: ProductItem[];
  categories: CategoryItem[];
  collections: CollectionItem[];
  orders: RecentOrder[];
  users: UserItem[];
  settings: any;
};


type ProductInput = any;
type CategoryInput = { name: string; featured: boolean };
type CollectionInput = { name: string; curator?: string };

type AdminDataContextValue = AdminDataState & {
  dashboardStats: StatMetric[];
  addProduct: (input: any) => Promise<void>;
  updateProduct: (id: string, input: ProductInput) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (input: CategoryInput) => Promise<void>;
  updateCategory: (id: string, input: CategoryInput) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addCollection: (input: CollectionInput) => Promise<void>;
  updateCollection: (id: string, input: CollectionInput) => Promise<void>;
  deleteCollection: (id: string) => Promise<void>;
  updateSettings: (input: any) => void;
  loading: boolean;
};

const AdminDataContext = createContext<AdminDataContextValue | null>(null);

const defaultState: AdminDataState = {
  products: [],
  categories: [],
  collections: [],
  orders: [],
  users: [],
  settings: {
    currency: "USD",
    theme: "Ivory Gold",
    fullName: "",
    email: "",
    password: "",
  },
};


function parseAmount(value: string) {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatCurrency(value: number) {
  if (value >= 1000) {
    return `$${(value / 1000).toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    })}K`;
  }

  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: value === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatCompactNumber(value: number) {
  return value.toLocaleString("en-US");
}

function withDerivedCounts(state: AdminDataState): AdminDataState {
  const categories = state.categories.map((category) => ({
    ...category,
    products: state.products.filter(
      (product) =>
        (typeof product.category === "object" ? product.category._id : product.category) === category._id
    ).length,
  }));

  const collections = state.collections.map((collection) => ({
    ...collection,
    products: 0,
  }));

  return { ...state, categories, collections };
}

function mapBackendProduct(product: any): ProductItem {
  return {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    description: product.description || "",
    price: product.price,
    salePrice: product.salePrice,
    sku: product.sku,
    category: product.category || { _id: "", name: "Unassigned" },
    images: product.images || [],
    carat: product.carat,
    color: product.color,
    shape: product.shape,
    metal: product.metal,
    stock: product.stock || 0,
    tags: product.tags || [],
    video: product.video,
    diamondType: product.diamondType,
    isActive: product.isActive !== false,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

function getInitialState(): AdminDataState {
  if (typeof window === "undefined") {
    return defaultState;
  }
  return defaultState;
}


export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminDataState>(getInitialState());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [productsResponse, categoriesResponse, usersResponse, collectionsResponse] = await Promise.all([
          getAllProducts(1, 100, { isActive: "all" }),
          getAllCategories(),
          getAdminUsers(),
          getAllCollections(),
        ]);
        setState(prev => withDerivedCounts({
          ...prev,
          ...(productsResponse.success && {
            products: productsResponse.data.map(mapBackendProduct),
          }),
          ...(categoriesResponse.success && {
            categories: categoriesResponse.data.map((c) => ({
              _id: c._id,
              name: c.name,
              slug: c.slug,
              featured: c.featured ?? false,
              products: 0,
            })),
          }),
          ...(usersResponse.success && {
            users: usersResponse.data,
          }),
          ...(collectionsResponse.success && {
            collections: collectionsResponse.data.map((c: any) => ({
              _id: c._id,
              name: c.name,
              curator: c.curator ?? "",
              products: Array.isArray(c.products) ? c.products.length : 0,
            })),
          }),
        }));
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);


  const value = useMemo<AdminDataContextValue>(() => {
    const paidRevenue = state.orders.reduce((total, order) => {
      if (order.payment !== "Paid") return total;
      return total + parseAmount(order.amount);
    }, 0);

    const dashboardStats: StatMetric[] = [
      {
        label: "Total Sales",
        value: paidRevenue > 0 ? formatCurrency(paidRevenue) : "$0",
      },
      {
        label: "Total Orders",
        value: formatCompactNumber(state.orders.length),
      },
      {
        label: "Total Products",
        value: formatCompactNumber(state.products.length),
      },
      {
        label: "Total Users",
        value: formatCompactNumber(state.users.length),
      },
    ];

    return {
      ...state,
      dashboardStats,
      addProduct: async (input) => {
        try {
          const payload: any = {
            name: input.name,
            description: input.description,
            price: Number(input.price),
            sku: input.sku || `SKU-${Date.now()}`,
            category: typeof input.category === 'object' ? input.category._id : input.category,
            images: input.images || [],
            stock: Number(input.stock) || 0,
            ...(input.salePrice && { salePrice: Number(input.salePrice) }),
            ...(input.carat && { carat: Number(input.carat) }),
            ...(input.color && { color: input.color }),
            ...(input.shape && { shape: input.shape }),
            ...(input.metal && { metal: input.metal }),
            ...(input.tags?.length && { tags: input.tags }),
            ...(input.video && { video: input.video }),
            ...(input.diamondType && { diamondType: input.diamondType }),
          };

          const response = await createProduct(payload);
          if (response.success) {
            const newProduct = mapBackendProduct(response.data);
            setState(prev => ({
              ...prev,
              products: [...prev.products, newProduct],
            }));
          }
        } catch (error) {
          console.error("Failed to create product:", error);
          throw error;
        }
      },

      updateProduct: async (id, input) => {
        try {
          const payload: any = {
            name: input.name,
            description: input.description,
            price: Number(input.price),
            sku: input.sku,
            category: typeof input.category === "object" ? input.category._id : input.category,
            images: input.images || [],
            stock: Number(input.stock) || 0,
            ...(input.salePrice && { salePrice: Number(input.salePrice) }),
            ...(input.carat && { carat: Number(input.carat) }),
            ...(input.color && { color: input.color }),
            ...(input.shape && { shape: input.shape }),
            ...(input.metal && { metal: input.metal }),
            ...(input.tags && { tags: input.tags }),
            ...(input.video && { video: input.video }),
            ...(input.diamondType && { diamondType: input.diamondType }),
          };
          const response = await updateProductAPI(id, payload);
          if (response.success) {
            const updated = mapBackendProduct(response.data);
            setState((current) => withDerivedCounts({
              ...current,
              products: current.products.map((p) => p._id === id ? updated : p),
            }));
          }
        } catch (error) {
          console.error("Failed to update product:", error);
          throw error;
        }
      },
      deleteProduct: async (id) => {
        await deleteProductAPI(id);
        setState((current) => withDerivedCounts({
          ...current,
          products: current.products.filter((p) => p._id !== id),
        }));
      },
      addCategory: async (input) => {
        const response = await createCategory({ name: input.name, featured: input.featured });
        if (response.success) {
          setState((current) => withDerivedCounts({
            ...current,
            categories: [...current.categories, {
              _id: response.data._id,
              name: response.data.name,
              slug: response.data.slug,
              featured: response.data.featured ?? false,
              products: 0,
            }],
          }));
        }
      },
      updateCategory: async (id, input) => {
        const response = await updateCategoryAPI(id, { name: input.name, featured: input.featured });
        if (response.success) {
          setState((current) => withDerivedCounts({
            ...current,
            categories: current.categories.map((c) =>
              c._id === id
                ? { ...c, name: response.data.name, slug: response.data.slug, featured: response.data.featured ?? false }
                : c
            ),
          }));
        }
      },
      deleteCategory: async (id) => {
        await deleteCategoryAPI(id);
        setState((current) => withDerivedCounts({
          ...current,
          categories: current.categories.filter((c) => c._id !== id),
        }));
      },
      addCollection: async (input) => {
        const response = await createCollectionAPI({ name: input.name, curator: input.curator });
        if (response.success) {
          setState((current) => withDerivedCounts({
            ...current,
            collections: [...current.collections, {
              _id: response.data._id,
              name: response.data.name,
              curator: response.data.curator ?? "",
              products: 0,
            }],
          }));
        }
      },
      updateCollection: async (id, input) => {
        const response = await updateCollectionAPI(id, { name: input.name, curator: input.curator });
        if (response.success) {
          setState((current) => withDerivedCounts({
            ...current,
            collections: current.collections.map((c) =>
              c._id === id ? { ...c, name: response.data.name, curator: response.data.curator ?? "" } : c
            ),
          }));
        }
      },
      deleteCollection: async (id) => {
        await deleteCollectionAPI(id);
        setState((current) => withDerivedCounts({
          ...current,
          collections: current.collections.filter((c) => c._id !== id),
        }));
      },
      updateSettings: (input) => {
        setState((current) => ({
          ...current,
          settings: input,
        }));
      },
      loading,
    };
  }, [state, loading]);


  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
}
