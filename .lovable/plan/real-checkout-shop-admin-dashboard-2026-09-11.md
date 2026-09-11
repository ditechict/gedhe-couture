# Real checkout + shop admin dashboard

Move from "message us on WhatsApp" to a real online checkout, and give you a private admin area to run the shop yourself.

## What you'll be able to do

- Customers add items to a basket and pay by card (plus Apple Pay / Google Pay where supported).
- Every paid order is recorded automatically with the customer's name, phone, email, delivery address and items.
- You sign in to a private admin area to:
  - Add, edit, duplicate, hide and delete products (photos, price, size/yardage, stock, description)
  - Manage categories
  - See orders with status (paid, packed, dispatched, delivered, cancelled/refunded) and update them
  - Add a courier tracking note and mark delivery cost as agreed separately, as you asked
  - See a simple dashboard: today's sales, this month's sales, best sellers, low/out-of-stock items
  - Manage the customer reviews shown on the site
- Delivery cost is not charged at checkout; the order confirmation tells the customer you'll agree delivery with them on WhatsApp.

## Payments

Currency: should be determined by user location; UK/pounds option for all Europe region, Nairafor all Afircan region, and USD for all other regions.

Two possible providers, and this is the one decision I need from you:

- **Paystack** — best fit for Nigerian customers: cards, bank transfer, USSD, plus Apple Pay. Payouts to a Nigerian bank account. Needs your Paystack account (free to open) and its secret key.
- **Stripe** — best fit if the American and UK company takes the money: cards, Apple Pay, Google Pay, strong international support. Weaker for Nigerian bank transfer/USSD.

I'd recommend Paystack first, since most of your buyers are in Nigeria, and adding Stripe later for UK orders. Either way you'll need to open the account and paste one secret key into a secure form I'll open for you — I never see it.

## Accounts and sign-in

- Customers can check out as guests; no account needed.
- Admin access is limited to accounts you explicitly mark as admin, so nobody can promote themselves.
- Product photos move into managed storage so you can upload new ones from the admin area instead of asking me.

## Pages added

- `/cart` — basket
- `/checkout` — contact + delivery details, then payment
- `/order/success` — confirmation with order number and a WhatsApp link to arrange delivery
- `/auth` — sign in (admin only in practice)
- `/admin` — dashboard, `/admin/products`, `/admin/products/new`, `/admin/products/:id`, `/admin/categories`, `/admin/orders`, `/admin/orders/:id`, `/admin/reviews`

The existing WhatsApp buttons stay as a secondary option; nothing you have now is removed.

## Technical outline

- Enable Lovable Cloud for database, auth, storage.
- Tables: `products`, `categories`, `orders`, `order_items`, `reviews`, `user_roles` (separate roles table, `has_role()` security-definer function). RLS on every table: public read of published products/approved reviews via `anon` SELECT; all writes and all order reads admin-only; explicit GRANTs per table.
- Cart state client-side (localStorage); server recomputes every line price from the database at checkout so totals can't be tampered with.
- Checkout: `createServerFn` creates a `pending` order, then initialises a provider transaction and returns the hosted payment URL.
- `src/routes/api/public/webhooks/paystack.ts` verifies the provider signature, then marks the order `paid` and decrements stock. Order status is only ever set from the verified webhook, never from the browser redirect.
- Secret key stored as a project secret, read inside handlers only.
- Storage bucket for product images with admin-only write, public read.
- Admin routes under `src/routes/_authenticated/admin/` with a role check in both the layout and every admin server function.

## Open item

Reply with **Paystack** or **Stripe** (or approve and I'll set up Paystack) and, if you want pound pricing too, which country's business account should receive it.