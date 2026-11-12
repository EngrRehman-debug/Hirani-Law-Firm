"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { ChevronCentered, ChevronDown } from "@/components/ui/Icons";
import NavLink from "@/components/ui/NavLink";
import { isLocale } from "@/content";
import { HIDDEN } from "@/lib/hidden";
import { switchLocale, useContent } from "@/content/client";
import navLinkStyles from "@/components/ui/NavLink.module.css";
import styles from "./Navbar.module.css";

/**
 * Fixed site header.
 * - "Transparent" variant while the dark hero is behind it, "Light" (white) variant once the
 *   page has scrolled past the first viewport.
 * - Slides up out of view while scrolling down and back in when scrolling up.
 * - Below 1280px it collapses into a hamburger that opens a full-screen menu.
 */
export default function Navbar() {
  const { site, meta } = useContent();
  const { nav, logo } = site;
  // template-only Case Studies link, shown while the section is enabled (src/lib/hidden.ts), before Blog
  const NAV_LINKS = HIDDEN.caseStudies
    ? nav.links
    : nav.links.flatMap((l) =>
        l.href === "/blog" ? [{ label: meta.pageTitles.caseStudies, href: "/case-studies", children: [] }, l] : [l],
      );
  const LOGO_LIGHT = logo.light; // logo for dark backgrounds
  const LOGO_DARK = logo.dark; // logo for light backgrounds
  const lang = nav.languageSwitch;
  const onSwitchLanguage = () => {
    if (isLocale(lang.target)) switchLocale(lang.target);
  };
  const pathname = usePathname();
  const [light, setLight] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  /** mobile menu: which parent's sub-links are expanded (accordion, one at a time) */
  const [expanded, setExpanded] = useState<string | null>(null);
  /** desktop: a dropdown closes after one of its links is clicked, until the pointer leaves it */
  const [closedMenu, setClosedMenu] = useState<string | null>(null);
  const closeDropdown = (href: string) => {
    setClosedMenu(href);
    (document.activeElement as HTMLElement | null)?.blur();
  };
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Transparent while the page's dark hero (marked with data-nav-hero) is behind the bar.
      const hero = document.querySelector<HTMLElement>("[data-nav-hero]");
      setLight(!hero || y >= hero.offsetHeight - 30);
      const delta = y - lastY.current;
      if (Math.abs(delta) > 2) {
        setHidden(delta > 0 && y > 120);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // close the mobile menu on navigation (state adjusted during render, no effect needed)
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
    setExpanded(null);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname === href);
  /** a parent link is marked current on its own page and on any of its dropdown pages */
  const inSection = (l: (typeof NAV_LINKS)[number]) => isCurrent(l.href) || l.children.some((c) => isCurrent(c.href));
  const variant = light && !open ? "light" : "transparent";
  const tone = variant === "light" ? "dark" : "light";

  return (
    <div className={`${styles.shell} ${hidden && !open ? styles.hidden : ""}`}>
      <nav className={`${styles.nav} ${styles[variant]} ${open ? styles.open : ""}`} aria-label={nav.ariaLabel}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink} aria-label={logo.homeLabel}>
              <Image
                src={variant === "light" ? LOGO_DARK : LOGO_LIGHT}
                alt={logo.alt}
                width={105}
                height={28}
                priority
              />
            </Link>
            <button
              type="button"
              className={`${navLinkStyles.link} ${navLinkStyles[variant === "light" ? "dark" : "light"]} ${styles.langSwitch} ${styles.langMobile}`}
              aria-label={lang.ariaLabel}
              onClick={onSwitchLanguage}
            >
              {lang.label}
            </button>
            <button
              type="button"
              className={styles.burger}
              aria-label={open ? nav.closeMenu : nav.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </button>
          </div>

          <ul className={styles.links}>
            {NAV_LINKS.map((l) =>
              l.children.length > 0 ? (
                <li
                  key={l.href}
                  className={`${styles.hasMenu} ${closedMenu === l.href ? styles.menuClosed : ""}`}
                  onMouseLeave={() => setClosedMenu((cur) => (cur === l.href ? null : cur))}
                  // any link in the item (the parent label or a dropdown page) closes the dropdown
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("a")) closeDropdown(l.href);
                  }}
                >
                  <NavLink href={l.href} current={inSection(l)} tone={tone}>
                    {l.label}
                  </NavLink>
                  <ChevronDown className={`${styles.chevron} ${tone === "light" ? styles.chevronOnDark : styles.chevronOnLight}`} width={28} height={28} aria-hidden />
                  {/* dropdown opens on hover / keyboard focus */}
                  <div className={styles.dropdown}>
                    <ul className={styles.dropdownList}>
                      {l.children.map((c) => (
                        <li key={c.href}>
                          <NavLink href={c.href} current={isCurrent(c.href)} tone="dark">
                            {c.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={l.href}>
                  <NavLink href={l.href} current={isCurrent(l.href)} tone={tone}>
                    {l.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          <div className={styles.cta}>
            <button
              type="button"
              className={`${navLinkStyles.link} ${navLinkStyles[variant === "light" ? "dark" : "light"]} ${styles.langSwitch}`}
              aria-label={lang.ariaLabel}
              onClick={onSwitchLanguage}
            >
              {lang.label}
            </button>
            <Button href={nav.cta.href} variant={variant === "light" ? "fillDark" : "fillLight"} arrow>
              {nav.cta.label}
            </Button>
          </div>

          {/* Mobile menu content */}
          <div className={styles.mobileMenu} aria-hidden={!open}>
            <ul className={styles.mobileLinks}>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <div className={styles.mobileRow}>
                    {/* the label goes to the page; the arrow opens the sub-links */}
                    <Link
                      href={l.href}
                      className={styles.mobileLink}
                      aria-current={isCurrent(l.href) ? "page" : undefined}
                      tabIndex={open ? 0 : -1}
                    >
                      {l.label}
                    </Link>
                    {l.children.length > 0 && (
                      <button
                        type="button"
                        className={`${styles.mobileToggle} ${expanded === l.href ? styles.mobileToggleOpen : ""}`}
                        aria-expanded={expanded === l.href}
                        aria-label={l.label}
                        tabIndex={open ? 0 : -1}
                        onClick={() => setExpanded((cur) => (cur === l.href ? null : l.href))}
                      >
                        <ChevronCentered width={22} height={22} aria-hidden />
                      </button>
                    )}
                  </div>
                  {l.children.length > 0 && expanded === l.href && (
                    <ul className={styles.mobileSubLinks}>
                      {l.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={styles.mobileSubLink}
                            aria-current={isCurrent(c.href) ? "page" : undefined}
                            tabIndex={open ? 0 : -1}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className={styles.mobileCta}>
              <p className={styles.mobileCtaTitle}>{nav.mobileTitle}</p>
              <p className={styles.mobileCtaText}>{nav.mobileText}</p>
              <Button href={nav.cta.href} variant="fillLight" arrow compactFrom="never">
                {nav.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
