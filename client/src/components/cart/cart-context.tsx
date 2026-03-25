import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useUser } from "@/contexts/user-context";
import {
  getCartFromDB,
  saveCartToDB,
  addItemToCartDB,
  removeFromCartDB,
  updateCartItemDB,
  clearCartDB,
} from "@/lib/api";

export interface CartItem {
  id?: string;
  productId: string;
  productSlug: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  diamondType: string;
  metal: string;
  size?: string;
  carat?: string | number;
}

interface AddToCartInput {
  productId: string;
  productSlug: string;
  title: string;
  image: string;
  price: number;
  diamondType: string;
  metal: string;
  size?: string;
}

interface CartContextValue {
  items: CartItem[];
  isCartOpen: boolean;
  cartCount: number;
  subtotal: number;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: AddToCartInput) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  syncCartWithDB: () => void;
}

const STORAGE_KEY = "heera-cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useUser();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dbSynced, setDbSynced] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = window.localStorage.getItem(STORAGE_KEY);
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart) as CartItem[];
        setItems(parsed);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // When user logs in, load cart from database
  useEffect(() => {
    if (isAuthenticated && user && !dbSynced) {
      const loadUserCart = async () => {
        try {
          setIsLoading(true);
          const response = await getCartFromDB();
          if (response.success && response.data) {
            // Convert DB cart items to include id field
            const dbCart = response.data.map((item: any) => ({
              ...item,
              id: item.id || `${item.productId}-${item.diamondType}-${item.size || "default"}`,
            }));
            setItems(dbCart);
            // Also update localStorage to keep them in sync
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dbCart));
          }
          setDbSynced(true);
        } catch (error) {
          console.error("Failed to load cart from database:", error);
          // Keep existing localStorage cart if DB load fails
          setDbSynced(true);
        } finally {
          setIsLoading(false);
        }
      };

      loadUserCart();
    } else if (!isAuthenticated) {
      setDbSynced(false);
    }
  }, [isAuthenticated, user, dbSynced]);

  // Save cart to localStorage on every change
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Sync cart to database whenever items change (if user is authenticated)
  useEffect(() => {
    if (isAuthenticated && dbSynced && items.length >= 0) {
      const syncCart = async () => {
        try {
          await saveCartToDB(items);
        } catch (error) {
          console.error("Failed to sync cart to database:", error);
        }
      };

      // Debounce the sync to avoid too many API calls
      const timer = setTimeout(syncCart, 500);
      return () => clearTimeout(timer);
    }
  }, [items, isAuthenticated, dbSynced]);

  const value = useMemo<CartContextValue>(() => {
    const addToCart = (item: AddToCartInput) => {
      setItems((currentItems) => {
        const sizeKey = item.size?.trim() || "default";
        const existingItem = currentItems.find(
          (currentItem) =>
            currentItem.productId === item.productId &&
            currentItem.diamondType === item.diamondType &&
            (currentItem.size?.trim() || "default") === sizeKey
        );

        if (existingItem) {
          return currentItems.map((currentItem) =>
            currentItem.id === existingItem.id
              ? { ...currentItem, quantity: currentItem.quantity + 1 }
              : currentItem
          );
        }

        const newItem: CartItem = {
          id: `${item.productId}-${item.diamondType}-${sizeKey}`,
          quantity: 1,
          ...item,
        };

        return [...currentItems, newItem];
      });

      setIsCartOpen(true);
    };

    const updateQuantity = (id: string, quantity: number) => {
      if (quantity < 1) {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    };

    const removeItem = (id: string) => {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    const syncCartWithDB = async () => {
      if (isAuthenticated) {
        try {
          const response = await getCartFromDB();
          if (response.success && response.data) {
            const dbCart = response.data.map((item: any) => ({
              ...item,
              id: item.id || `${item.productId}-${item.diamondType}-${item.size || "default"}`,
            }));
            setItems(dbCart);
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dbCart));
          }
        } catch (error) {
          console.error("Failed to sync cart with database:", error);
        }
      }
    };

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
      items,
      isCartOpen,
      cartCount,
      subtotal,
      isLoading,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      addToCart,
      updateQuantity,
      removeItem,
      syncCartWithDB,
    };
  }, [isCartOpen, items, isLoading, isAuthenticated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
