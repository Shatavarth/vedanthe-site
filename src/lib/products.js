// Shared placeholder bottle photo — the project only has a handful of generic
// product shots, not one per scent, so every card reuses the flagship bottle.
const PLACEHOLDER_IMAGE = '/products/bold-confession-bottle.jpg'

export const AUDIENCES = ['Woman', 'Man', 'Unisex']

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export function sortProducts(products, sortBy) {
  if (sortBy === 'featured' || !sortBy) return products

  const sorted = [...products]
  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    default:
      return sorted
  }
}

// VEDANTHÈ's own in-house line — not a designer dupe, so these carry a
// collection credit instead of an "inspired by" line.
export const VILLA_SULLOMBRA = {
  name: "Villa Sull'Ombra",
  tagline: 'The Soothing Aura Collection',
}

// inspiredByPrice values are approximate CAD retail prices for the full-size
// designer original, researched from official brand sites / major retailers.
// Fragrance pricing varies a lot by size, region, and promotions, so treat
// these as representative "compare at" figures rather than exact live SKUs.
export const PRODUCTS = [
  // Women's Collection
  {
    id: 'velvet-villain',
    name: 'Velvet Villain',
    audience: 'Woman',
    note: 'Sweet Floral, Vanilla',
    price: 49,
    inspiredBy: 'Black Opium (YSL)',
    inspiredByPrice: 349,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'sugar-riot',
    name: 'Sugar Riot',
    audience: 'Woman',
    note: 'Sweet Floral, Honey',
    price: 49,
    inspiredBy: "Love Don't Be Shy (Kilian)",
    inspiredByPrice: 620,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'paris-problems',
    name: 'Paris Problems',
    audience: 'Woman',
    note: 'Floral, Woody',
    price: 49,
    inspiredBy: 'Coco Mademoiselle (Chanel)',
    inspiredByPrice: 230,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'petal-panic',
    name: 'Petal Panic',
    audience: 'Woman',
    note: 'Floral, Patchouli',
    price: 49,
    inspiredBy: 'Flowerbomb (Viktor & Rolf)',
    inspiredByPrice: 250,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'golden-mischief',
    name: 'Golden Mischief',
    audience: 'Woman',
    note: 'Floral, Fruity',
    price: 49,
    inspiredBy: "J'adore (Dior)",
    inspiredByPrice: 225,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'pretty-dangerous',
    name: 'Pretty Dangerous',
    audience: 'Woman',
    note: 'Floral, Almond',
    price: 49,
    inspiredBy: 'Good Girl (Carolina Herrera)',
    inspiredByPrice: 210,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'wild-intent',
    name: 'Wild Intent',
    audience: 'Woman',
    note: 'Lavender, Vanilla',
    price: 49,
    inspiredBy: 'Libre (YSL)',
    inspiredByPrice: 215,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'bloom-addiction',
    name: 'Bloom Addiction',
    audience: 'Woman',
    note: 'Floral, Fruity',
    price: 49,
    inspiredBy: 'Flora Gorgeous Gardenia (Gucci)',
    inspiredByPrice: 170,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'sweet-tooth',
    name: 'Sweet Tooth',
    audience: 'Woman',
    note: 'Vanilla, Caramel',
    price: 49,
    collection: VILLA_SULLOMBRA,
    image: PLACEHOLDER_IMAGE,
  },

  // Men's Collection
  {
    id: 'silent-flex',
    name: 'Silent Flex',
    audience: 'Man',
    note: 'Fruity, Smoky Woods',
    price: 49,
    inspiredBy: 'Aventus (Creed)',
    inspiredByPrice: 820,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'soft-savage',
    name: 'Soft Savage',
    audience: 'Man',
    note: 'Fresh, Spicy Woods',
    price: 49,
    inspiredBy: 'Sauvage (Dior)',
    inspiredByPrice: 150,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'rich-problems',
    name: 'Rich Problems',
    audience: 'Man',
    note: 'Spicy Leather',
    price: 49,
    inspiredBy: 'One Million (Paco Rabanne)',
    inspiredByPrice: 180,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'dark-timber',
    name: 'Dark Timber',
    audience: 'Man',
    note: 'Woody, Oud',
    price: 49,
    inspiredBy: 'Oud Wood (Tom Ford)',
    inspiredByPrice: 375,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'blue-criminal',
    name: 'Blue Criminal',
    audience: 'Man',
    note: 'Citrus, Woody',
    price: 49,
    inspiredBy: 'Bleu de Chanel',
    inspiredByPrice: 210,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'golden-rogue',
    name: 'Golden Rogue',
    audience: 'Man',
    note: 'Spicy Amber',
    price: 49,
    inspiredBy: 'Le Male Elixir (Jean Paul Gaultier)',
    inspiredByPrice: 200,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'stay-close',
    name: 'Stay Close',
    audience: 'Man',
    note: 'Spicy, Sweet',
    price: 49,
    inspiredBy: 'Stronger With You (Emporio Armani)',
    inspiredByPrice: 150,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'ocean-criminal',
    name: 'Ocean Criminal',
    audience: 'Man',
    note: 'Aquatic Citrus',
    price: 49,
    inspiredBy: 'Acqua di Gio (Giorgio Armani)',
    inspiredByPrice: 215,
    image: PLACEHOLDER_IMAGE,
  },

  // Unisex Collection
  {
    id: 'mood-dealer',
    name: 'Mood Dealer',
    audience: 'Unisex',
    note: 'Amber, Saffron',
    price: 49,
    inspiredBy: 'Baccarat Rouge 540 (Maison Francis Kurkdjian)',
    inspiredByPrice: 460,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'smoke-candy',
    name: 'Smoke Candy',
    audience: 'Unisex',
    note: 'Tobacco, Vanilla',
    price: 49,
    inspiredBy: 'Tobacco Vanille (Tom Ford)',
    inspiredByPrice: 370,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'wood-therapy',
    name: 'Wood Therapy',
    audience: 'Unisex',
    note: 'Sandalwood, Leather',
    price: 49,
    inspiredBy: 'Santal 33 (Le Labo)',
    inspiredByPrice: 335,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'daydream-dealer',
    name: 'Daydream Dealer',
    audience: 'Unisex',
    note: 'Fresh Musk',
    price: 49,
    inspiredBy: 'Imagination (Louis Vuitton)',
    inspiredByPrice: 365,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'cherry-trouble',
    name: 'Cherry Trouble',
    audience: 'Unisex',
    note: 'Cherry, Almond',
    price: 49,
    inspiredBy: 'Lost Cherry (Tom Ford)',
    inspiredByPrice: 530,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'salty-business',
    name: 'Salty Business',
    audience: 'Unisex',
    note: 'Salty, Fresh',
    price: 49,
    inspiredBy: 'Wood Sage & Sea Salt (Jo Malone)',
    inspiredByPrice: 230,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'no-limits',
    name: 'No Limits',
    audience: 'Unisex',
    note: 'Fresh Musk',
    price: 49,
    inspiredBy: "L'Immensité (Louis Vuitton)",
    inspiredByPrice: 310,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'desert-ghost',
    name: 'Desert Ghost',
    audience: 'Unisex',
    note: 'Smoky Oud',
    price: 49,
    inspiredBy: 'Ombre Nomade (Louis Vuitton)',
    inspiredByPrice: 570,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'amber-hustle',
    name: 'Amber Hustle',
    audience: 'Unisex',
    note: 'Warm Amber',
    price: 49,
    collection: VILLA_SULLOMBRA,
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 'aqua-instinct',
    name: 'Aqua Instinct',
    audience: 'Man',
    note: 'Fresh Spicy',
    price: 49,
    collection: VILLA_SULLOMBRA,
    image: PLACEHOLDER_IMAGE,
  },
]

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id)
}

export function getProductsByAudience(audience) {
  return PRODUCTS.filter((p) => p.audience === audience)
}
