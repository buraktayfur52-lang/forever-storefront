import Link from "next/link";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#fff7fb] text-neutral-900">
      <div className="mx-auto max-w-3xl px-5 py-12">
        <Link href="/" className="text-sm font-medium text-rose-700 hover:underline">← Back</Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Returns</h1>
        <p className="mt-4 text-neutral-700">
          If something arrives damaged or incorrect, contact us and we’ll make it right.
        </p>
        <ul className="mt-4 list-disc pl-5 text-neutral-700">
          <li>Contact us within 7 days of delivery</li>
          <li>Include your order number and photos if needed</li>
        </ul>
      </div>
    </main>
  );
}
