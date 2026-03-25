export type AdminNavItem = {
  label: string;
  path: string;
  icon: string;
};

export type StatMetric = {
  label: string;
  value: string;
};

export type RecentOrder = {
  id: string;
  customer: string;
  date: string;
  amount: string;
  payment: "Paid" | "Pending" | "Refunded";
  status: "Pending" | "Processing" | "Delivered";
};

export type ProductItem = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  sku: string;
  category: {
    _id: string;
    name: string;
  };
  images: string[];
  carat?: number;
  color?: string;
  shape?: string;
  metal?: string;
  stock: number;
  tags?: string[];
  video?: string;
  diamondType?: "Lab Diamond" | "Natural Diamond";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};


export type CategoryItem = {
  _id: string;
  name: string;
  slug: string;
  products: number;
  featured: boolean;
};

export type CollectionItem = {
  _id: string;
  name: string;
  products: number;
  curator?: string;
};

export type UserItem = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin" | "superadmin";
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
};

export type ThemeMode = "Ivory Gold" | "Midnight Noir" | "Champagne";
