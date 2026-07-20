import {
  Arrow,
  Footer,
  Header,
  assetPath,
  sitePath,
  workItems,
} from "./site";
import { getArticles } from "./articles";

export default function Home() {
  const articles = getArticles();

  return (
    <div className="shell">
      <Header />

      <main>
        <section className="hero" id="about">
          <div className="hero-copy">
            <div>
              <div className="eyebrow">Jarkko Moilanen, PhD</div>
              <h1>
                Building the operating system for{" "}
                <span className="accent">data and AI products</span>
              </h1>
              <p className="hero-lede">
                I connect strategy, data, standards, software, and delivery.
                The result is a practical system for creating products that
                organizations trust and leaders understand.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#work">
                  Explore my work <Arrow />
                </a>
                <a className="button" href="#insights">
                  Read my thinking <Arrow />
                </a>
              </div>
            </div>
            <div className="availability">
              <span className="dot" />
              <span>
                Available for a limited number of advisory, workshop, and
                strategic review engagements alongside current leadership
                commitments.
              </span>
            </div>
          </div>

          <div className="hero-portrait">
            <img
              src={`${assetPath}/images/jarkko-hero-abudhabi-2026.jpeg`}
              alt="Portrait of Jarkko Moilanen"
            />
            <div className="hero-portrait-badge">
              <div className="hero-portrait-label">
                Data product pioneer, standards maintainer, builder, author,
                and educator from Finland, based in Abu Dhabi, UAE since 2022.
              </div>
              <span className="uae-flag" role="img" aria-label="UAE flag" />
            </div>
          </div>
        </section>

        <section className="credibility-band" aria-label="Executive credibility">
          <div className="credibility-item">
            <span>Result</span>
            <strong>270% delivery speed improvement</strong>
          </div>
          <div className="credibility-item">
            <span>Scale</span>
            <strong>
              2.5M+ users served through national digital infrastructure
            </strong>
          </div>
          <div className="credibility-item">
            <span>Leadership</span>
            <strong>Whole-of-government data and AI product work</strong>
          </div>
        </section>

        <section className="section">
          <div className="section-head">
            <div className="section-kicker">Current focus</div>
            <h2 className="section-title">
              Three areas. One professional body of work.
            </h2>
          </div>
          <div className="focus-grid">
            <article className="focus-item">
              <div>
                <div className="focus-number">01</div>
                <h3>Government-wide AI products</h3>
                <p>
                  Leading business-led AI product portfolios, entity
                  collaboration, data readiness, governance, and delivery in Abu
                  Dhabi.
                </p>
              </div>
              <a className="text-link" href={sitePath("/work/government-ai")}>
                Explore government AI <Arrow />
              </a>
            </article>
            <article className="focus-item">
              <div>
                <div className="focus-number">02</div>
                <h3>Maysano</h3>
                <p>
                  Building the operational platform and Portfolio Studio for
                  creating, governing, and scaling data product portfolios.
                </p>
              </div>
              <a className="text-link" href={sitePath("/work/maysano")}>
                Explore Maysano <Arrow />
              </a>
            </article>
            <article className="focus-item">
              <div>
                <div className="focus-number">03</div>
                <h3>Open standards and SDK</h3>
                <p>
                  Maintaining the Open Data Product ecosystem and developer
                  tooling under the Linux Foundation.
                </p>
              </div>
              <a
                className="text-link"
                href={sitePath("/work/standards-and-sdk")}
              >
                Explore standards and SDK <Arrow />
              </a>
            </article>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-head">
            <div className="section-kicker">Selected work</div>
            <h2 className="section-title">Built in public, tested in practice.</h2>
          </div>
          <div className="work-list">
            {workItems.map((item) => (
              <article className="work-row" key={item.slug}>
                <div className="work-index">{item.index}</div>
                <div className="work-copy">
                  <div className="work-label">{item.label}</div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <a className="text-link" href={sitePath(`/work/${item.slug}`)}>
                    {item.cta} <Arrow />
                  </a>
                </div>
                <div className="work-visual">
                  <img src={`${assetPath}${item.image}`} alt={item.imageAlt} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="insights">
          <div className="section-head">
            <div className="section-kicker">Insights</div>
            <h2 className="section-title">
              Writing, books, and courses from the work itself.
            </h2>
          </div>
          <div className="insights-layout">
            <div className="article-list">
              {articles.map((article) => (
                <a
                  className="article-row"
                  href={sitePath(`/insights/articles/${article.slug}`)}
                  key={article.slug}
                >
                  <span className="article-date">{article.date}</span>
                  <span className="article-title">{article.title}</span>
                  <span className="article-arrow">{"->"}</span>
                </a>
              ))}
            </div>
            <div className="media-stack">
              <a
                className="media-item"
                href="https://www.udemy.com/user/jarkko-moilanen/"
              >
                <div className="media-logo">
                  <img src={`${assetPath}/images/logo-udemy.png`} alt="Udemy" />
                </div>
                <div>
                  <strong>Udemy courses</strong>
                  <span>View the complete course listing</span>
                </div>
              </a>
              <a
                className="media-item"
                href="https://us.amazon.com/stores/Jarkko-Moilanen/author/B0B66HTHLM?ref=ap_rdr&shoppingPortalEnabled=true"
              >
                <div className="media-logo">
                  <img
                    src={`${assetPath}/images/logo-amazon.png`}
                    alt="Amazon"
                  />
                </div>
                <div>
                  <strong>Amazon author profile</strong>
                  <span>View books and author details</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="cta" id="contact">
          <div className="cta-main">
            <small>Selective availability</small>
            <h2>Bring me the problem that needs senior attention.</h2>
            <div className="cta-lead">Discuss an engagement <Arrow /></div>
            <div className="cta-channels" aria-label="Contact channels">
              <a href="https://www.linkedin.com/in/jarkkomoilanen/">
                Contact in LinkedIn <Arrow />
              </a>
              <a href="https://wa.me/971509718065">
                Send a WhatsApp message <Arrow />
              </a>
            </div>
          </div>
          <div className="cta-side">
            <p>
              Current availability suits executive advisory, workshops,
              portfolio reviews, architecture reviews, and clearly scoped
              strategic assignments.
            </p>
            <div className="location">Abu Dhabi, UAE</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
