import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { policies } from "@/lib/content";

const simpleNav = [
  ["My story", "/#my-story"],
  ["Both sides", "/#both-sides"],
  ["What I learned", "/#lessons"],
] as const;

export function Header() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="notice">Independent consumer awareness platform · Not affiliated with Make Your Brand Business Service LLC</div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Clear Terms home">
          <span className="brand-mark"><ShieldCheck size={20} /></span>
          <span><strong>Clear Terms</strong><small>Customer experience & awareness</small></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">{simpleNav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
        <Link className="button button-small" href="/#share">Share your experience</Link>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-grid one-page-footer">
        <div><Link className="brand footer-brand" href="/"><span className="brand-mark"><ShieldCheck size={20} /></span><span><strong>Clear Terms</strong><small>Independent awareness platform</small></span></Link><p>This website is an independent consumer awareness platform. It is not affiliated with or endorsed by Make Your Brand Business Service LLC.</p></div>
        <div><h3>On this page</h3>{simpleNav.map(([l,h]) => <Link key={h} href={h}>{l}</Link>)}<Link href="/#share">Share your experience</Link></div>
        <div><h3>Important</h3><Link href="/company-response">Company response</Link><Link href="/contact">Corrections & contact</Link>{policies.slice(0, 2).map(([l,s]) => <Link key={s} href={`/policies/${s}`}>{l}</Link>)}</div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Clear Terms. Independent and non-affiliated.</span><span>Template content requires UAE legal review before launch.</span></div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="page-hero"><div className="container narrow"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p className="lede">{intro}</p></div></section>;
}
