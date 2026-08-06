import fabricsImg from "@/assets/cat-fabrics.jpg";
import readyToWearImg from "@/assets/cat-readytowear.jpg";

import colourfulDress from "@/assets/IMG_2180.jpg.asset.json";
import cottonJumpsuit from "@/assets/IMG_2179.jpg.asset.json";
import fittedDress from "@/assets/IMG_2176.jpg.asset.json";
import orangeJumpsuit from "@/assets/IMG_2177.jpg.asset.json";
import pearlKimono from "@/assets/IMG_2173.jpg.asset.json";
import smockedDress from "@/assets/IMG_2181.jpg.asset.json";
import chiffonJumpsuit from "@/assets/IMG_2178.jpg.asset.json";
import chiffonLongDress from "@/assets/IMG_2175.jpg.asset.json";
import boyfriendJeans from "@/assets/IMG_2174.jpg.asset.json";

export type Category = "fabrics" | "ready-to-wear" | "thrift";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  /** Yardage for fabric, size for ready-to-wear, condition note for thrift. */
  detail: string;
  description: string;
  /** Selectable options (yardage, size, or single-piece note). */
  variants?: string[];
  inStock: boolean;
};

export const categories: {
  id: Category;
  label: string;
  blurb: string;
  image: string;
}[] = [
  {
    id: "fabrics",
    label: "Ankara Fabrics",
    blurb: "Bold wax prints by the yard, cut and ready to sew.",
    image: fabricsImg,
  },
  {
    id: "ready-to-wear",
    label: "Ready to Wear",
    blurb: "Finished pieces you can order and wear straight away.",
    image: readyToWearImg,
  },
  {
    id: "thrift",
    label: "Thrift Finds",
    blurb: "One-of-one UK-sized pieces — once it's gone, it's gone.",
    image: pearlKimono.url,
  },
];

/**
 * Real stock, taken from the owner's own product photos. Prices and UK sizes
 * are exactly as listed on the photos.
 */
export const products: Product[] = [
  {
    slug: "stretchy-kimono-pearls-belt",
    name: "Stretchy Kimono with Pearls & Belt",
    category: "thrift",
    price: 3000,
    image: pearlKimono.url,
    detail: "UK 14/16 · one available",
    description:
      "Navy stretch kimono scattered with pearl detail, crochet-trim sleeves and a matching tie belt. Full length, wears open or belted. Single piece.",
    inStock: true,
  },
  {
    slug: "sexy-boyfriend-jeans",
    name: "Boyfriend Jeans (Distressed)",
    category: "thrift",
    price: 3500,
    image: boyfriendJeans.url,
    detail: "UK 18 · one available",
    description:
      "Mid-blue boyfriend jeans with three distressed knee slashes and a turn-up hem. Relaxed leg, no marks or fading. Single piece.",
    inStock: true,
  },
  {
    slug: "colourful-chiffon-long-dress",
    name: "Colourful Chiffon Long Dress",
    category: "thrift",
    price: 3000,
    image: chiffonLongDress.url,
    detail: "UK 10/12 · one available",
    description:
      "Black chiffon maxi in a bright rose and lily print, sheer mesh yoke and a tie waist. Light and easy for owambe or a day out.",
    inStock: true,
  },
  {
    slug: "full-length-chiffon-jumpsuit",
    name: "Full Length Chiffon Jumpsuit",
    category: "thrift",
    price: 2800,
    image: chiffonJumpsuit.url,
    detail: "UK 12/14 · one available",
    description:
      "Yellow chiffon jumpsuit in a bold multicoloured medallion print with wide flowing legs and a gathered waist. Statement piece.",
    inStock: true,
  },
  {
    slug: "smocked-off-shoulder-dress",
    name: "Smocked Off-Shoulder Dress",
    category: "thrift",
    price: 3000,
    image: smockedDress.url,
    detail: "UK 18/20 · one available",
    description:
      "Tropical green and blue floral print on black, with a smocked off-shoulder bodice that stretches to fit and a full skirt.",
    inStock: true,
  },
  {
    slug: "orange-side-button-jumpsuit",
    name: "Orange Side Button Jumpsuit",
    category: "thrift",
    price: 3000,
    image: orangeJumpsuit.url,
    detail: "UK 12 · one available",
    description:
      "Burnt-orange dungaree-style jumpsuit with wide culotte legs and wooden buttons down both sides. Clean, no marks.",
    inStock: true,
  },
  {
    slug: "lovely-cotton-jumpsuit",
    name: "Lovely Cotton Jumpsuit",
    category: "thrift",
    price: 3000,
    image: cottonJumpsuit.url,
    detail: "UK 12 · one available",
    description:
      "Breathable cotton jumpsuit in a small ditsy print with plaited shoulder straps, elastic waist and wide legs. Easy everyday wear.",
    inStock: true,
  },
  {
    slug: "stretchy-colourful-dress",
    name: "Stretchy Colourful Lace-Yoke Dress",
    category: "thrift",
    price: 3000,
    image: colourfulDress.url,
    detail: "UK 16 (14 can wear) · one available",
    description:
      "Black textured dress with white polka dots and roses, black lace yoke and a fitted waist with a flared skirt. Stretchy fit.",
    inStock: true,
  },
  {
    slug: "solid-stretchy-fitted-dress",
    name: "Solid Stretchy Fitted Dress",
    category: "thrift",
    price: 3000,
    image: fittedDress.url,
    detail: "UK 18/20 · one available",
    description:
      "Nude stretch bodycon dress with a contrast black velvet collar and half sleeves. Office or dinner, dresses up easily.",
    inStock: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function categoryLabel(id: Category) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

/**
 * Label used for the variant picker, per category.
 */
export function variantLabel(category: Category) {
  if (category === "fabrics") return "Yardage";
  if (category === "ready-to-wear") return "Size";
  return "Option";
}
