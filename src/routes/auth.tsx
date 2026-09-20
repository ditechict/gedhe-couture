import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — 3K Below Ankara Admin" },
      {
        name: "description",
        content: "Sign in to manage products, orders and reviews for 3K Below Ankara.",
      },
      { property: "og:title", content: "Sign In — 3K Below Ankara" },
      { property: "og:description", content: "Shop owner sign in." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    });
    if (signInError) {
      setError(signInError.message);
      setBusy(false);
      return;
    }
    navigate({ to: "/admin" });
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-foreground">Shop sign in</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        For the shop owner only.
      </p>
      <form onSubmit={signIn} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Email</span>
          <input
            required
            name="email"
            type="email"
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Password</span>
          <input
            required
            name="password"
            type="password"
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
          />
        </label>
        {error && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
        >
          {busy && <Loader2 className="size-4 animate-spin" />}
          Sign in
        </button>
      </form>
    </div>
  );
}
