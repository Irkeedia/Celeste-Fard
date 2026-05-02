"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/story", label: "Story" },
  { href: "/music", label: "Musique" },
  { href: "/shorts", label: "Shorts" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

const MOBILE_QUERY = "(max-width: 900px)";

export function MainNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const closeIfDesktop = () => {
      if (!mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  useEffect(() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const syncHeaderHeight = () => {
      const h = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--site-header-h", `${Math.round(h * 100) / 100}px`);
    };

    syncHeaderHeight();
    const ro = new ResizeObserver(syncHeaderHeight);
    ro.observe(header);
    window.addEventListener("orientationchange", syncHeaderHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", syncHeaderHeight);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia(MOBILE_QUERY);
    if (!mq.matches) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <button
        type="button"
        className="nav-burger"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <span className="nav-burger-box" aria-hidden>
          <span className="nav-burger-line" />
          <span className="nav-burger-line" />
          <span className="nav-burger-line" />
        </span>
      </button>

      <div
        className={`nav-backdrop ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />

      <nav
        id="primary-navigation"
        aria-label="Navigation principale"
        className={`site-nav ${menuOpen ? "is-open" : ""}`}
      >
        <ul className="nav-list">
          {LINKS.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <li key={link.href}>
                <Link
                  className={`nav-link ${isActive ? "active" : ""}`}
                  href={link.href}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
