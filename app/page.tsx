function Arrow() {
  return <span aria-hidden="true">{"->"}</span>;
}

export default function Home() {
  return (
    <div className="shell">
      <header className="site-header">
        <a className="wordmark" href="#">
          Jarkko Moilanen<span>.</span>
        </a>
        <nav className="nav" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#insights">Insights</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

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
              src="/images/jarkko-moilanen-portrait.jpeg"
              alt="Portrait of Jarkko Moilanen"
            />
            <div className="hero-portrait-label">
              Data product pioneer, standards maintainer, builder, author, and
              educator.
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-inner">
            Government AI&nbsp;&nbsp;*&nbsp;&nbsp;Maysano&nbsp;&nbsp;*&nbsp;&nbsp;Open
            Data Product Specification&nbsp;&nbsp;*&nbsp;&nbsp;Data Product
            SDK&nbsp;&nbsp;*&nbsp;&nbsp;Books&nbsp;&nbsp;*&nbsp;&nbsp;Courses&nbsp;&nbsp;*&nbsp;&nbsp;
            Government AI&nbsp;&nbsp;*&nbsp;&nbsp;Maysano&nbsp;&nbsp;*&nbsp;&nbsp;Open
            Data Product Specification&nbsp;&nbsp;*&nbsp;&nbsp;Data Product
            SDK&nbsp;&nbsp;*&nbsp;&nbsp;Books&nbsp;&nbsp;*&nbsp;&nbsp;Courses&nbsp;&nbsp;*&nbsp;&nbsp;
          </div>
        </div>

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
              <a className="text-link" href="/work/government-ai">
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
              <a className="text-link" href="/work/maysano">
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
              <a className="text-link" href="/work/standards-and-sdk">
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
            <article className="work-row">
              <div className="work-index">01</div>
              <div className="work-copy">
                <div className="work-label">Platform and Portfolio Studio</div>
                <h3>Maysano</h3>
                <p>
                  A connected environment for turning business intent, evidence,
                  and source material into governed data product portfolios and
                  operational product systems.
                </p>
                <a className="text-link" href="/work/maysano">
                  See how it works <Arrow />
                </a>
              </div>
              <div className="work-visual visual-maysano">
                <div className="topline">
                  <span>MAYSANO / PORTFOLIO</span>
                  <span>ACTIVE</span>
                </div>
                <div className="mini-grid">
                  <div className="mini-panel">
                    Objectives<strong>12</strong>
                  </div>
                  <div className="mini-panel">
                    Use cases<strong>28</strong>
                  </div>
                  <div className="mini-panel">
                    Data products<strong>16</strong>
                  </div>
                  <div className="mini-panel">
                    Evidence links<strong>94</strong>
                  </div>
                </div>
              </div>
            </article>

            <article className="work-row">
              <div className="work-index">02</div>
              <div className="work-copy">
                <div className="work-label">Open standard and SDK</div>
                <h3>Open Data Product ecosystem</h3>
                <p>
                  A machine-readable specification family and developer toolkit
                  for interoperable, governed, and agent-ready data products.
                </p>
                <a className="text-link" href="/work/standards-and-sdk">
                  Explore the standard <Arrow />
                </a>
              </div>
              <div className="work-visual visual-standard">
                <span className="line one" />
                <span className="line two" />
                <span className="line three" />
                <span className="line four" />
                <span className="node main">ODPS</span>
                <span className="node a">Catalogs</span>
                <span className="node b">Graphs</span>
                <span className="node c">Vocabulary</span>
                <span className="node d">Recipes</span>
              </div>
            </article>

            <article className="work-row">
              <div className="work-index">03</div>
              <div className="work-copy">
                <div className="work-label">Government delivery</div>
                <h3>AI products for public value</h3>
                <p>
                  A portfolio approach that connects business questions, data
                  readiness, product governance, and implementation across
                  government entities.
                </p>
                <a className="text-link" href="/work/government-ai">
                  Read the case overview <Arrow />
                </a>
              </div>
              <div className="work-visual visual-gov">
                <div className="big">From use case to public value</div>
                <div className="foot">
                  <span>ABU DHABI</span>
                  <span>PORTFOLIO / GOVERNANCE / DELIVERY</span>
                </div>
              </div>
            </article>
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
              {[
                ["18 Jul 2026", "The operating system for data and AI products"],
                ["11 Jul 2026", "The SDK is not the lock-in"],
                ["04 Jul 2026", "Why portfolios matter before AI delivery starts"],
                [
                  "27 Jun 2026",
                  "Agent-ready data products need more than metadata",
                ],
              ].map(([date, title]) => (
                <a className="article-row" href="/insights/articles" key={title}>
                  <span className="article-date">{date}</span>
                  <span className="article-title">{title}</span>
                  <span className="article-arrow">{"->"}</span>
                </a>
              ))}
            </div>
            <div className="media-stack">
              <a
                className="media-item"
                href="https://www.udemy.com/user/jarkko-moilanen/"
              >
                <div className="media-cover">UDEMY</div>
                <div>
                  <strong>Udemy courses</strong>
                  <span>View the complete course listing</span>
                </div>
              </a>
              <a
                className="media-item"
                href="https://us.amazon.com/stores/Jarkko-Moilanen/author/B0B66HTHLM?ref=ap_rdr&shoppingPortalEnabled=true"
              >
                <div className="media-cover cover-accent">AUTHOR</div>
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
            <a href="mailto:jarkko@jarkkomoilanen.com">
              Discuss an engagement <Arrow />
            </a>
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

      <footer>
        <span>© 2026 Jarkko Moilanen, PhD</span>
        <div className="footer-links">
          <a href="https://www.linkedin.com/">LinkedIn</a>
          <a href="https://github.com/">GitHub</a>
          <a href="https://medium.com/">Medium</a>
          <a href="/rss">RSS</a>
        </div>
      </footer>
    </div>
  );
}
