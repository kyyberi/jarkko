const credibilityItems = [
  { label: "Trusted roles", detail: "and contributions" },
  { label: "Government AI products", detail: "Abu Dhabi" },
  { label: "Maysano", detail: "Platform & Portfolio Studio" },
  { label: "The Linux Foundation", detail: "Open standards ecosystem" },
  { label: "ODPS", detail: "Specification family" },
  { label: "5 Udemy courses", detail: "Books & publications" },
];

const workAreas = [
  {
    eyebrow: "Government AI",
    title: "Product leadership",
    body: "I lead government-wide AI product initiatives in Abu Dhabi, aligning entities, data, and technology to deliver measurable public value at scale.",
    action: "Explore this work",
    href: "/work/government-ai",
    accent: "blue",
  },
  {
    eyebrow: "Maysano",
    title: "Platform & Studio",
    body: "I build the environments that help organizations design, operate, and grow data product portfolios with clarity, governance, and speed.",
    action: "Go to Maysano",
    href: "/work/maysano",
    accent: "green",
  },
  {
    eyebrow: "Open standards",
    title: "Standards & SDK",
    body: "I maintain open standards and developer tooling that enable interoperable, automation-ready, and agent-ready data products.",
    action: "See standards & SDK",
    href: "/work/standards-and-sdk",
    accent: "violet",
  },
  {
    eyebrow: "Education",
    title: "Author & speaker",
    body: "I write, teach, and speak about data products, AI, governance, and how to turn strategy into operational reality.",
    action: "Browse insights",
    href: "/insights",
    accent: "gold",
  },
];

const featuredWork = [
  {
    eyebrow: "Maysano",
    title: "An integrated environment for data product portfolios",
    body: "From strategy and discovery to catalog, governance, operations, and measurable value.",
    action: "Explore Maysano",
    href: "/work/maysano",
    image: "/images/maysano-preview.jpg",
  },
  {
    eyebrow: "Open Data Product Specification Family",
    title: "The open standard for data products",
    body: "A shared language for describing, exchanging, and operating data products.",
    action: "Explore the standard",
    href: "/work/standards-and-sdk",
    image: "/images/odps-preview.jpg",
  },
];

