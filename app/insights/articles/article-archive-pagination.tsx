"use client";

import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 2;

type ArticleArchiveItem = {
  slug: string;
  href: string;
  category: string;
  date: string;
  title: string;
  summary: string;
};

type ArticleArchivePaginationProps = {
  articles: ArticleArchiveItem[];
};

function pageFromSearch(totalPages: number) {
  if (typeof window === "undefined") return 1;

  const page = Number.parseInt(
    new URLSearchParams(window.location.search).get("page") ?? "1",
    10,
  );

  if (!Number.isFinite(page)) return 1;
  return Math.min(Math.max(page, 1), totalPages);
}

export function ArticleArchivePagination({
  articles,
}: ArticleArchivePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const syncPage = () => setCurrentPage(pageFromSearch(totalPages));
    syncPage();
    window.addEventListener("popstate", syncPage);
    return () => window.removeEventListener("popstate", syncPage);
  }, [totalPages]);

  const visibleArticles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return articles.slice(start, start + PAGE_SIZE);
  }, [articles, currentPage]);

  const changePage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    const search = nextPage === 1 ? "" : `?page=${nextPage}`;
    const nextUrl = `${window.location.pathname}${search}#article-archive`;
    window.history.pushState({}, "", nextUrl);
    setCurrentPage(nextPage);
  };

  const pageHref = (page: number) =>
    page === 1 ? "#article-archive" : `?page=${page}#article-archive`;

  return (
    <div className="article-archive-paged" id="article-archive">
      <div className="article-index article-archive-list" aria-live="polite">
        {visibleArticles.map((article) => (
          <a
            className="article-card article-archive-card"
            href={article.href}
            key={article.slug}
          >
            <span className="article-card-meta">
              {`${article.category} / ${article.date}`}
            </span>
            <strong>{article.title}</strong>
            <p>{article.summary}</p>
            <em>
              Read article <span aria-hidden="true">{"->"}</span>
            </em>
          </a>
        ))}
      </div>

      {totalPages > 1 ? (
        <nav className="article-pagination" aria-label="Article pages">
          {currentPage > 1 ? (
            <a
              href={pageHref(currentPage - 1)}
              onClick={(event) => {
                event.preventDefault();
                changePage(currentPage - 1);
              }}
            >
              Previous
            </a>
          ) : (
            <span aria-disabled="true">Previous</span>
          )}

          <span className="article-pagination-status">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <a
              href={pageHref(currentPage + 1)}
              onClick={(event) => {
                event.preventDefault();
                changePage(currentPage + 1);
              }}
            >
              Next
            </a>
          ) : (
            <span aria-disabled="true">Next</span>
          )}
        </nav>
      ) : null}
    </div>
  );
}
