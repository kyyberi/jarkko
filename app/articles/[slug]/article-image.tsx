"use client";

import { useEffect, useRef, useState } from "react";

type ArticleImageProps = {
  alt: string;
  caption?: string;
  src: string;
};

export function ArticleImage({ alt, caption, src }: ArticleImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-label={`Open larger image: ${alt}`}
        className="article-image-button"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <img src={src} alt={alt} />
      </button>
      {caption ? <figcaption>{caption}</figcaption> : null}
      {isOpen ? (
        <div
          aria-modal="true"
          className="article-image-modal"
          onClick={() => setIsOpen(false)}
          role="dialog"
        >
          <div
            className="article-image-modal-frame"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Close enlarged image"
              className="article-image-modal-close"
              onClick={() => setIsOpen(false)}
              ref={closeButtonRef}
              type="button"
            >
              X
            </button>
            <img src={src} alt={alt} />
            {caption ? <p>{caption}</p> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
