// RJjstore — catálogo (front-end only, imagens de demonstração via Unsplash)

export type Category =
  | "Camisetas"
  | "Moletom"
  | "Jaquetas"
  | "Tênis"
  | "Bonés"
  | "Calças"
  | "Acessórios";

export const CATEGORIES: Category[] = [
  "Camisetas",
  "Moletom",
  "Jaquetas",
  "Tênis",
  "Bonés",
  "Calças",
  "Acessórios",
];

export const BRANDS = [
  "Nike",
  "Adidas",
  "Lacoste",
  "Tommy Hilfiger",
  "Calvin Klein",
  "Puma",
  "New Balance",
  "Vans",
] as const;

export type Brand = (typeof BRANDS)[number];

export type Color = { name: string; hex: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: Brand;
  category: Category;
  price: string;
  oldPrice?: string;
  badge?: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: Color[];
  image: string; // capa
  hover: string; // troca no hover
  gallery: string[];
  featured?: boolean;
};

// Helper Unsplash — alta resolução, otimizado pelo next/image
const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const SIZE_APPAREL = ["PP", "P", "M", "G", "GG"];
const SIZE_SHOE = ["38", "39", "40", "41", "42", "43"];
const SIZE_ONE = ["Único"];

const BLACK: Color = { name: "Preto", hex: "#0a0a0a" };
const WHITE: Color = { name: "Off-white", hex: "#f3f1ec" };
const STONE: Color = { name: "Stone", hex: "#b8b2a7" };
const NAVY: Color = { name: "Navy", hex: "#1b2333" };
const SAND: Color = { name: "Areia", hex: "#d8c9af" };
const OLIVE: Color = { name: "Oliva", hex: "#5b5d44" };

