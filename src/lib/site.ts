export const site = {
  name: "3K Below Ankara",
  tagline: "Everything ₦3,000 and below",
  whatsappNumber: "2348032227986",
  whatsappDisplay: "+234 803 222 7986",
  instagram: "https://www.instagram.com/3kbelowankara/",
  instagramHandle: "@3kbelowankara",
  deliveryPromise: "Nationwide delivery in 48 – 72 hrs",
  url: "https://3kbelowankara.lovable.app",
};

/** Build a WhatsApp deep link with a pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}