const insights = [
  {
    date: "Jul 15, 2025",
    category: "AI products",
    title: "From Data to AI Products: The Missing Layer",
    body: "Why most organizations skip the critical step that makes AI initiatives repeatable and trustworthy.",
    reading: "6 min read",
    image: "/images/insight-data-ai.jpg",
  },
  {
    date: "Jun 30, 2025",
    category: "Data products",
    title: "Designing Agent-Ready Data Products",
    body: "What it takes to make your data products usable by AI agents safely and reliably.",
    reading: "7 min read",
    image: "/images/insight-agent-ready.jpg",
  },
  {
    date: "Jun 10, 2025",
    category: "Government AI",
    title: "Operating Models for Government AI Portfolios",
    body: "Principles and patterns for delivering AI value across multiple public sector entities.",
    reading: "8 min read",
    image: "/images/insight-government.jpg",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero" id="home">
        <header className="nav" aria-label="Primary navigation">
          <a className="wordmark" href="/">
            Jarkko Moilanen
          </a>
          <nav>
            <a className="active" href="/">
              Home
            </a>
            <a href="/work">Work</a>
            <a href="/insights">Insights</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
          <button className="menu-button" aria-label="Open navigation">
            <span />
            <span />
            <span />
          </button>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">Data product pioneer</p>
            <h1>Building the operating systems for data and AI products</h1>
            <p className="lead">
              I work across government delivery, open standards, software
              platforms, and education to make data products practical,
              scalable, governed, and ready for AI.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button primary" href="/work">
                Explore my work <span aria-hidden="true">{"->"}</span>
              </a>
              <a className="button secondary" href="/insights">
                Read my latest thinking
              </a>
            </div>
            <a className="availability" href="/contact">
              <span aria-hidden="true" />
              <strong>Available for selected advisory engagements</strong>
              <small>
                Current commitments limit the number and scope of assignments I
                accept. Learn more {"->"}
              </small>
            </a>
          </div>
          <div className="portrait-wrap" aria-hidden="true">
            <div className="linework" />
            <img
              src="/images/jarkko-portrait.jpg"
              alt=""
              className="portrait"
            />
          </div>
        </div>
      </section>

      <section className="credibility" aria-label="Trusted roles and contributions">
        {credibilityItems.map((item) => (
          <div className="credibility-item" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.detail}</strong>
          </div>
        ))}
      </section>

      <section className="section section-tight" id="work">
        <div className="section-heading split">
          <h2>What I do</h2>
          <p>Connecting strategy, data, AI, standards, and delivery.</p>
        </div>
        <div className="work-grid">
          {workAreas.map((area) => (
            <article className={`work-card ${area.accent}`} key={area.title}>
              <div className="card-icon" aria-hidden="true">
                {area.eyebrow.charAt(0)}
              </div>
              <p className="card-eyebrow">{area.eyebrow}</p>
              <h3>{area.title}</h3>
              <p>{area.body}</p>
              <a href={area.href}>
                {area.action} <span aria-hidden="true">{"->"}</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="featured section" aria-labelledby="featured-title">
        <div className="section-heading">
          <h2 id="featured-title">Featured: Building the foundation</h2>
        </div>
        <div className="featured-grid">
          {featuredWork.map((item) => (
            <article className="feature-card" key={item.title}>
              <div>
                <p className="card-eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <a href={item.href}>
                  {item.action} <span aria-hidden="true">{"->"}</span>
                </a>
              </div>
              <img src={item.image} alt="" />
            </article>
          ))}
        </div>
      </section>

      <section className="section insights" id="insights">
        <div className="section-heading split">
          <h2>Latest thinking</h2>
          <a href="/insights">View all articles {"->"}</a>
        </div>
        <div className="insight-grid">
          {insights.map((item) => (
            <article className="insight-card" key={item.title}>
              <img src={item.image} alt="" />
              <div>
                <p className="meta">
                  {item.date} · {item.category}
                </p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <a href="/insights/articles">
                  Read article <span>{item.reading}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="education section">
        <div>
          <p className="kicker">Books, courses, and field notes</p>
          <h2>Teaching the methods behind data product practice</h2>
        </div>
        <p>
          The education body spans books, five Udemy courses, practical guides,
          articles, and speaking. It exists to make the operating models,
          standards, and delivery patterns repeatable for teams.
        </p>
        <a className="button secondary light" href="/insights">
          Browse books and courses
        </a>
      </section>

      <section className="advisory section" id="contact">
        <div className="advisory-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div>
          <h2>Available for selected advisory and strategic engagements</h2>
          <p>
            I currently lead government-wide AI product initiatives in Abu Dhabi
            while developing Maysano and maintaining the Open Data Product
            ecosystem. Alongside these responsibilities, I accept a limited
            number of focused advisory engagements, portfolio reviews, executive
            workshops, and strategic assignments.
          </p>
        </div>
        <a className="button primary" href="/contact">
          Discuss a strategic engagement <span aria-hidden="true">{"->"}</span>
        </a>
      </section>

      <footer className="footer">
        <p>
          Jarkko Moilanen builds and applies the systems, standards, and
          platforms that make data and AI products governable.
        </p>
        <nav aria-label="Footer links">
          <a href="https://www.linkedin.com/">LinkedIn</a>
          <a href="https://github.com/">GitHub</a>
          <a href="https://medium.com/">Medium</a>
          <a href="/work/standards-and-sdk">ODPS</a>
          <a href="/contact">Contact</a>
        </nav>
        <span>© 2026 Jarkko Moilanen</span>
      </footer>
    </main>
  );
}
