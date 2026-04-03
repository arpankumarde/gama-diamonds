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
  { slug: "lab-diamond-engagement-rings", title: "Lab Diamond Engagement Rings", image: "https://heeradiamonds.com/cdn/shop/files/ENGAGEMENT_RING_IMAGE_3_1296x.jpg?v=1741977826" },
  { slug: "emerald-cut", title: "Emerald Cut", image: "https://heeradiamonds.com/cdn/shop/files/emerald_cut_engagement_ring_1296x.jpg?v=1742085417" },
  { slug: "coloured-diamonds", title: "Coloured Diamonds", image: "https://heeradiamonds.com/cdn/shop/files/coloured_diamond_engagement_rings_1296x.jpg?v=1742085417" },
  { slug: "real-diamonds-engagement-rings", title: "Real Diamonds Engagement Rings", image: "https://heeradiamonds.com/cdn/shop/files/ENGAGEMENT_RING_IMAGE_1296x.jpg?v=1741977825" },
];



export function getCollectionBySlug(slug?: string) {
  return diamondCollections.find((c) => c.slug === slug);
}


