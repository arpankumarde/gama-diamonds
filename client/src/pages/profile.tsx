import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@/contexts/user-context";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <section className="bg-[#f8f8f8] min-h-screen border-t border-[#dddddd] flex items-center justify-center px-4 py-16">
        <div className="text-center">
          <p className="text-[#666]">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f8f8f8] min-h-screen border-t border-[#dddddd] px-4 py-12 md:py-16">
      <div className="max-w-[800px] mx-auto">
        {/* Profile Header */}
        <div className="bg-white p-8 mb-8 border border-[#dddddd]">
          <h1 className="text-[20px] tracking-[6px] uppercase font-light text-[#333] mb-8">
            My Profile
          </h1>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-[13px] tracking-[2px] uppercase text-[#666] mb-2">
                Full Name
              </label>
              <p className="text-[15px] text-[#333]">{user?.name || "N/A"}</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[13px] tracking-[2px] uppercase text-[#666] mb-2">
                Email Address
              </label>
              <p className="text-[15px] text-[#333]">{user?.email || "N/A"}</p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[13px] tracking-[2px] uppercase text-[#666] mb-2">
                Phone Number
              </label>
              <p className="text-[15px] text-[#333]">{user?.phone || "Not provided"}</p>
            </div>

            {/* Role */}
            <div>
              <label className="block text-[13px] tracking-[2px] uppercase text-[#666] mb-2">
                Account Type
              </label>
              <p className="text-[15px] text-[#333] capitalize">
                {user?.role === "customer" ? "Customer" : user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Saved Addresses Section */}
        <div className="bg-white p-8 mb-8 border border-[#dddddd]">
          <h2 className="text-[18px] tracking-[4px] uppercase font-light text-[#333] mb-6">
            Saved Addresses
          </h2>
          <p className="text-[15px] text-[#666] mb-6">
            No saved addresses yet. Add one for faster checkout.
          </p>
          <button className="h-[48px] px-6 bg-black text-white tracking-[3px] uppercase text-[12px] hover:opacity-90 transition">
            Add New Address
          </button>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="h-[48px] px-8 bg-red-600 text-white tracking-[3px] uppercase text-[12px] hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
