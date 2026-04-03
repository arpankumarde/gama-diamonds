const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface LoginResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function adminLogin(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed");
  return data;
}

export async function adminLogout(): Promise<void> {
  await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST", credentials: "include" });
}

export async function getAdminMe(): Promise<{ success: boolean; data: any }> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, { credentials: "include" });
  return response.json();
}

// ==================== PRODUCTS ====================

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  images: string[];
  carat?: number;
  color?: string;
  shape?: string;
  metal?: string;
  stock: number;
  tags: string[];
  video?: string;
  diamondType?: "Lab Diamond" | "Natural Diamond";
  collectionRef?: string;
  subCollection?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ProductResponse {
  success: boolean;
  data: Product;
}

export async function getAllProducts(
  page: number = 1,
  limit: number = 12,
  filters: Record<string, any> = {},
  sort: string = "-createdAt",
  signal?: AbortSignal
): Promise<ProductsResponse> {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());
    params.append("sort", sort);

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
    if (filters.collection) params.append("collection", filters.collection);
    if (filters.subCollection) params.append("subCollection", filters.subCollection);

    const response = await fetch(`${API_BASE_URL}/products?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    // Don't log AbortErrors as they're expected behavior when cleaning up requests
    if (error.name !== 'AbortError') {
      console.error("Error fetching products:", error);
    }
    throw error;
  }
}

export async function getProductBySlug(slug: string): Promise<ProductResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/slug/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Product not found: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export async function getRelatedProducts(productId: string, limit: number = 4): Promise<ProductsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/related?limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch related products: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching related products:", error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<ProductResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Product not found: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export interface FilterOptionsResponse {
  success: boolean;
  data: {
    colors: string[];
    shapes: string[];
    metals: string[];
    categories: any[];
    priceRange: { min: number; max: number };
  };
}

export async function getFilterOptions(): Promise<FilterOptionsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/filters`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch filter options: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching filter options:", error);
    throw error;
  }
}

export async function getFeaturedProducts(): Promise<ProductsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/featured`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch featured products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
}

// ==================== FILE UPLOAD ====================

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Upload failed");
  return data.url as string;
}

// ==================== CATEGORIES ====================

export interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  data: CategoryData[];
}

export interface CategoryResponse {
  success: boolean;
  data: CategoryData;
}

export async function getAllCategories(): Promise<CategoriesResponse> {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error(`Failed to fetch categories: ${response.statusText}`);
  return response.json();
}

export async function createCategory(payload: { name: string; featured: boolean }): Promise<CategoryResponse> {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create category");
  return data;
}

export async function updateCategoryAPI(id: string, payload: { name: string; featured: boolean }): Promise<CategoryResponse> {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update category");
  return data;
}

export async function deleteCategoryAPI(id: string): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete category");
  return data;
}

// ==================== ADMIN PRODUCT CREATION ====================

export interface CreateProductPayload {
  name: string;
  description: string;
  price: number;
  sku: string;
  category?: string;
  collectionRef?: string;
  subCollection?: string;
  images: string[];
  stock: number;
  carat?: number;
  color?: string;
  shape?: string;
  metal?: string;
  salePrice?: number;
  tags?: string[];
  video?: string;
  diamondType?: "Lab Diamond" | "Natural Diamond";
  isActive?: boolean;
}

export async function deleteProductAPI(id: string): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete product");
  return data;
}

export async function updateProductAPI(id: string, payload: Partial<CreateProductPayload>): Promise<ProductResponse> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to update product: ${response.statusText}`);
  }
  return response.json();
}

export async function createProduct(payload: CreateProductPayload): Promise<ProductResponse> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to create product: ${response.statusText}`);
  }
  return response.json();
}

export async function getAdminUsers(): Promise<{ success: boolean; data: any[] }> {
  const response = await fetch(`${API_BASE_URL}/auth/users`, { credentials: "include" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch users");
  return data;
}

// ==================== COLLECTIONS ====================

export async function getAllCollections(): Promise<{ success: boolean; data: any[] }> {
  const response = await fetch(`${API_BASE_URL}/collections`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch collections");
  return data;
}

export async function createCollectionAPI(payload: { name: string; curator?: string }): Promise<{ success: boolean; data: any }> {
  const response = await fetch(`${API_BASE_URL}/collections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create collection");
  return data;
}

export async function updateCollectionAPI(id: string, payload: { name?: string; curator?: string }): Promise<{ success: boolean; data: any }> {
  const response = await fetch(`${API_BASE_URL}/collections/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update collection");
  return data;
}

export async function deleteCollectionAPI(id: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE_URL}/collections/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete collection");
  return data;
}

export async function addSubCollectionAPI(collectionId: string, name: string): Promise<{ success: boolean; data: any }> {
  const response = await fetch(`${API_BASE_URL}/collections/${collectionId}/subcollections`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to add sub-collection");
  return data;
}

export async function deleteSubCollectionAPI(collectionId: string, subId: string): Promise<{ success: boolean; data: any }> {
  const response = await fetch(`${API_BASE_URL}/collections/${collectionId}/subcollections/${subId}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete sub-collection");
  return data;
}

// ==================== CART ====================

export interface CartItem {
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
  id?: string;
}

export interface CartResponse {
  success: boolean;
  data: CartItem[];
}

export async function getCartFromDB(): Promise<CartResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error(`Failed to fetch cart: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching cart from database:", error);
    throw error;
  }
}

export async function saveCartToDB(items: CartItem[]): Promise<CartResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ items }),
    });
    if (!response.ok) throw new Error(`Failed to save cart: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error saving cart to database:", error);
    throw error;
  }
}

export async function addItemToCartDB(item: CartItem): Promise<CartResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error(`Failed to add item to cart: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
}

export async function removeFromCartDB(productId: string): Promise<CartResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/item`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId }),
    });
    if (!response.ok) throw new Error(`Failed to remove item from cart: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
}

export async function updateCartItemDB(productId: string, quantity: number): Promise<CartResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/item`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId, quantity }),
    });
    if (!response.ok) throw new Error(`Failed to update cart item: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
}

export async function clearCartDB(): Promise<CartResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) throw new Error(`Failed to clear cart: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
}