// NOTA: cada produto tem cover único; hover/galeria nunca repetem o cover de
// outro produto (imagens de demonstração validadas no Unsplash).
export const products: Product[] = [
  // ───────── Camisetas
  {
    id: "tee-essential-noir",
    slug: "camiseta-essential-noir",
    name: "Essential Tee Noir",
    brand: "Calvin Klein",
    category: "Camisetas",
    price: "R$ 219,00",
    oldPrice: "R$ 289,00",
    badge: "Best seller",
    description:
      "Algodão pima de gramatura média com caimento reto e toque acetinado. A peça-base que sustenta qualquer look.",
    details: ["100% algodão pima", "Modelagem regular", "Gola ribana reforçada", "Lavagem enzimática"],
    sizes: SIZE_APPAREL,
    colors: [BLACK, WHITE, STONE],
    image: U("1521572163474-6864f9cf17ab"),
    hover: U("1583743814966-8936f5b7be1a"),
    gallery: [U("1521572163474-6864f9cf17ab"), U("1583743814966-8936f5b7be1a"), U("1562157873-818bc0726f68")],
    featured: true,
  },
  {
    id: "tee-blanc-studio",
    slug: "camiseta-blanc-studio",
    name: "Studio Tee Blanc",
    brand: "Lacoste",
    category: "Camisetas",
    price: "R$ 239,00",
    description:
      "Branco absoluto, costuras planas e acabamento premium. Minimalismo que conversa com tudo.",
    details: ["Algodão penteado", "Modelagem boxy", "Bainha dupla", "Tinge resistente"],
    sizes: SIZE_APPAREL,
    colors: [WHITE, BLACK],
    image: U("1503341504253-dff4815485f1"),
    hover: U("1622445275576-721325763afe"),
    gallery: [U("1503341504253-dff4815485f1"), U("1622445275576-721325763afe"), U("1598033129183-c4f50c736f10")],
  },
  {
    id: "tee-graphic-mono",
    slug: "camiseta-graphic-mono",
    name: "Graphic Tee Mono",
    brand: "Puma",
    category: "Camisetas",
    price: "R$ 199,00",
    description:
      "Estampa editorial em tom sobre tom. Presença sem ruído.",
    details: ["Algodão orgânico", "Estampa em silk d'água", "Modelagem oversized"],
    sizes: SIZE_APPAREL,
    colors: [BLACK, STONE],
    image: U("1576566588028-4147f3842f27"),
    hover: U("1620799139507-2a76f79a2f4d"),
    gallery: [U("1576566588028-4147f3842f27"), U("1620799139507-2a76f79a2f4d"), U("1611312449408-fcece27cdbb7")],
  },

  // ───────── Moletom
  {
    id: "hoodie-heavy-stone",
    slug: "moletom-heavy-stone",
    name: "Heavyweight Hoodie",
    brand: "Nike",
    category: "Moletom",
    price: "R$ 459,00",
    oldPrice: "R$ 579,00",
    badge: "Edição limitada",
    description:
      "Moletom 480g/m² com interior escovado e capuz estruturado. Peso e conforto de peça de coleção.",
    details: ["480 g/m² fleece", "Capuz duplo", "Punhos canelados", "Bolso canguru"],
    sizes: SIZE_APPAREL,
    colors: [STONE, BLACK, OLIVE],
    image: U("1588117305388-c2631a279f82"),
    hover: U("1542060748-10c28b62716f"),
    gallery: [U("1588117305388-c2631a279f82"), U("1542060748-10c28b62716f")],
    featured: true,
  },
  {
    id: "hoodie-tonal-black",
    slug: "moletom-tonal-black",
    name: "Adidas Originals Hoodie",
    brand: "Adidas",
    category: "Moletom",
    price: "R$ 429,00",
    description:
      "Logo tonal e modelagem alongada. Streetwear silencioso, do dia a dia ao layering.",
    details: ["Algodão french terry", "Modelagem relaxed", "Cordão emborrachado"],
    sizes: SIZE_APPAREL,
    colors: [BLACK, NAVY],
    image: U("1620799140408-edc6dcb6d633"),
    hover: U("1593030761757-71fae45fa0e7"),
    gallery: [U("1620799140408-edc6dcb6d633"), U("1593030761757-71fae45fa0e7")],
  },
  {
    id: "crew-fog-grey",
    slug: "moletom-crew-fog",
    name: "Crewneck Fog",
    brand: "New Balance",
    category: "Moletom",
    price: "R$ 389,00",
    description:
      "Gola careca em cinza névoa, com volume na medida certa.",
    details: ["Mescla premium", "Ombro caído", "Ribana reforçada"],
    sizes: SIZE_APPAREL,
    colors: [STONE, NAVY],
    image: U("1582552938357-32b906df40cb"),
    hover: U("1542219550-37153d387c27"),
    gallery: [U("1582552938357-32b906df40cb"), U("1542219550-37153d387c27")],
  },

  // ───────── Jaquetas
  {
    id: "jacket-bomber-noir",
    slug: "jaqueta-bomber-noir",
    name: "Bomber Noir",
    brand: "Tommy Hilfiger",
    category: "Jaquetas",
    price: "R$ 749,00",
    oldPrice: "R$ 899,00",
    badge: "Best seller",
    description:
      "Bomber em nylon matte com forro acetinado e zíper metálico. Silhueta limpa, atitude urbana.",
    details: ["Nylon repelente", "Forro acetinado", "Punhos canelados", "Zíper YKK"],
    sizes: SIZE_APPAREL,
    colors: [BLACK, OLIVE],
    image: U("1551488831-00ddcb6c6bd3"),
    hover: U("1551028719-00167b16eac5"),
    gallery: [U("1551488831-00ddcb6c6bd3"), U("1551028719-00167b16eac5"), U("1543076447-215ad9ba6923")],
    featured: true,
  },
  {
    id: "jacket-denim-raw",
    slug: "jaqueta-denim-raw",
    name: "Denim Jacket Raw",
    brand: "Calvin Klein",
    category: "Jaquetas",
    price: "R$ 689,00",
    description:
      "Jeans bruto de gramatura pesada que envelhece com a sua história.",
    details: ["Denim 14oz", "Botões personalizados", "Modelagem trucker"],
    sizes: SIZE_APPAREL,
    colors: [NAVY, BLACK],
    image: U("1525507119028-ed4c629a60a3"),
    hover: U("1544022613-e87ca75a784a"),
    gallery: [U("1525507119028-ed4c629a60a3"), U("1544022613-e87ca75a784a"), U("1503342217505-b0a15ec3261c")],
  },
  {
    id: "jacket-coach-stone",
    slug: "jaqueta-coach-stone",
    name: "Coach Jacket Stone",
    brand: "Vans",
    category: "Jaquetas",
    price: "R$ 599,00",
    description:
      "Coach jacket leve em tom areia, perfeita para a meia-estação.",
    details: ["Poliamida leve", "Botões de pressão", "Forro de malha"],
    sizes: SIZE_APPAREL,
    colors: [SAND, BLACK],
    image: U("1554568218-0f1715e72254"),
    hover: U("1520975954732-35dd22299614"),
    gallery: [U("1554568218-0f1715e72254"), U("1520975954732-35dd22299614")],
  },

  // ───────── Tênis
  {
    id: "sneaker-runner-white",
    slug: "tenis-runner-white",
    name: "Nike Heritage Runner",
    brand: "Nike",
    category: "Tênis",
    price: "R$ 899,00",
    oldPrice: "R$ 1.099,00",
    badge: "Edição limitada",
    description:
      "Silhueta clássica em couro premium com entressola amortecida. Ícone atemporal.",
    details: ["Cabedal em couro", "Entressola em EVA", "Solado de borracha", "Palmilha removível"],
    sizes: SIZE_SHOE,
    colors: [WHITE, BLACK],
    image: U("1606107557195-0e29a4b5b4aa"),
    hover: U("1549298916-b41d501d3772"),
    gallery: [U("1606107557195-0e29a4b5b4aa"), U("1549298916-b41d501d3772"), U("1600185365926-3a2ce3cdb9eb")],
    featured: true,
  },
  {
    id: "sneaker-court-red",
    slug: "tenis-court-red",
    name: "Puma Court Hi",
    brand: "Puma",
    category: "Tênis",
    price: "R$ 799,00",
    description:
      "Cano alto de inspiração quadra. Statement piece para o look monocromático.",
    details: ["Couro e camurça", "Cano alto", "Solado vulcanizado"],
    sizes: SIZE_SHOE,
    colors: [{ name: "Vermelho", hex: "#b3232b" }, BLACK],
    image: U("1542291026-7eec264c27ff"),
    hover: U("1608231387042-66d1773070a5"),
    gallery: [U("1542291026-7eec264c27ff"), U("1608231387042-66d1773070a5"), U("1539185441755-769473a23570")],
  },
  {
    id: "sneaker-trail-grey",
    slug: "tenis-trail-grey",
    name: "New Balance Trail 99",
    brand: "New Balance",
    category: "Tênis",
    price: "R$ 949,00",
    description:
      "Performance e moda com detalhes refletivos.",
    details: ["Mesh respirável", "Amortecimento responsivo", "Detalhes 3M"],
    sizes: SIZE_SHOE,
    colors: [STONE, NAVY],
    image: U("1595950653106-6c9ebd614d3a"),
    hover: U("1605408499391-6368c628ef42"),
    gallery: [U("1595950653106-6c9ebd614d3a"), U("1605408499391-6368c628ef42"), U("1525966222134-fcfa99b8ae77")],
  },

  // ───────── Bonés
  {
    id: "cap-strap-black",
    slug: "bone-strapback-black",
    name: "Strapback Noir",
    brand: "Nike",
    category: "Bonés",
    price: "R$ 179,00",
    description:
      "Boné de aba curva em sarja preta com fecho metálico. Acabamento impecável.",
    details: ["100% algodão sarja", "Aba curva", "Fecho metálico", "Bordado tonal"],
    sizes: SIZE_ONE,
    colors: [BLACK, STONE],
    image: U("1588850561407-ed78c282e89b"),
    hover: U("1534215754734-18e55d13e346"),
    gallery: [U("1588850561407-ed78c282e89b"), U("1534215754734-18e55d13e346"), U("1521369909029-2afed882baee")],
    featured: true,
  },
  {
    id: "cap-trucker-sand",
    slug: "bone-trucker-sand",
    name: "Trucker Sand",
    brand: "Vans",
    category: "Bonés",
    price: "R$ 159,00",
    description:
      "Trucker areia com tela respirável. Casual com pegada premium.",
    details: ["Frente estruturada", "Tela traseira", "Snapback"],
    sizes: SIZE_ONE,
    colors: [SAND, BLACK],
    image: U("1576871337622-98d48d1cf531"),
    hover: U("1521369909029-2afed882baee"),
    gallery: [U("1576871337622-98d48d1cf531"), U("1521369909029-2afed882baee")],
  },
  {
    id: "beanie-rib-grey",
    slug: "gorro-rib-grey",
    name: "Gorro Ribana Grey",
    brand: "Adidas",
    category: "Bonés",
    price: "R$ 139,00",
    description:
      "Gorro canelado em lã mista. Inverno com elegância.",
    details: ["Lã mista", "Canelado fechado", "Dobra dupla"],
    sizes: SIZE_ONE,
    colors: [STONE, BLACK],
    image: U("1591047139829-d91aecb6caea"),
    hover: U("1534215754734-18e55d13e346"),
    gallery: [U("1591047139829-d91aecb6caea"), U("1534215754734-18e55d13e346")],
  },

  // ───────── Calças
  {
    id: "pants-denim-indigo",
    slug: "calca-denim-indigo",
    name: "Denim Slim Indigo",
    brand: "Calvin Klein",
    category: "Calças",
    price: "R$ 499,00",
    oldPrice: "R$ 629,00",
    description:
      "Jeans índigo de lavagem profunda e caimento slim reto. Curinga absoluto.",
    details: ["Denim com elastano", "Slim straight", "Lavagem escura", "5 bolsos"],
    sizes: ["38", "40", "42", "44", "46"],
    colors: [NAVY, BLACK],
    image: U("1541099649105-f69ad21f3246"),
    hover: U("1542272604-787c3835535d"),
    gallery: [U("1541099649105-f69ad21f3246"), U("1542272604-787c3835535d")],
    featured: true,
  },
  {
    id: "pants-cargo-olive",
    slug: "calca-cargo-olive",
    name: "Cargo Pant Olive",
    brand: "Puma",
    category: "Calças",
    price: "R$ 459,00",
    description:
      "Cargo oliva com bolsos funcionais e amarração no tornozelo.",
    details: ["Sarja resistente", "Bolsos cargo", "Cós com cordão"],
    sizes: ["38", "40", "42", "44", "46"],
    colors: [OLIVE, BLACK],
    image: U("1517336714731-489689fd1ca8"),
    hover: U("1604176354204-9268737828e4"),
    gallery: [U("1517336714731-489689fd1ca8"), U("1604176354204-9268737828e4")],
  },
  {
    id: "pants-track-black",
    slug: "calca-track-black",
    name: "Track Pant Noir",
    brand: "Adidas",
    category: "Calças",
    price: "R$ 379,00",
    description:
      "Calça de moletom afunilada em preto, com toque aveludado.",
    details: ["French terry", "Modelagem tapered", "Punho canelado"],
    sizes: SIZE_APPAREL,
    colors: [BLACK, STONE],
    image: U("1487412720507-e7ab37603c6f"),
    hover: U("1594633312681-425c7b97ccd1"),
    gallery: [U("1487412720507-e7ab37603c6f"), U("1594633312681-425c7b97ccd1")],
  },

  // ───────── Acessórios
  {
    id: "acc-watch-mono",
    slug: "relogio-mono",
    name: "Relógio Mono Steel",
    brand: "Tommy Hilfiger",
    category: "Acessórios",
    price: "R$ 1.290,00",
    badge: "Best seller",
    description:
      "Relógio de aço escovado com mostrador minimalista. O detalhe que define o pulso.",
    details: ["Caixa em aço 40mm", "Vidro safira", "Resistente à água 5ATM"],
    sizes: SIZE_ONE,
    colors: [{ name: "Prata", hex: "#c8c8cc" }, BLACK],
    image: U("1523275335684-37898b6baf30", 1400),
    hover: U("1434056886845-dac89ffe9b56"),
    gallery: [U("1523275335684-37898b6baf30"), U("1434056886845-dac89ffe9b56"), U("1496747611176-843222e1e57c")],
    featured: true,
  },
  {
    id: "acc-shades-black",
    slug: "oculos-shades-black",
    name: "Óculos Shades Noir",
    brand: "Calvin Klein",
    category: "Acessórios",
    price: "R$ 549,00",
    description:
      "Armação acetato preto com lentes polarizadas. Mistério em forma de acessório.",
    details: ["Acetato italiano", "Lentes polarizadas", "Proteção UV400"],
    sizes: SIZE_ONE,
    colors: [BLACK, SAND],
    image: U("1511499767150-a48a237f0083", 1400),
    hover: U("1577803645773-f96470509666"),
    gallery: [U("1511499767150-a48a237f0083"), U("1577803645773-f96470509666"), U("1515886657613-9f3515b0c78f")],
  },
  {
    id: "acc-bag-stone",
    slug: "bolsa-crossbody-stone",
    name: "Crossbody Stone",
    brand: "Lacoste",
    category: "Acessórios",
    price: "R$ 459,00",
    description:
      "Bolsa transversal compacta em nylon técnico. Praticidade com assinatura premium.",
    details: ["Nylon técnico", "Alça ajustável", "Zíper impermeável"],
    sizes: SIZE_ONE,
    colors: [BLACK, STONE],
    image: U("1553062407-98eeb64c6a62", 1400),
    hover: U("1547949003-9792a18a2601"),
    gallery: [U("1553062407-98eeb64c6a62"), U("1547949003-9792a18a2601"), U("1508685096489-7aacd43bd3b1")],
  },
];

