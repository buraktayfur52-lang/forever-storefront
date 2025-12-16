import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fff7fb] text-neutral-900">
      <div className="border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link href="/" className="font-semibold tracking-tight">Forever</Link>
          <Link className="rounded-full bg-black px-4 py-2 text-white hover:opacity-90" href="/#shop">
            Shop
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5 py-12">
        <div className="rounded-3xl bg-white/70 p-8 ring-1 ring-black/5 backdrop-blur">
          <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
          <p className="mt-2 text-sm text-neutral-700">
            Questions, shipping help, or wholesale? Send us a message.
          </p>

          <form
            className="mt-6 grid gap-4"
            action="mailto:YOUR_EMAIL_HERE?subject=Forever%20Support"
            method="post"
            encType="text/plain"
          >
            <input
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-black/10 outline-none"
              name="name"
              placeholder="Your name"
            />
            <input
              className="w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-black/10 outline-none"
              name="email"
              placeholder="Your email"
            />
            <textarea
              className="min-h-[140px] w-full rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-black/10 outline-none"
              name="message"
              placeholder="Your message"
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-black py-4 text-base font-semibold text-white hover:opacity-90"
            >
              Send message
            </button>

            <p className="text-xs text-neutral-500">
              This opens your email app to send the message.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
