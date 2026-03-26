import { Link, useParams } from "react-router";
import Product from "./product";

export default function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();

  if (!categoryName) {
    return (
      <section className="min-h-screen bg-white border-t border-[#dddddd] px-4 py-16 text-center">
        <h1 className="text-[24px] text-black mb-4">Category Not Found</h1>
        <Link to="/" className="text-[14px] text-[#666] underline">
          Back to Home
        </Link>
      </section>
    );
  }

  return <Product category={categoryName} />;
}
