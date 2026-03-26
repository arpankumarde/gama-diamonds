import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useUser } from "@/contexts/user-context";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.password) {
        throw new Error("All fields are required");
      }

      await signup(formData.name, formData.email, formData.password, formData.phone);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f8f8f8] min-h-screen border-t border-[#dddddd] flex items-start justify-center px-4 pt-12 pb-16 md:pt-16">
      <div className="w-full max-w-[460px] text-center">
        <h2 className="text-[20px] tracking-[6px] uppercase font-light text-[#333] mb-2 ">
          Register
        </h2>

        <p className="text-[15px] text-[#555] mb-1">
          Please fill in the information below:
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-[56px] px-5 border border-[#d9d9d9] bg-white outline-none text-[15px] text-black"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-[56px] px-5 border border-[#d9d9d9] bg-white outline-none text-[15px] text-black"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full h-[56px] px-5 border border-[#d9d9d9] bg-white outline-none text-[15px] text-black"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-[56px] px-5 border border-[#d9d9d9] bg-white outline-none text-[15px] text-black"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-[56px] bg-black text-white tracking-[4px] uppercase text-[13px] mt-7 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create My Account"}
          </button>
        </form>

        <p className="mt-5 text-[15px] text-[#666]">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
