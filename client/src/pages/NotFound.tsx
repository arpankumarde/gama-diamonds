import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-white border-t border-brand-gold/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
      </div>

      <div className="relative px-4 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1100px] text-center">
          <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-brand-gold/25 bg-white px-5 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <span className="block h-[1px] w-6 bg-brand-gold/60" />
            <p className="text-[11px] tracking-[4px] uppercase text-brand-green/70">
              Page Not Found
            </p>
            <span className="block h-[1px] w-6 bg-brand-gold/60" />
          </div>

          <div className="mt-10">
            <p className="text-[72px] md:text-[110px] leading-none font-light tracking-[10px] text-brand-gold/90 drop-shadow-[0_8px_28px_rgba(211,160,42,0.25)]">
              404
            </p>

            <h1 className="mt-6 text-[24px] md:text-[36px] tracking-[6px] md:tracking-[8px] uppercase font-light">
              <span className="text-[#111]">This page </span>
              <span className="text-brand-gold">doesn&apos;t exist</span>
            </h1>

            <p className="mt-5 text-[13px] md:text-[15px] text-black/60 tracking-[1px] max-w-[720px] mx-auto leading-6 md:leading-7">
              The link may be broken, or the page may have been moved. Try going
              back home or browse our latest collection.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex h-[52px] items-center justify-center bg-brand-gold text-brand-green px-8 text-[12px] tracking-[3px] uppercase font-semibold rounded-xl hover:bg-brand-gold-soft hover:shadow-[0_8px_24px_rgba(211,160,42,0.25)] transition duration-300 w-full sm:w-auto"
            >
              Back to Home
            </Link>
            <Link
              to="/products"
              className="inline-flex h-[52px] items-center justify-center border border-brand-gold/40 bg-white/60 backdrop-blur-sm text-brand-green px-8 text-[12px] tracking-[3px] uppercase font-semibold rounded-xl hover:border-brand-gold/80 hover:bg-brand-green/5 transition duration-300 w-full sm:w-auto"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
