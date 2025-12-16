import Link from "next/link";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#fff7fb] text-neutral-900">
      <div className="mx-auto max-w-3xl px-5 py-12">
        <Link href="/" className="text-sm font-medium text-rose-700 hover:underline">← Back</Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Shipping</h1>
        <p className="mt-4 text-neutral-700">
          We ship worldwide. Delivery times and costs are shown at checkout.
        </p>
        <ul className="mt-4 list-disc pl-5 text-neutral-700">
          <li>Processing time: 3–7 business days</li>
          <li>Tracking is provided when available</li>
          <li>Customs fees (if any) are paid by the buyer</li>
        </ul>
      </div>
    </main>
  );
}
