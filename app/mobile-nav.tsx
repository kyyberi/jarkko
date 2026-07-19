"use client";

import { useEffect, useRef, useState } from "react";

const assetPath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function sitePath(path: string) {
  return `${assetPath}${path}`;
}

const links = [
  { href: "/#work", label: "Work" },
  { href: "/insights/articles", label: "Insights" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="mobile-nav" ref={navRef}>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="mobile-menu-button"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        aria-label="Mobile primary"
        className="mobile-menu"
        hidden={!isOpen}
        id="mobile-navigation"
      >
        {links.map((link) => (
          <a
            href={sitePath(link.href)}
            key={link.href}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
