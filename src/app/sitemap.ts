import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const SITE_URL = "https://rjjstore.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/loja`, changeFrequency: "daily", priority: 0.9 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/produtos/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...routes, ...productRoutes];
}
