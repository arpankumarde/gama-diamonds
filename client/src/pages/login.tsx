import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useUser } from "@/contexts/user-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useUser();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f8f8f8] min-h-screen border-t border-[#dddddd] flex items-start justify-center px-4 pt-12 pb-16 md:pt-16">
      <div className="w-full max-w-[460px] text-center">
        <h2 className="text-[20px] tracking-[6px] uppercase font-light text-[#333] mb-2">
          Login
        </h2>

        <p className="text-[15px] text-[#555] mb-10">
          Please enter your e-mail and password:
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-[56px] bg-black text-white tracking-[4px] uppercase text-[13px] mt-7 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-10 text-[15px] text-[#666]">
          Don't have an account?{" "}
          <Link to="/signup" className="underline">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
