# RJjstore — Luxury Streetwear

E-commerce de **moda premium de marca** com estética de estúdio de luxo (editorial + lookbook + experiência cinematográfica). Front-end apenas — o pedido é finalizado pelo **WhatsApp**, sem backend.

Demonstração construída em parceria com Claude Code.

---

## ✨ Destaques

- **Hero cinematográfico** com parallax + câmera lenta (24s) e iluminação dinâmica que segue o cursor.
- **Lookbook com scroll horizontal fixado** e profundidade multicamada.
- **Vista rápida** (quick-view) do produto em modal, com seleção de cor/tamanho.
- **Carrinho persistente** (localStorage) por produto **+ tamanho**, com checkout que gera a mensagem pronta e abre o `wa.me`.
- **Tema alternável** Areia & Espresso ⇄ Branco puro (variáveis CSS, sem flash, persistido).
- **Neo-skeuomorfismo discreto** em detalhes-chave (swatches, botões, etiquetas, barra de progresso).
- Preloader, transições de página com máscara, cursor personalizado, grão cinematográfico, marquees reativos ao scroll.
- **SEO**: metadata + OpenGraph + Twitter + JSON-LD (Store + Product), `sitemap`, `robots`, `opengraph-image`.
- **Acessibilidade**: foco gerenciado nos modais, `aria-pressed`, `prefers-reduced-motion`, navegação por teclado.

## 🧱 Stack

Next.js 14 (App Router) · TypeScript · TailwindCSS 3 · Framer Motion · Lenis (smooth scroll) · `next/font` (Cormorant Garamond + Inter) · `next/image`.

Sem dependências pesadas — todas as animações são CSS/Framer Motion. First Load JS ≈ 156 kB na home.

## 🚀 Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm run start    # serve o build
npm run lint
```

## 📁 Estrutura

```
src/
  app/                 # rotas (home, /loja, /produtos/[slug]), sitemap, robots, og-image
  components/          # seções e comércio (Hero, ProductCard, CartDrawer, QuickView, ...)
    providers/         # CartProvider, QuickViewProvider, SmoothScroll
    ui/                # Reveal, Magnetic, CustomCursor, Spotlight, ThemeToggle, ...
  lib/                 # products (catálogo), format, whatsapp, theme, ui
```

## ⚙️ Configuração

- **WhatsApp**: edite as duas constantes em `src/lib/whatsapp.ts` (`WHATSAPP_NUMBER` / `WHATSAPP_DISPLAY`).
- **Tema padrão**: Areia & Espresso. Alternar via toggle na navbar (persiste em `localStorage`).

## 🖼️ Imagens

As fotos são de **demonstração** (Unsplash, via `images.unsplash.com` em `next.config.mjs`) — não são produtos reais das grifes nem logos oficiais (evita violação de direitos autorais). Substitua pelas fotos do seu estoque em `src/lib/products.ts`.

## ⚠️ Escopo

Vitrine de demonstração: preços, descrições, depoimentos e números são ilustrativos. Não há processamento de pagamento online — a venda é fechada pelo WhatsApp.
