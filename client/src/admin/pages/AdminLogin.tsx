import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { adminLogin } from "../../lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await adminLogin({ email, password });
      if (response.success) {
        navigate("/admin", { replace: true });
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f8f8f8] min-h-screen border-t border-[#dddddd] flex items-start justify-center px-4 pt-12 pb-16 md:pt-16">
      <div className="w-full max-w-[460px] text-center">
        <h2 className="text-[20px] tracking-[6px] uppercase font-light text-[#333] mb-2">
          Admin Login
        </h2>

        <p className="text-[15px] text-[#555] mb-10">
          Please enter your admin credentials:
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[56px] px-5 border border-[#d9d9d9] bg-white outline-none text-[15px] text-black"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[56px] px-5 border border-[#d9d9d9] bg-white outline-none text-[15px] text-black"
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-left">{error}</p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-[56px] bg-black text-white tracking-[4px] uppercase text-[13px] hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-xs text-[#888] italic">
          Enter your admin credentials
        </p>

        <p className="mt-10 text-[15px] text-[#666]">
          Back to{" "}
          <Link to="/" className="underline">
            Homepage
          </Link>
        </p>
      </div>
    </section>
  );
}

