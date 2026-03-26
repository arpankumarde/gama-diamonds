import type {
  AdminNavItem,
  ThemeMode,
} from "./types";

export const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", path: "/admin", icon: "LayoutDashboard" },
  { label: "Products", path: "/admin/products", icon: "Gem" },
  { label: "Category", path: "/admin/category", icon: "Shapes" },
  { label: "Collections", path: "/admin/collections", icon: "Layers3" },
  { label: "Orders", path: "/admin/orders", icon: "ShoppingBag" },
  { label: "Users", path: "/admin/users", icon: "Users" },
  { label: "Settings", path: "/admin/settings", icon: "Settings2" },
];

export const themeModes: ThemeMode[] = [
  "Ivory Gold",
  "Midnight Noir",
  "Champagne",
];
