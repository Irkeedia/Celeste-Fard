"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/story", label: "Story" },
  { href: "/music", label: "Musique" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

const MOBILE_QUERY = "(max-width: 1024px)";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export function MainNav() {
  const pathname = usePathname();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isClient = useIsClient();

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  /* Listeners natifs : plus fiables que onClick seul sur iOS / Android */
  useEffect(() => {
    const btn = burgerRef.current;
    if (!btn) return;

    let lastToggle = 0;

    const onToggle = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      const now = Date.now();
      if (now - lastToggle < 400) return;
      lastToggle = now;
      toggleMenu();
    };

    btn.addEventListener("pointerup", onToggle);
    return () => btn.removeEventListener("pointerup", onToggle);
  }, [toggleMenu]);

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
      document.documentElement.style.setProperty(
        "--site-header-h",
        `${Math.round(h * 100) / 100}px`,
      );
    };

    syncHeaderHeight();

    const mq = window.matchMedia(MOBILE_QUERY);
    const onOrientationChange = () => syncHeaderHeight();

    window.addEventListener("orientationchange", onOrientationChange);

    if (mq.matches) {
      return () => window.removeEventListener("orientationchange", onOrientationChange);
    }

    const ro = new ResizeObserver(syncHeaderHeight);
    ro.observe(header);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", onOrientationChange);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", menuOpen);
    return () => document.body.classList.remove("nav-menu-open");
  }, [menuOpen]);

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
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const mobileMenu =
    menuOpen && isClient ? (
      <>
        <div
          className="nav-backdrop is-open"
          aria-hidden={false}
          onPointerUp={closeMenu}
        />
        <nav
          id="primary-navigation"
          aria-label="Navigation principale"
          className="site-nav site-nav--mobile is-open"
        >
          <div className="site-nav-head">
            <Image
              src="/logo_celeste.png"
              alt=""
              width={56}
              height={56}
              className="brand-logo brand-logo--drawer"
            />
            <span className="site-nav-kicker">Explorer</span>
            <span className="site-nav-display">Celeste Fard</span>
          </div>
          <ul className="nav-list nav-list--drawer">
            {LINKS.map((link, index) => (
              <li key={link.href}>
                <Link
                  className={`nav-link nav-link--drawer ${isActivePath(pathname, link.href) ? "active" : ""}`}
                  href={link.href}
                  onClick={closeMenu}
                >
                  <span className="nav-link-index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="nav-link-label">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </>
    ) : null;

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        className="nav-burger"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-haspopup="true"
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <span className="nav-burger-box" aria-hidden>
          <span className="nav-burger-line" />
          <span className="nav-burger-line" />
          <span className="nav-burger-line" />
        </span>
      </button>

      <nav aria-label="Navigation principale" className="site-nav site-nav--desktop">
        <ul className="nav-list">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                className={`nav-link ${isActivePath(pathname, link.href) ? "active" : ""}`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {mobileMenu ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
