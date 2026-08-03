import fabricsImg from "@/assets/cat-fabrics.jpg";
import readyToWearImg from "@/assets/cat-readytowear.jpg";
import thriftImg from "@/assets/cat-thrift.jpg";

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
    blurb: "One-of-one secondhand pieces — once it's gone, it's gone.",
    image: thriftImg,
  },
];

/**
 * Placeholder catalogue. Structure matches what real stock will use, so
 * replacing these entries with the owner's products needs no code changes.
 */
export const products: Product[] = [
  {
    slug: "emerald-bloom-wax-print",
    name: "Emerald Bloom Wax Print",
    category: "fabrics",
    price: 2800,
    image: fabricsImg,
    detail: "6 yards",
    description:
      "Deep emerald ground with gold and magenta blooms. Soft hand, holds a pleat well — good for wrap skirts and gowns.",
    variants: ["2 yards", "4 yards", "6 yards"],
    inStock: true,
  },
  {
    slug: "marigold-spiral-wax-print",
    name: "Marigold Spiral Wax Print",
    category: "fabrics",
    price: 2500,
    image: fabricsImg,
    detail: "6 yards",
    description:
      "Warm marigold with navy spirals. A loud print that photographs beautifully in daylight.",
    variants: ["2 yards", "4 yards", "6 yards"],
    inStock: true,
  },
  {
    slug: "indigo-medallion-wax-print",
    name: "Indigo Medallion Wax Print",
    category: "fabrics",
    price: 3000,
    image: fabricsImg,
    detail: "6 yards",
    description:
      "Classic indigo medallion repeat. Versatile enough for men's shirts and women's two-pieces alike.",
    variants: ["2 yards", "4 yards", "6 yards"],
    inStock: true,
  },
  {
    slug: "clay-print-two-piece",
    name: "Clay Print Two-Piece Set",
    category: "ready-to-wear",
    price: 3000,
    image: readyToWearImg,
    detail: "Sizes S – L",
    description:
      "Flutter-sleeve top with a matching relaxed short. Fully lined at the bodice, made in-house.",
    variants: ["S", "M", "L"],
    inStock: true,
  },
  {
    slug: "printed-flutter-top",
    name: "Printed Flutter Top",
    category: "ready-to-wear",
    price: 2200,
    image: readyToWearImg,
    detail: "Sizes S – XL",
    description:
      "Everyday flutter-sleeve top in a small-scale Ankara print. Pairs with jeans or a plain skirt.",
    variants: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    slug: "wrap-skirt-ankara",
    name: "Ankara Wrap Skirt",
    category: "ready-to-wear",
    price: 2900,
    image: readyToWearImg,
    detail: "Free size, adjustable tie",
    description:
      "Adjustable wrap skirt with a wide waist tie. One size fits most, so no measurements needed.",
    variants: ["Free size"],
    inStock: false,
  },
  {
    slug: "thrift-denim-shirt",
    name: "Thrift Denim Shirt",
    category: "thrift",
    price: 2500,
    image: thriftImg,
    detail: "One available · Grade A",
    description:
      "Mid-wash denim shirt, no fading or marks. Single piece — first payment confirmed takes it.",
    inStock: true,
  },
  {
    slug: "thrift-floral-blouse",
    name: "Thrift Floral Blouse",
    category: "thrift",
    price: 1800,
    image: thriftImg,
    detail: "One available · Grade A",
    description:
      "Cream floral blouse in light crepe. Washed and pressed before dispatch.",
    inStock: true,
  },
  {
    slug: "thrift-printed-maxi",
    name: "Thrift Printed Maxi",
    category: "thrift",
    price: 3000,
    image: thriftImg,
    detail: "One available · Grade B",
    description:
      "Full-length printed maxi with a small mend at the hem, barely visible when worn.",
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
