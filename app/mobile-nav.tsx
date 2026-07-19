"use client";

import { useState } from "react";

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

  return (
    <div className="mobile-nav">
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
