import Link from "next/link";
import { Menu, ShieldCheck } from "lucide-react";
import { nav, policies } from "@/lib/content";

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
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.slice(0, 7).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <Link className="button button-small" href="/submit-experience">Share your experience</Link>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><Menu size={22} /></summary>
          <nav>{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<Link className="button" href="/submit-experience">Share your experience</Link></nav>
        </details>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div><Link className="brand footer-brand" href="/"><span className="brand-mark"><ShieldCheck size={20} /></span><span><strong>Clear Terms</strong><small>Independent awareness platform</small></span></Link><p>This website is an independent consumer awareness platform. It is not affiliated with or endorsed by Make Your Brand Business Service LLC.</p></div>
        <div><h3>Explore</h3>{nav.slice(1, 7).map(([l,h]) => <Link key={h} href={h}>{l}</Link>)}</div>
        <div><h3>Policies</h3>{policies.slice(0, 6).map(([l,s]) => <Link key={s} href={`/policies/${s}`}>{l}</Link>)}</div>
        <div><h3>Participate</h3><Link href="/submit-experience">Submit an experience</Link><Link href="/company-response">Company response</Link><Link href="/contact">Contact & corrections</Link><Link href="/admin">Admin</Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Clear Terms. Independent and non-affiliated.</span><span>Template content requires UAE legal review before launch.</span></div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="page-hero"><div className="container narrow"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p className="lede">{intro}</p></div></section>;
}
