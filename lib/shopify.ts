const domain = process.env.SHOPIFY_STORE_DOMAIN;
const tokenEnv = process.env.SHOPIFY_STOREFRONT_TOKEN;
const version = process.env.SHOPIFY_API_VERSION || "2024-10";

if (!domain) throw new Error("Missing SHOPIFY_STORE_DOMAIN in .env.local");
if (!tokenEnv) throw new Error("Missing SHOPIFY_STOREFRONT_TOKEN in .env.local");

const token: string = tokenEnv; // ✅ artık string

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const url = `https://${domain}/api/${version}/graphql.json`;


  const headers: HeadersInit = {
  "Content-Type": "application/json",
  "X-Shopify-Storefront-Access-Token": token,
  Accept: "application/json",
};


const res = await fetch(url, {
  method: "POST",
  headers, // 👈 burada artık sorun yok
  body: JSON.stringify({ query, variables }),
  cache: "no-store",
});



  const raw = await res.text();

  let json: any;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error(`Shopify non-JSON response: ${raw.slice(0, 200)}`);
  }

  if (!res.ok || json?.errors) {
    const msg =
      json?.errors?.[0]?.message ||
      json?.error ||
      `HTTP ${res.status} ${res.statusText}`;
    throw new Error(`Shopify API error: ${msg}`);
  }

  return json.data as T;
}

export async function getProductListings(first = 6) {
  const query = `
    query Products($first: Int!) {
      products(first: $first, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            featuredImage { url altText }
            priceRange {
              minVariantPrice { amount currencyCode }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    products: { edges: { node: any }[] };
  }>(query, { first });

  return data.products.edges.map((e) => e.node);
}

export async function getProductByHandle(handle: string) {
  const query = `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle

        descriptionHtml

        featuredImage {
          url
          altText
        }

        # Eski "images" dursun (fallback için)
        images(first: 12) {
          edges {
            node {
              url
              altText
            }
          }
        }

        # Video / external video için kritik alan
        media(first: 12) {
          edges {
            node {
              mediaContentType
              alt

              ... on MediaImage {
                image {
                  url
                  altText
                }
              }

              ... on Video {
                previewImage {
                  url
                }
                sources {
                  url
                  mimeType
                }
              }

              ... on ExternalVideo {
                embedUrl
                previewImage {
                  url
                }
              }
            }
          }
        }

        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions { name value }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    productByHandle: any;
  }>(query, { handle });

  return data.productByHandle;
}



export async function createCartAndGetCheckoutUrl(variantId: string, quantity = 1) {
  const query = `
    mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
        }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string };
      userErrors: { field: string[] | null; message: string }[];
    };
  }>(query, { lines: [{ merchandiseId: variantId, quantity }] });

  const errs = data.cartCreate.userErrors;
  if (errs?.length) throw new Error(errs[0].message);

  return data.cartCreate.cart.checkoutUrl;
}

