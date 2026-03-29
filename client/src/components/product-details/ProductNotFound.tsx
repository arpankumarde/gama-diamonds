import { Link } from "react-router";

export default function ProductNotFound() {
  return (
    <section className="bg-white min-h-screen px-10 py-8 border-t border-brand-gold/10 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
          <p className="text-[11px] tracking-[4px] uppercase text-brand-gold/70">404</p>
          <span className="block w-10 h-[1px] bg-brand-gold/50"></span>
        </div>
        <h2 className="text-[22px] md:text-[28px] tracking-[3px] uppercase font-light text-[#111] mb-6">
          Product <span className="text-brand-gold">Not Found</span>
        </h2>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-brand-gold text-brand-green px-8 py-3 text-[12px] tracking-[3px] uppercase font-semibold rounded-lg hover:bg-brand-gold-soft transition duration-300"
        >
          Back to Products
        </Link>
      </div>
    </section>
  );
}
