import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useUser } from "@/contexts/user-context";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [showPassword, setShowPassword] = useState(false);
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
    <section className="bg-[linear-gradient(135deg,rgba(15,45,42,0.95)_0%,rgba(7,18,17,1)_100%)] min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkM2EwMmEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSI+PC9jaXJjbGU+PC9nPjwvZz48L3N2Zz4=')]" />
      </div>
      
      <div className="relative w-full max-w-[480px] bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-2xl shadow-[0_0_0_1px_rgba(211,160,42,0.08),0_32px_64px_rgba(0,0,0,0.35)] p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block w-8 h-[1px] bg-brand-gold/60"></span>
            <p className="text-[10px] tracking-[4px] uppercase text-brand-gold/70">Join Us</p>
            <span className="block w-8 h-[1px] bg-brand-gold/60"></span>
          </div>
          
          <h2 className="text-[22px] md:text-[26px] tracking-[4px] md:tracking-[6px] uppercase font-light text-white mb-3">
            Register
          </h2>
          
          <p className="text-[13px] md:text-[14px] text-white/70 leading-6">
            Create your account to access exclusive collections
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/60" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-[56px] pl-12 pr-5 border border-brand-gold/20 bg-white/10 backdrop-blur-sm rounded-lg outline-none text-[14px] text-white placeholder:text-white/50 focus:border-brand-gold/60 focus:bg-white/15 transition duration-300"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/60" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[56px] pl-12 pr-5 border border-brand-gold/20 bg-white/10 backdrop-blur-sm rounded-lg outline-none text-[14px] text-white placeholder:text-white/50 focus:border-brand-gold/60 focus:bg-white/15 transition duration-300"
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/60" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-[56px] pl-12 pr-5 border border-brand-gold/20 bg-white/10 backdrop-blur-sm rounded-lg outline-none text-[14px] text-white placeholder:text-white/50 focus:border-brand-gold/60 focus:bg-white/15 transition duration-300"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gold/60" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-[56px] pl-12 pr-12 border border-brand-gold/20 bg-white/10 backdrop-blur-sm rounded-lg outline-none text-[14px] text-white placeholder:text-white/50 focus:border-brand-gold/60 focus:bg-white/15 transition duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gold/60 hover:text-brand-gold transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-400 text-[13px] text-center">{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-[56px] bg-brand-gold text-brand-green tracking-[3px] uppercase text-[12px] md:text-[13px] font-semibold rounded-lg hover:bg-brand-gold-soft hover:shadow-[0_8px_24px_rgba(211,160,42,0.25)] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <div className="flex items-center gap-4 mb-6">
            <span className="flex-1 h-[1px] bg-brand-gold/20"></span>
            <span className="text-[11px] tracking-[2px] uppercase text-white/50">Or</span>
            <span className="flex-1 h-[1px] bg-brand-gold/20"></span>
          </div>
          
          <p className="text-[13px] md:text-[14px] text-white/70">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-brand-gold hover:text-white transition duration-300 underline underline-offset-4"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
