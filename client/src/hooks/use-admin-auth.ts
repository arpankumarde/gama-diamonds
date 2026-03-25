import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { adminLogout, getAdminMe } from "../lib/api";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAdminMe()
      .then((data) => {
        if (data?.success && (data.data.role === "admin" || data.data.role === "superadmin")) {
          setIsAuthenticated(true);
          setUser(data.data);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await adminLogout();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/admin/login", { replace: true });
  };

  return { isAuthenticated, user, loading, logout };
}
