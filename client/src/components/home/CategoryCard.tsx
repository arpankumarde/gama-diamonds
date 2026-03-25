import { Link } from "react-router";

type CategoryCardProps = {
  slug: string;
  image: string;
  title: string;
};

export default function CategoryCard({
  slug,
  image,
  title,
}: CategoryCardProps) {
  return (
    <Link to={`/category/${slug}`} className="group text-center block">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[150px] md:h-[180px] lg:h-[200px] object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
        />
      </div>

      <p className="mt-4 md:mt-6 text-[11px] md:text-[12px] lg:text-[13px] tracking-[3px] md:tracking-[4px] uppercase font-light text-[#333]">
        {title}
      </p>
    </Link>
  );
}
