import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/providers/CartProvider";
import { QuickViewProvider } from "@/components/providers/QuickViewProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { QuickView } from "@/components/QuickView";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { FloatingBag } from "@/components/FloatingBag";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { STORE_NAME, WHATSAPP_NUMBER } from "@/lib/whatsapp";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL = "https://rjjstore.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${STORE_NAME} — Luxury Streetwear`,
    template: `%s · ${STORE_NAME}`,
  },
  description:
    "RJjstore — moda premium de marca. Camisetas, moletons, jaquetas, tênis e acessórios das maiores grifes, com curadoria editorial e atendimento exclusivo pelo WhatsApp.",
  keywords: [
    "roupas de marca",
    "streetwear premium",
    "moda de luxo",
    "Nike",
    "Adidas",
    "tênis",
    "RJjstore",
  ],
  authors: [{ name: STORE_NAME }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: STORE_NAME,
    title: `${STORE_NAME} — Luxury Streetwear`,
    description:
      "Moda premium de marca com curadoria editorial. Finalize seu pedido pelo WhatsApp.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORE_NAME} — Luxury Streetwear`,
    description: "Moda premium de marca com curadoria editorial.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Tema padrão agora é Areia; o tema "pure" (escuro) usa #050505.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E9E1D4" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: STORE_NAME,
    url: SITE_URL,
    description: "Moda premium de marca com curadoria editorial.",
    telephone: `+${WHATSAPP_NUMBER}`,
    sameAs: ["https://instagram.com"],
  };

  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('rjj-theme');if(t==='pure')document.documentElement.setAttribute('data-theme','pure');}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <CartProvider>
          <QuickViewProvider>
          <SmoothScroll>
            <Preloader />
            <GrainOverlay />
            <ScrollProgress />
            <CustomCursor />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
            <QuickView />
            <WhatsAppFloat />
            <FloatingBag />
          </SmoothScroll>
          </QuickViewProvider>
        </CartProvider>
      </body>
    </html>
  );
}
