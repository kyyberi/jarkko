import { Arrow, PageShell, sitePath } from "./site";

export default function NotFound() {
  return (
    <PageShell>
      <section className="detail-hero editorial">
        <div>
          <div className="section-kicker">404</div>
          <h1>This page is not built yet.</h1>
          <p>
            The site is expanding from a one-page portfolio into a small static
            professional website. The page you requested is not available.
          </p>
          <a className="button primary" href={sitePath("/")}>
            Return home <Arrow />
          </a>
        </div>
      </section>
    </PageShell>
  );
}
