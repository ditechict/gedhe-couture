import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export type ShopCategory = {
  id: string;
  slug: string;
  label: string;
  blurb: string;
  image_url: string | null;
};

export type ShopProduct = {
  id: string;
  slug: string;
  name: string;
  category_id: string | null;
  price_ngn: number;
  image_url: string | null;
  detail: string;
  description: string;
  variants: string[];
  stock: number;
};

export const getCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();
  const [cats, prods] = await Promise.all([
    supabase
      .from("categories")
      .select("id, slug, label, blurb, image_url")
      .order("sort_order"),
    supabase
      .from("products")
      .select(
        "id, slug, name, category_id, price_ngn, image_url, detail, description, variants, stock",
      )
      .eq("published", true)
      .order("sort_order"),
  ]);

  return {
    categories: (cats.data ?? []) as ShopCategory[],
    products: (prods.data ?? []) as ShopProduct[],
  };
});

export const getApprovedReviews = createServerFn({ method: "GET" }).handler(
  async () => {
    const supabase = publicClient();
    const { data } = await supabase
      .from("reviews")
      .select("id, author_name, location, rating, body")
      .eq("approved", true)
      .order("sort_order");
    return data ?? [];
  },
);
