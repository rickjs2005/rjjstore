import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80svh] flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow text-stone">Erro 404</p>
      <h1 className="h-display mt-4 text-[clamp(3rem,12vw,8rem)] leading-none">
        Fora de estação
      </h1>
      <p className="mt-5 max-w-sm text-sm text-stone">
        A página que você procura não está mais na vitrine. Mas a coleção continua.
      </p>
      <Link
        href="/loja"
        className="mt-9 bg-ink px-8 py-4 text-[12px] uppercase tracking-[0.22em] text-paper"
      >
        Voltar à loja
      </Link>
    </main>
  );
}
