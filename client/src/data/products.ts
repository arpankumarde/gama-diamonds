export interface CollectionItem {
  slug: string;
  title: string;
  image: string;
}

export interface CategoryItem {
  slug: string;
  title: string;
  image: string;
}

export const diamondCollections: CollectionItem[] = [
  { slug: "lab-diamond-engagement-rings", title: "Lab Diamond Engagement Rings", image: "/images/labdiamond.webp" },
  { slug: "emerald-cut", title: "Emerald Cut", image: "/images/emrald.webp" },
  { slug: "coloured-diamonds", title: "Coloured Diamonds", image: "/images/coloreddiamond.webp" },
  { slug: "real-diamonds-engagement-rings", title: "Real Diamonds Engagement Rings", image: "/images/realdiamond.webp" },
];

export const productCategories: CategoryItem[] = [
  { slug: "new-arrival", title: "New Arrivals", image: "/images/newarrival.webp" },
  { slug: "engagement-rings", title: "Engagement Rings", image: "/images/engagemnetring.webp" },
  { slug: "eternity-rings", title: "Eternity Rings", image: "/images/eternityring.webp" },
  { slug: "bespoke", title: "Bespoke Design", image: "/images/bespoke.webp" },
  { slug: "jewellery", title: "Jewellery", image: "/images/jwelery.webp" },
  { slug: "oval-shape", title: "Oval Shape", image: "/images/ovalshape.webp" },
  { slug: "round-brilliant", title: "Round Brilliant Cut", image: "/images/round.webp" },
  { slug: "elongated-cushion", title: "Elongated Cushion", image: "/images/elongated.webp" },
];

export function getCollectionBySlug(slug?: string) {
  return diamondCollections.find((c) => c.slug === slug);
}

export function getCategoryBySlug(slug?: string) {
  return productCategories.find((c) => c.slug === slug);
}
