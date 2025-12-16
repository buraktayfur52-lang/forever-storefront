import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fff7fb] text-neutral-900">
      <div className="mx-auto max-w-3xl px-5 py-12">
        <Link href="/" className="text-sm font-medium text-rose-700 hover:underline">← Back</Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Privacy</h1>
        <p className="mt-4 text-neutral-700">
          We only use customer information to process orders and provide support.
          We do not sell your personal data.
        </p>
      </div>
    </main>
  );
}
