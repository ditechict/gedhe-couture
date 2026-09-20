import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  variant: string | null;
  price: number;
  image: string | null;
  quantity: number;
};

const KEY = "3kb.cart.v1";

type CartValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (line: CartLine) => void;
  setQuantity: (slug: string, variant: string | null, quantity: number) => void;
  remove: (slug: string, variant: string | null) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);

function sameLine(a: CartLine, slug: string, variant: string | null) {
  return a.slug === slug && (a.variant ?? null) === (variant ?? null);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore malformed cart */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable */
    }
  }, [lines]);

  const add = useCallback((line: CartLine) => {
    setLines((prev) => {
      const idx = prev.findIndex((l) => sameLine(l, line.slug, line.variant));
      if (idx === -1) return [...prev, line];
      const next = [...prev];
      next[idx] = { ...next[idx]!, quantity: next[idx]!.quantity + line.quantity };
      return next;
    });
  }, []);

  const setQuantity = useCallback(
    (slug: string, variant: string | null, quantity: number) => {
      setLines((prev) =>
        quantity <= 0
          ? prev.filter((l) => !sameLine(l, slug, variant))
          : prev.map((l) => (sameLine(l, slug, variant) ? { ...l, quantity } : l)),
      );
    },
    [],
  );

  const remove = useCallback((slug: string, variant: string | null) => {
    setLines((prev) => prev.filter((l) => !sameLine(l, slug, variant)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.price * l.quantity, 0),
      add,
      setQuantity,
      remove,
      clear,
    }),
    [lines, add, setQuantity, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
