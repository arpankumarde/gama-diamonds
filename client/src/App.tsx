import { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router";
import Footer from "./components/layout/footer";
import Navbar from "./components/layout/navbar";
import Home from "./pages/Home";
import LogIn from "./pages/login";
import Signup from "./pages/signup";
import ProfilePage from "./pages/profile";
import Products from "./pages/product";
import ProductDetails from "./pages/ProductDetails";
import CollectionPage from "./pages/CollectionPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import CartDrawer from "./components/cart/cart-drawer";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import DashboardPage from "./admin/pages/DashboardPage";
import ProductsPage from "./admin/pages/ProductsPage";
import CategoriesPage from "./admin/pages/CategoriesPage";
import CollectionsPage from "./admin/pages/CollectionsPage";
import AddProductPage from "./admin/pages/AddProductPage";
import AddCategoryPage from "./admin/pages/AddCategoryPage";
import AddCollectionPage from "./admin/pages/AddCollectionPage";
import EditProductPage from "./admin/pages/EditProductPage";
import EditCategoryPage from "./admin/pages/EditCategoryPage";
import EditCollectionPage from "./admin/pages/EditCollectionPage";
import OrdersPage from "./admin/pages/OrdersPage";
import UsersPage from "./admin/pages/UsersPage";
import SettingsPage from "./admin/pages/SettingsPage";
import { CurrencyProvider } from "@/contexts/storefront/CurrencyContext";
import NotFound from "./pages/NotFound";

function StorefrontLayout() {
  return (
    <>
      <CurrencyProvider>
        <Navbar />
        <Outlet />
        <CartDrawer />
        <Footer />
      </CurrencyProvider>
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route element={<StorefrontLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route
          path="/collections/:collectionName"
          element={<CollectionPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<AddProductPage />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
          <Route path="category" element={<CategoriesPage />} />
          <Route path="category/new" element={<AddCategoryPage />} />
          <Route path="category/:id/edit" element={<EditCategoryPage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="collections/new" element={<AddCollectionPage />} />
          <Route path="collections/:id/edit" element={<EditCollectionPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
