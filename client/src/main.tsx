import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { CartProvider } from "./components/cart/cart-context.tsx";
import { UserProvider } from "./contexts/user-context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ThemeProvider defaultTheme="light">
            <TooltipProvider>
              <App />
              <Toaster position="top-center" richColors closeButton />
            </TooltipProvider>
          </ThemeProvider>
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
