import { getProductListings } from "@/lib/shopify";
import Link from "next/link";


export default async function Home() {
  const products = await getProductListings(12);

  return (
    <main className="min-h-screen bg-[#fff7fb] text-neutral-900">
      {/* Top bar */}
      <div className="border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="font-semibold tracking-tight">Forever</div>
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <span className="hidden sm:inline">Small upgrades for everyday life ✨</span>
            <a
              className="rounded-full bg-black px-4 py-2 text-white hover:opacity-90"
              href="#shop"
            >
              Shop now
            </a>
          </div>
        </div>
      </div>

      

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-pink-300/40 blur-3xl" />
          <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-rose-400/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-fuchsia-300/20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-neutral-700 ring-1 ring-black/5">
              ✨ Curated everyday essentials
              <span className="rounded-full bg-pink-100 px-2 py-0.5 text-pink-700">
                New drops weekly
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Products that make life{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                feel better
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base text-neutral-700 md:text-lg">
              Smart, practical items that save time, reduce stress, and make
              everyday moments smoother — with a soft, premium vibe.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#shop"
                className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                Explore best sellers
              </a>
              <a
                href="#why"
                className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-neutral-900 ring-1 ring-black/5 hover:bg-white/80"
              >
                Why Forever?
              </a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-xs text-neutral-700">
              {[
                ["Fast picks", "Only useful stuff"],
                ["Global-friendly", "Ships worldwide"],
                ["Support", "Quick replies"],
              ].map(([t, s]) => (
                <div
                  key={t}
                  className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5"
                >
                  <div className="font-semibold">{t}</div>
                  <div className="mt-1 text-neutral-600">{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card */}
          <div className="relative">
            <div className="rounded-3xl bg-white/70 p-4 ring-1 ring-black/5 backdrop-blur">
              <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">
                      Today’s featured item
                    </div>
                    <div className="mt-1 text-xs text-neutral-600">
                      A small upgrade that feels premium ✨
                    </div>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-medium ring-1 ring-black/5">
                    Best seller
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                    <div className="text-xs text-neutral-600">Gift impact</div>
                    <div className="mt-1 text-lg font-semibold">High</div>
                    <div className="mt-2 text-xs text-neutral-600">
                      Unboxing moment that sells itself
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                    <div className="text-xs text-neutral-600">Occasions</div>
                    <div className="mt-1 text-lg font-semibold">All year</div>
                    <div className="mt-2 text-xs text-neutral-600">
                      Anniversary • Proposal • Surprise
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-black/5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Today’s deal</div>
                    <div className="text-sm font-semibold">$13.55</div>
                  </div>
                  <button className="mt-3 w-full rounded-xl bg-black py-3 text-sm font-medium text-white hover:opacity-90">
                    Add to cart
                  </button>
                  <div className="mt-2 text-center text-[11px] text-neutral-500">
                    

                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-3xl bg-pink-400/20 blur-2xl" />
            <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-3xl bg-rose-400/20 blur-2xl" />
          </div>
        </div>


        {/* New Arrivals (top) */}
<div className="relative mx-auto max-w-6xl px-5 pb-10">
  <div className="flex items-end justify-between gap-4">
    <div>
      <h3 className="text-xl font-semibold tracking-tight">New arrivals</h3>
      <p className="mt-1 text-sm text-neutral-700">
        Fresh picks added to the store.
      </p>
    </div>

    <a className="text-sm font-medium text-rose-700 hover:underline" href="#shop">
      View all →
    </a>
  </div>

  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {products.slice(0, 4).map((p: any) => (
      <Link
        key={p.id}
        href={`/products/${p.handle}`}
        className="group rounded-3xl bg-white/70 p-4 ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-sm"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
          {p.featuredImage?.url ? (
            <img
              src={p.featuredImage.url}
              alt={p.featuredImage.altText || p.title}
              className="h-full w-full object-cover transition group-hover:scale-[1.02]"
            />
          ) : null}
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{p.title}</div>
            <div className="mt-1 text-xs text-neutral-600">New</div>
          </div>

          <div className="shrink-0 text-sm font-semibold">
            {p.priceRange?.minVariantPrice?.amount}{" "}
            {p.priceRange?.minVariantPrice?.currencyCode}
          </div>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-rose-700">
          View details <span className="transition group-hover:translate-x-0.5">→</span>
        </div>
      </Link>
    ))}
  </div>
</div>

      </section>

      {/* Why */}
      <section id="why" className="mx-auto max-w-6xl px-5 pb-16">
        <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-black/5 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            Why people buy from Forever
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-700">
            A clean storefront that builds trust: problem → solution → proof.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Problem-first", "Show the problem, then sell the solution."],
              ["Premium visuals", "Looks like a brand — even with few products."],
              ["Fast checkout", "Fewer steps = more completed orders."],
            ].map(([t, s]) => (
              <div
                key={t}
                className="rounded-2xl bg-gradient-to-br from-white to-pink-50 p-5 ring-1 ring-black/5"
              >
                <div className="text-sm font-semibold">{t}</div>
                <div className="mt-2 text-sm text-neutral-700">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop placeholder */}
      <section id="shop" className="mx-auto max-w-6xl px-5 pb-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Featured</h3>
            <p className="mt-1 text-sm text-neutral-700">
              
            </p>
          </div>
          <a className="text-sm font-medium text-rose-700 hover:underline" href="#">
            View all →
          </a>
        </div>

<div className="mt-6 grid gap-4 md:grid-cols-3">
  {products.map((p: any) => (
    <div
      key={p.id}
      className="rounded-3xl bg-white/70 p-4 ring-1 ring-black/5"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100">
        {p.featuredImage?.url ? (
          <img
            src={p.featuredImage.url}
            alt={p.featuredImage.altText || p.title}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{p.title}</div>
          <div className="mt-1 text-xs text-neutral-600">
            {/* İstersen açıklamayı sonra bağlarız */}
            Best seller vibe ✨
          </div>
        </div>
        <div className="text-sm font-semibold">
          {p.priceRange?.minVariantPrice?.amount}{" "}
          {p.priceRange?.minVariantPrice?.currencyCode}
        </div>
      </div>

      <Link
  href={`/products/${p.handle}`}
  className="mt-4 block w-full rounded-2xl bg-black py-3 text-center text-sm font-medium text-white hover:opacity-90"
>
  View details
</Link>

    </div>
  ))}
</div>

      </section>

      <footer className="border-t border-black/5 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Forever</div>
<div className="flex flex-wrap gap-4">
  <Link className="hover:underline" href="/shipping">Shipping</Link>
  <Link className="hover:underline" href="/returns">Returns</Link>
  <Link className="hover:underline" href="/contact">Contact</Link>
  <Link className="hover:underline" href="/privacy">Privacy</Link>
</div>

        </div>
      </footer>
    </main>
  );
}
