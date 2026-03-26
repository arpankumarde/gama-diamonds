import { Link } from "react-router";

export default function ProductNotFound() {
  return (
    <section className="bg-[#f8f8f8] min-h-screen px-10 py-8 border-t border-[#dddddd] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-[24px] mb-4 text-black">Product Not Found</h2>
        <Link to="/products" className="underline text-[#666]">
          Back to Products
        </Link>
      </div>
    </section>
  );
}
