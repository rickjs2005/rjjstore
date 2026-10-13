[English](README.md) | **Português**

# RJjstore — Luxury Streetwear

Vitrine de e-commerce de **moda premium multimarcas** com estética de estúdio de luxo (editorial + lookbook + experiência cinematográfica). Front-end apenas — o pedido é finalizado pelo **WhatsApp**, sem backend nem pagamento online.

> **Tipo:** demo comercial (marca fictícia — RJjstore não é uma loja real) · **Demo:** https://rjjstore.vercel.app

Demonstração construída em parceria com Claude Code.

![Página inicial da RJjstore](docs/screenshots/home.webp)

![Página de produto](docs/screenshots/product.webp)

## Destaques

- **Hero cinematográfico** com parallax + câmera lenta e iluminação dinâmica que segue o cursor.
- **Lookbook com scroll horizontal fixado** e profundidade multicamada.
- **Loja** (`/loja`) com 21 produtos de demonstração, filtros por categoria/marca e ordenação por preço.
- **Vista rápida** (quick-view) do produto em modal, com seleção de cor/tamanho.
- **Carrinho persistente** (`localStorage`) por produto **+ tamanho**, com checkout que gera a mensagem pronta e abre o `wa.me`.
- **Tema alternável** Areia & Espresso ⇄ Branco puro (variáveis CSS, sem flash, persistido).
- **Newsletter** apenas visual (sem envio — não há backend).
- Preloader, transições de página com máscara, cursor personalizado, grão cinematográfico, marquees reativos ao scroll.
- **SEO**: metadata + OpenGraph + Twitter + JSON-LD (Store + Product), `sitemap`, `robots`, `opengraph-image`.
- **Acessibilidade**: foco gerenciado nos modais, `aria-pressed`, `prefers-reduced-motion`, navegação por teclado.

## Stack

Next.js 14.2 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · Framer Motion · Lenis (smooth scroll) · `next/font` (Cormorant Garamond + Inter) · `next/image`.

## Como rodar

Pré-requisitos: Node.js 18.17+ (CI usa Node 20) e npm.

```bash
npm ci
npm run dev      # http://localhost:3000
```

Não há variáveis de ambiente.

## Scripts

| Script | Descrição |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run start` | serve o build |
| `npm run lint` | ESLint (`next lint`) |

Checagem de tipos: `npx tsc --noEmit`. Não há testes automatizados. O workflow `.github/workflows/ci.yml` roda lint, checagem de tipos e build.

## Estrutura

```
src/
  app/                 # rotas (home, /loja, /produtos/[slug]), sitemap, robots, og-image
  components/          # seções e comércio (Hero, ProductCard, CartDrawer, QuickView, ...)
    providers/         # CartProvider, QuickViewProvider, SmoothScroll
    ui/                # Reveal, Magnetic, CustomCursor, Spotlight, ThemeToggle, ...
  lib/                 # products (catálogo), format, whatsapp, theme, ui
docs/screenshots/      # capturas usadas neste README
```

## Configuração

- **WhatsApp**: edite as constantes em `src/lib/whatsapp.ts` (`WHATSAPP_NUMBER` / `WHATSAPP_DISPLAY`). O número configurado é o contato comercial da MilWeb, responsável pela demonstração.
- **URL do site** (canonical, sitemap, robots): constante `SITE_URL` em `src/app/layout.tsx`, `src/app/sitemap.ts` e `src/app/robots.ts` (hoje `https://rjjstore.vercel.app`).
- **Tema padrão**: Areia & Espresso. Alternar via toggle na navbar (persiste em `localStorage`).

## Imagens e marcas

- As fotos são de **demonstração**, carregadas do Unsplash (`images.unsplash.com`, liberado em `next.config.mjs`); não são fotos oficiais de produtos. Substitua pelas fotos do seu estoque em `src/lib/products.ts`.
- Nomes de marcas (Nike, Adidas, Lacoste etc.) aparecem só como texto ilustrativo do catálogo; pertencem aos respectivos donos e não há vínculo com eles. Nenhum logo oficial é usado.

## Limitações

Vitrine de demonstração: produtos, preços, descrições, depoimentos e números são ilustrativos. Não há estoque, pagamento online, contas de usuário nem backend — a venda é fechada pelo WhatsApp.

## Segurança

Veja [SECURITY.md](SECURITY.md). Contribuições: [CONTRIBUTING.md](CONTRIBUTING.md).

## Licença

Ainda não há licença definida; todos os direitos reservados ao autor.
