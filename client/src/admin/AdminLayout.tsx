import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import AdminSidebar from "./components/AdminSidebar";
import { AdminDataProvider } from "./AdminDataContext";
import { useAdminAuth } from "@/hooks/use-admin-auth";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, loading, logout } = useAdminAuth();

  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    requestAnimationFrame(() => { window.scrollTo(0, 0); });
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => { window.scrollTo(0, 0); });
  }, [location.pathname]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin/login", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) return null;

  return (
    <AdminDataProvider>
      <div className="admin-shell min-h-screen bg-white text-black">
        <div className="mx-auto flex min-h-screen max-w-[1800px]">
          <div className="hidden w-[280px] shrink-0 border-r border-gray-200 lg:block">
            <div className="sticky top-0 h-screen w-[280px]">
              <AdminSidebar onLogout={logout} />
            </div>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent
              side="left"
              showCloseButton={false}
              className="w-[280px] border-r-0 bg-white p-0 shadow-none"
            >
              <AdminSidebar onNavigate={() => setMobileOpen(false)} onLogout={logout} />
            </SheetContent>
          </Sheet>

          <div className="flex min-h-screen min-w-0 flex-1 flex-col">
            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
              <div className="mb-4 lg:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-gray-300 bg-white text-black hover:bg-gray-50 hover:text-black"
                  onClick={() => setMobileOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </AdminDataProvider>
  );
}