// Imagens editoriais / lookbook (campanhas)
export const editorial = {
  heroPrimary: U("1490481651871-ab68de25d43d", 2000),
  heroSecondary: U("1485462537746-965f33f7f6a7", 1600),
  campaignWide: U("1469334031218-e382a71b716b", 2000),
  campaignTall: U("1492707892479-7bc8d5a4ee93", 1400),
  lookbook: [
    U("1483985988355-763728e1935b", 1400),
    U("1487222477894-8943e31ef7b2", 1400),
    U("1581655353564-df123a1eb820", 1400),
    U("1620799139834-6b8f844fbe61", 1400),
    U("1559563458-527698bf5295", 1400),
    U("1556306535-0f09a537f0a3", 1400),
  ],
};

// Capas das categorias (fonte única — reutilizadas pelo CategoryShowcase)
export const categoryCovers: Partial<Record<Category, string>> = {
  Tênis: U("1606107557195-0e29a4b5b4aa"),
  Jaquetas: U("1551488831-00ddcb6c6bd3"),
  Moletom: U("1588117305388-c2631a279f82"),
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function related(slug: string, n = 3) {
  const base = getProduct(slug);
  if (!base) return products.slice(0, n);
  return products
    .filter((p) => p.slug !== slug && p.category === base.category)
    .concat(products.filter((p) => p.slug !== slug && p.category !== base.category))
    .slice(0, n);
}
