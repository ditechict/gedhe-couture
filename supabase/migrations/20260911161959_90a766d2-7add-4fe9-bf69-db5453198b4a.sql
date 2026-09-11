-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'staff');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can read all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- updated_at helper
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Categories
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  label text NOT NULL,
  blurb text NOT NULL DEFAULT '',
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are publicly readable"
ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage categories"
ON public.categories FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER categories_updated_at BEFORE UPDATE ON public.categories
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Products
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  price_ngn integer NOT NULL CHECK (price_ngn >= 0),
  image_url text,
  detail text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  variants text[] NOT NULL DEFAULT '{}',
  stock integer NOT NULL DEFAULT 1 CHECK (stock >= 0),
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published products are publicly readable"
ON public.products FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Admins read all products"
ON public.products FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert products"
ON public.products FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update products"
ON public.products FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete products"
ON public.products FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Reviews
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  location text,
  rating integer NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  body text NOT NULL,
  approved boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved reviews are publicly readable"
ON public.reviews FOR SELECT TO anon, authenticated USING (approved = true);
CREATE POLICY "Admins read all reviews"
ON public.reviews FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage reviews"
ON public.reviews FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER reviews_updated_at BEFORE UPDATE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Orders
CREATE TYPE public.order_status AS ENUM
  ('pending', 'paid', 'packed', 'dispatched', 'delivered', 'cancelled', 'refunded');

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text NOT NULL UNIQUE,
  status public.order_status NOT NULL DEFAULT 'pending',
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  country text NOT NULL DEFAULT 'NG',
  note text,
  currency text NOT NULL DEFAULT 'NGN',
  fx_rate numeric NOT NULL DEFAULT 1,
  subtotal_ngn integer NOT NULL DEFAULT 0,
  amount_minor integer NOT NULL DEFAULT 0,
  provider text NOT NULL DEFAULT 'paystack',
  payment_reference text UNIQUE,
  paid_at timestamptz,
  tracking_note text,
  delivery_fee_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read orders"
ON public.orders FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update orders"
ON public.orders FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  name text NOT NULL,
  variant text,
  unit_price_ngn integer NOT NULL,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read order items"
ON public.order_items FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX orders_created_at_idx ON public.orders (created_at DESC);
CREATE INDEX order_items_order_id_idx ON public.order_items (order_id);
CREATE INDEX products_category_idx ON public.products (category_id);

-- Seed categories
INSERT INTO public.categories (slug, label, blurb, image_url, sort_order) VALUES
('fabrics', 'Ankara Fabrics', 'Bold wax prints by the yard, cut and ready to sew.', NULL, 1),
('ready-to-wear', 'Ready to Wear', 'Finished pieces you can order and wear straight away.', NULL, 2),
('thrift', 'Thrift Finds', 'One-of-one UK-sized pieces — once it''s gone, it''s gone.', '/__l5e/assets-v1/e524ea60-aa90-4a44-92ea-7a8bdf81c516/IMG_2173.jpg', 3);

-- Seed products (real stock from the owner's photos)
INSERT INTO public.products (slug, name, category_id, price_ngn, image_url, detail, description, stock, sort_order)
SELECT v.slug, v.name, c.id, v.price, v.image, v.detail, v.description, 1, v.sort_order
FROM (VALUES
 ('stretchy-kimono-pearls-belt','Stretchy Kimono with Pearls & Belt',3000,'/__l5e/assets-v1/e524ea60-aa90-4a44-92ea-7a8bdf81c516/IMG_2173.jpg','UK 14/16 · one available','Navy stretch kimono scattered with pearl detail, crochet-trim sleeves and a matching tie belt. Full length, wears open or belted. Single piece.',1),
 ('sexy-boyfriend-jeans','Boyfriend Jeans (Distressed)',3500,'/__l5e/assets-v1/2779b703-8f17-4555-9b1c-0b7fc5f5ef25/IMG_2174.jpg','UK 18 · one available','Mid-blue boyfriend jeans with three distressed knee slashes and a turn-up hem. Relaxed leg, no marks or fading. Single piece.',2),
 ('colourful-chiffon-long-dress','Colourful Chiffon Long Dress',3000,'/__l5e/assets-v1/e8603bce-47c6-451a-933f-9541f687a1b0/IMG_2175.jpg','UK 10/12 · one available','Black chiffon maxi in a bright rose and lily print, sheer mesh yoke and a tie waist. Light and easy for owambe or a day out.',3),
 ('full-length-chiffon-jumpsuit','Full Length Chiffon Jumpsuit',2800,'/__l5e/assets-v1/0d847891-1960-4aa1-8eef-d258a1c51a66/IMG_2178.jpg','UK 12/14 · one available','Yellow chiffon jumpsuit in a bold multicoloured medallion print with wide flowing legs and a gathered waist. Statement piece.',4),
 ('smocked-off-shoulder-dress','Smocked Off-Shoulder Dress',3000,'/__l5e/assets-v1/f4b97ef4-14cb-40c3-b533-7c7ea98032c4/IMG_2181.jpg','UK 18/20 · one available','Tropical green and blue floral print on black, with a smocked off-shoulder bodice that stretches to fit and a full skirt.',5),
 ('orange-side-button-jumpsuit','Orange Side Button Jumpsuit',3000,'/__l5e/assets-v1/9b4c5d45-5981-42d1-9059-2c1c1cc0c371/IMG_2177.jpg','UK 12 · one available','Burnt-orange dungaree-style jumpsuit with wide culotte legs and wooden buttons down both sides. Clean, no marks.',6),
 ('lovely-cotton-jumpsuit','Lovely Cotton Jumpsuit',3000,'/__l5e/assets-v1/961b1a75-5eec-44b0-aa8a-e5c7af314c21/IMG_2179.jpg','UK 12 · one available','Breathable cotton jumpsuit in a small ditsy print with plaited shoulder straps, elastic waist and wide legs. Easy everyday wear.',7),
 ('stretchy-colourful-dress','Stretchy Colourful Lace-Yoke Dress',3000,'/__l5e/assets-v1/25552184-1bac-45bf-9a08-fdd7b84d6549/IMG_2180.jpg','UK 16 (14 can wear) · one available','Black textured dress with white polka dots and roses, black lace yoke and a fitted waist with a flared skirt. Stretchy fit.',8),
 ('solid-stretchy-fitted-dress','Solid Stretchy Fitted Dress',3000,'/__l5e/assets-v1/cf4a11fb-50cd-4c47-a246-a10d9b658381/IMG_2176.jpg','UK 18/20 · one available','Nude stretch bodycon dress with a contrast black velvet collar and half sleeves. Office or dinner, dresses up easily.',9)
) AS v(slug, name, price, image, detail, description, sort_order)
CROSS JOIN (SELECT id FROM public.categories WHERE slug = 'thrift') AS c;

-- Seed reviews (approved, replaceable from the admin area)
INSERT INTO public.reviews (author_name, location, rating, body, approved, sort_order) VALUES
('Amaka O.', 'Lagos', 5, 'Ordered on a Monday and it arrived Wednesday. The dress fits exactly as described.', true, 1),
('Blessing A.', 'Abuja', 5, 'Prices are honest and the fabric quality surprised me. Will order again.', true, 2),
('Tunde M.', 'Ibadan', 5, 'Very easy to deal with. Sent me extra photos before I paid.', true, 3);