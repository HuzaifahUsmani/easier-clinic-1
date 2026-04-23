import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <Link href="/" className="font-medium tracking-tight text-lg">
            Easier<span className="serif italic">clinic</span>
          </Link>
          <p className="mt-4 text-sm text-muted max-w-xs leading-relaxed">
            Operations support for Australian clinics. Sydney, Melbourne,
            Brisbane.
          </p>
          <p className="mt-4 text-sm">
            <a href="mailto:hello@easierclinic.com.au" className="link-underline">
              hello@easierclinic.com.au
            </a>
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs text-muted mb-3">Product</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/how-it-works" className="hover:underline">How it works</Link></li>
            <li><Link href="/who-its-for" className="hover:underline">Who it&apos;s for</Link></li>
            <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
            <li><Link href="/compliance" className="hover:underline">Compliance</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-xs text-muted mb-3">Get started</div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/book" className="hover:underline">Free diagnostic &mdash; 60 min</Link></li>
            <li><Link href="/pricing#land-offers" className="hover:underline">Starter offers</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs text-muted">
          <div>© {new Date().getFullYear()} Easierclinic</div>
          <div>Privacy Act 1988 compliant &middot; Registered in Australia</div>
        </div>
      </div>
    </footer>
  );
}
