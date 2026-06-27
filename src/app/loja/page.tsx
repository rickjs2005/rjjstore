import type { Metadata } from "next";
import { Shop } from "@/components/Shop";

export const metadata: Metadata = {
  title: "Loja — Coleção completa",
  description:
    "Explore a coleção completa da RJjstore: camisetas, moletons, jaquetas, tênis, bonés, calças e acessórios das maiores marcas.",
  alternates: { canonical: "/loja" },
};

export default function LojaPage({
  searchParams,
}: {
  searchParams: { cat?: string; sort?: string };
}) {
  return (
    <Shop initialCategory={searchParams.cat} initialSort={searchParams.sort} />
  );
}
