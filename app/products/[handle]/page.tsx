import { getProductByHandle, createCartAndGetCheckoutUrl } from "@/lib/shopify";
import { redirect } from "next/navigation";
import Link from "next/link";
import BuyBox from "./BuyBox";


type Params = { handle: string };

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { handle } = await params;

  if (!handle) {
    return (
      <main className="min-h-screen bg-[#fff7fb] text-neutral-900">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="rounded-3xl bg-white/70 p-8 ring-1 ring-black/5 backdrop-blur">
            <h1 className="text-2xl font-semibold">Invalid product handle</h1>
            <p className="mt-2 text-neutral-600">Missing product handle in URL.</p>
            <Link
              className="mt-6 inline-block text-sm font-medium text-rose-700 hover:underline"
              href="/"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const product = await getProductByHandle(handle);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fff7fb] text-neutral-900">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="rounded-3xl bg-white/70 p-8 ring-1 ring-black/5 backdrop-blur">
            <h1 className="text-2xl font-semibold">Product not found</h1>
            <p className="mt-2 text-neutral-600">No product for this handle.</p>
            <Link
              className="mt-6 inline-block text-sm font-medium text-rose-700 hover:underline"
              href="/"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const media = product.media?.edges?.map((e: any) => e.node) ?? [];
  const variants = product.variants?.edges?.map((e: any) => e.node) ?? [];
  const firstVariant = variants[0];

  // Normalize media to show later in gallery section
  const normalized = media
    .map((m: any) => {
      if (m.mediaContentType === "IMAGE" && m.image?.url) {
        return {
          kind: "image" as const,
          key: m.id ?? m.image.url,
          thumb: m.image.url,
          src: m.image.url,
          alt: m.image.altText || m.alt || product.title,
        };
      }
      if (m.mediaContentType === "VIDEO" && m.sources?.[0]?.url) {
        const srcObj =
          m.sources.find((s: any) => s.mimeType?.includes("mp4")) ?? m.sources[0];
        return {
          kind: "video" as const,
          key: m.id ?? srcObj.url,
          thumb: m.previewImage?.url ?? "",
          src: srcObj.url,
          mime: srcObj.mimeType || "video/mp4",
        };
      }
      if (m.mediaContentType === "EXTERNAL_VIDEO" && m.embedUrl) {
        return {
          kind: "external" as const,
          key: m.id ?? m.embedUrl,
          thumb: m.previewImage?.url ?? "",
          src: m.embedUrl,
        };
      }
      return null;
    })
    .filter(Boolean);

  const heroImage =
    (normalized.find((m: any) => m.kind === "image") as any) ||
    (product.featuredImage?.url
      ? {
          kind: "image" as const,
          key: product.featuredImage.url,
          src: product.featuredImage.url,
          alt: product.featuredImage.altText || product.title,
        }
      : null);

  async function buyNowAction(formData: FormData) {
    "use server";
    const variantId = String(formData.get("variantId") || "");
    const qty = Number(formData.get("quantity") || 1);
    if (!variantId) return;

    const checkoutUrl = await createCartAndGetCheckoutUrl(variantId, qty);
    redirect(checkoutUrl);
  }

  return (
    <main className="min-h-screen bg-[#fff7fb] text-neutral-900">
      {/* Top bar */}
      <div className="border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link href="/" className="font-semibold tracking-tight">
            Forever
          </Link>
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <span className="hidden sm:inline">Problem-solving finds ✨</span>
            <Link
              className="rounded-full bg-black px-4 py-2 text-white hover:opacity-90"
              href="/#shop"
            >
              Back to shop
            </Link>
          </div>
        </div>
      </div>

      {/* Background blobs */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-pink-300/35 blur-3xl" />
          <div className="absolute right-0 top-10 h-96 w-96 rounded-full bg-rose-400/25 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-fuchsia-300/15 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 py-10">
          {/* HERO (Buy now üstte, resim küçük yanında) */}
          <div className="rounded-3xl bg-white/70 p-4 ring-1 ring-black/5 backdrop-blur md:p-6">
            <div className="grid items-start gap-6 md:grid-cols-[240px,1fr]">
              {/* Small hero image */}
              <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-black/5">
                <div className="aspect-square bg-gradient-to-br from-pink-50 to-rose-50">
                  {heroImage?.kind === "image" ? (
                    <img
                      src={heroImage.src}
                      alt={heroImage.alt || product.title}
                      className="h-full w-full object-contain p-4"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-neutral-500">
                      No image
                    </div>
                  )}
                </div>
              </div>

              {/* Main info + CTA */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-neutral-700 ring-1 ring-black/5">
                  💗 Forever pick
                  <span className="rounded-full bg-pink-100 px-2 py-0.5 text-pink-700">
                    In stock
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  {product.title}
                </h1>

                {firstVariant?.price ? (
                  <div className="mt-3 flex flex-wrap items-baseline gap-2">
                    <div className="text-2xl font-semibold">
                      {firstVariant.price.amount} {firstVariant.price.currencyCode}
                    </div>
                    <div className="text-sm text-neutral-500 line-through opacity-60">
                      {(Number(firstVariant.price.amount) * 1.25).toFixed(2)}
                    </div>
                    <div className="text-sm font-medium text-rose-700">-20%</div>
                  </div>
                ) : null}

                {/* Short description preview (üstte kısa, aşağıda full) */}
                <p className="mt-4 text-sm text-neutral-600">
                  Fast checkout • Secure payment • Quick support
                </p>

                {/* BIG CTA (üstte) */}
                <BuyBox variants={variants} action={buyNowAction} />


                <p className="mt-2 text-xs text-neutral-500">
                  Redirects to Shopify Checkout (card / Apple Pay / Shop Pay depending on availability).
                </p>

                <Link
                  href="/#shop"
                  className="mt-4 inline-block text-sm font-medium text-rose-700 hover:underline"
                >
                  ← Continue shopping
                </Link>
              </div>
            </div>

            {/* Trust cards */}
            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-neutral-700 sm:grid-cols-3">
              {[
                ["Fast checkout", "Shopify payment"],
                ["Support", "Quick replies"],
                ["Secure", "SSL & payment"],
              ].map(([t, s]) => (
                <div key={t} className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5">
                  <div className="font-semibold">{t}</div>
                  <div className="mt-1 text-neutral-600">{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DETAILS + GALLERY ALTA */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Description (full) */}
            <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-black/5 backdrop-blur">
              <h2 className="text-lg font-semibold">Details</h2>

              {product.descriptionHtml ? (
                <div
                  className="prose prose-sm mt-4 max-w-none prose-p:text-neutral-700"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : (
                <p className="mt-4 text-neutral-600">No description.</p>
              )}
            </div>

            {/* Gallery */}
            <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-black/5 backdrop-blur">
              <h2 className="text-lg font-semibold">Gallery</h2>

              {normalized.length ? (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {normalized.slice(0, 12).map((m: any) => (
                    <div
                      key={m.key}
                      className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5"
                    >
                      <div className="aspect-square bg-gradient-to-br from-pink-50 to-rose-50">
                        {m.kind === "image" ? (
                          <img
                            src={m.src}
                            alt={m.alt || product.title}
                            className="h-full w-full object-cover"
                          />
                        ) : m.kind === "video" ? (
                          <video
                            className="h-full w-full object-cover"
                            controls
                            playsInline
                            preload="metadata"
                            poster={m.thumb || undefined}
                          >
                            <source src={m.src} type={m.mime || "video/mp4"} />
                          </video>
                        ) : (
                          <iframe
                            className="h-full w-full"
                            src={m.src}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={product.title}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-neutral-600">No media.</p>
              )}
            </div>
          </div>

          {/* small blobs */}
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-3xl bg-pink-400/20 blur-2xl" />
          <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-3xl bg-rose-400/20 blur-2xl" />
        </div>
      </section>
    </main>
  );
}
