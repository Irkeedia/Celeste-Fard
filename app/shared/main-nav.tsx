"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { useT } from "./lang";
import { LangSwitch } from "./lang-switch";
import { T } from "./textes";

const LINKS = [
  { href: "/", label: T.nav.accueil },
  { href: "/music", label: T.nav.musique },
  { href: "/shop", label: T.nav.shop },
  { href: "/contact", label: T.nav.contact },
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
  const t = useT();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const isClient = useIsClient();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    // Le panneau disparait : sans cela le focus retombe sur <body> et la
    // navigation au clavier repart du haut de la page.
    burgerRef.current?.focus();
  }, []);
  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

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
          aria-hidden="true"
          onClick={closeMenu}
        />
        <nav
          id="primary-navigation"
          aria-label="Navigation principale"
          className="site-nav site-nav--mobile is-open"
        >
          {/* Fond : la video du hero, muette et tres assombrie. Elle donne
              au panneau la meme matiere que le reste du site, la ou un
              aplat noir faisait "boite de dialogue". */}
          <span className="site-nav-bg" aria-hidden="true">
            <video
              className="site-nav-video"
              src="/video/celeste-hero-mobile.mp4"
              poster="/image/miniaturehero.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            />
            <span className="site-nav-veil" />
            <span className="site-nav-glow" />
          </span>

          {/* Le burger est recouvert par le panneau : sans cette croix, il
              n'y avait aucun moyen visible de refermer le menu. */}
          <button
            type="button"
            className="site-nav-close"
            onClick={closeMenu}
            aria-label={t(T.nav.fermer)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="site-nav-head">
            <span className="site-nav-kicker">Celeste Fard</span>
            <span className="site-nav-display">{t(T.nav.menu)}</span>
          </div>

          <ul className="nav-list nav-list--drawer">
            {LINKS.map((link, index) => (
              <li
                key={link.href}
                className="nav-drawer-item"
                /* Cascade d'apparition : chaque entree entre un cran apres
                   la precedente. En variable CSS pour que le retard reste
                   pilote par la feuille de style. */
                style={{ "--i": index } as React.CSSProperties}
              >
                <Link
                  className={`nav-link nav-link--drawer ${isActivePath(pathname, link.href) ? "active" : ""}`}
                  href={link.href}
                  onClick={closeMenu}
                >
                  <span className="nav-link-index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="nav-link-label">{t(link.label)}</span>
                  <span className="nav-link-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="site-nav-lang">
            <LangSwitch />
          </div>

          <div className="site-nav-foot">
            <span className="site-nav-foot-line" aria-hidden />
            <span>{t(T.nav.piedMenu)}</span>
          </div>
        </nav>
      </>
    ) : null;

  return (
    <>
      <button
        ref={burgerRef}
        type="button"
        className="nav-burger"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        aria-haspopup="true"
        aria-label={menuOpen ? t(T.nav.fermer) : t(T.nav.ouvrir)}
      >
        <span className="nav-burger-box" aria-hidden>
          <span className="nav-burger-line" />
          <span className="nav-burger-line" />
          <span className="nav-burger-line" />
        </span>
      </button>

      <LangSwitch className="lang-switch--desktop" />

      <nav aria-label="Navigation principale" className="site-nav site-nav--desktop">
        <ul className="nav-list">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                className={`nav-link ${isActivePath(pathname, link.href) ? "active" : ""}`}
                href={link.href}
              >
                {t(link.label)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {mobileMenu ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
