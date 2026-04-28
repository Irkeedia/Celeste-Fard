"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/story", label: "Story" },
  { href: "/music", label: "Musique" },
  { href: "/shorts", label: "Shorts" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigation principale">
      <ul className="nav-list">
        {LINKS.map((link) => {
          const isActive =
            pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <li key={link.href}>
              <Link className={`nav-link ${isActive ? "active" : ""}`} href={link.href}>
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
