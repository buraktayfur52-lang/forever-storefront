"use client";

import { useMemo, useState } from "react";

type Variant = {
  id: string;
  title?: string;
  availableForSale?: boolean;
  price?: { amount: string; currencyCode: string };
  selectedOptions?: { name: string; value: string }[];
};

export default function BuyBox({
  variants,
  action,
}: {
  variants: Variant[];
  action: (formData: FormData) => void;
}) {
  const available = useMemo(
    () => (variants || []).filter((v) => v?.id && v?.availableForSale !== false),
    [variants]
  );

  // Shopify options => { Color: ["Pink","Red"], Size: ["S","M"] ...}
  const optionMap = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    for (const v of available) {
      for (const opt of v.selectedOptions || []) {
        if (!map[opt.name]) map[opt.name] = new Set();
        map[opt.name].add(opt.value);
      }
    }
    const out: Record<string, string[]> = {};
    for (const k of Object.keys(map)) out[k] = Array.from(map[k]);
    return out;
  }, [available]);

  const optionNames = useMemo(() => Object.keys(optionMap), [optionMap]);

  // default selections: first available variant's options
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const first = available[0];
    const init: Record<string, string> = {};
    for (const name of optionNames) {
      const v =
        first?.selectedOptions?.find((o) => o.name === name)?.value ??
        optionMap[name]?.[0] ??
        "";
      init[name] = v;
    }
    return init;
  });

  const selectedVariant = useMemo(() => {
    // find variant that matches ALL selected options
    const match = available.find((v) => {
      const opts = v.selectedOptions || [];
      return optionNames.every((name) => {
        const val = selected[name];
        if (!val) return true;
        return opts.some((o) => o.name === name && o.value === val);
      });
    });
    return match || available[0] || null;
  }, [available, optionNames, selected]);

  const showOptions = optionNames.length > 0;

  return (
    <div className="mt-6 rounded-3xl bg-white/70 p-5 ring-1 ring-black/5">
      {/* OPTIONS */}
      {showOptions ? (
        <div className="grid gap-4">
          {optionNames.map((name) => (
            <div key={name} className="grid gap-2">
              <div className="text-sm font-medium text-neutral-800">{name}</div>
              <select
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-rose-200"
                value={selected[name] || ""}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev, [name]: e.target.value }))
                }
              >
                {(optionMap[name] || []).map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-neutral-600">
          This product has no selectable options.
        </div>
      )}

      {/* PRICE + CTA */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs text-neutral-500">Selected</div>
          <div className="text-sm font-semibold text-neutral-900">
            {selectedVariant?.title || "Default"}
          </div>
        </div>

        {selectedVariant?.price ? (
          <div className="text-right">
            <div className="text-xs text-neutral-500">Price</div>
            <div className="text-base font-semibold text-neutral-900">
              {selectedVariant.price.amount} {selectedVariant.price.currencyCode}
            </div>
          </div>
        ) : null}
      </div>

      <form action={action} className="mt-5">
        <input type="hidden" name="variantId" value={selectedVariant?.id || ""} />
        <input type="hidden" name="quantity" value="1" />

        <button
          type="submit"
          disabled={!selectedVariant?.id}
          className="w-full rounded-2xl bg-black py-4 text-lg font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          Buy now
        </button>

        <div className="mt-2 text-xs text-neutral-500">
          Redirects to Shopify Checkout (Card / Apple Pay / Shop Pay if available).
        </div>
      </form>
    </div>
  );
}
