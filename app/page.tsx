const focusAreas = [
  {
    icon: "G",
    title: "Government AI",
    body: "Leading government-wide AI product initiatives in Abu Dhabi to improve services and outcomes with trusted data.",
    href: "/work/government-ai",
  },
  {
    icon: "M",
    title: "Maysano",
    body: "Building Maysano Platform and Portfolio Studio to design, govern, and deliver AI-ready data products faster.",
    href: "/work/maysano",
  },
  {
    icon: "O",
    title: "Open standards & SDK",
    body: "Maintaining the Open Data Product ecosystem at the Linux Foundation and building the ODPS SDK for practical adoption.",
    href: "/work/standards-and-sdk",
  },
];

const selectedWork = [
  {
    image: "/images/maysano-preview.jpg",
    label: "Maysano",
    title: "Maysano Platform & Portfolio Studio",
    body: "Tools that turn business intent into data product portfolios, standards-aligned artifacts, and implementation-ready plans.",
    action: "See how it works",
    href: "/work/maysano",
  },
  {
    image: "/images/odps-preview.jpg",
    label: "Standards",
    title: "Open Data Product Specification",
    body: "A vendor-neutral standard and open family of specifications for data products, catalogs, graphs, and more.",
    action: "Explore the standard",
    href: "/work/standards-and-sdk",
  },
  {
    image: "/images/work-government.jpg",
    label: "Government AI",
    title: "AI Products for Public Value",
    body: "Designing and delivering AI-powered products that answer real questions and improve how government works.",
    action: "Read case highlights",
    href: "/work/government-ai",
  },
];

const writing = [
  ["Jul 15, 2025", "From Data to AI Products: The Missing Layer", "AI products"],
  ["Jul 02, 2025", "Designing Agent-Ready Data Products", "Data products"],
  ["Jun 18, 2025", "Why Standards Unlock the Data Economy", "Standards"],
  ["May 29, 2025", "Talk to Data: Building Answers, Not Dashboards", "Government AI"],
];

const books = [
  ["/images/book-masterclass.jpg", "Data Product Masterclass"],
  ["/images/book-monetization.jpg", "Data Product Monetization"],
  ["/images/book-governance.jpg", "Minimum Lovable Governance"],
  ["/images/book-odps.jpg", "Master the ODPS with GPT Tool"],
];

function Arrow() {
  return <span aria-hidden="true">{"->"}</span>;
}

export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar" aria-label="Primary navigation">
        <a className="wordmark" href="/">
          Jarkko Moilanen<span>.</span>
        </a>
        <nav>
          <a href="/work">Work</a>
          <a href="/insights">Insights</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="scribble note-left">
            I connect strategy, data and AI to create value at scale.
          </p>
          <h1>Building the operating system for data and AI products</h1>
          <p className="lead">
            I help governments and organizations turn data into trusted AI
            products that deliver measurable public value.
          </p>
          <p className="signature" aria-label="Jarkko signature">
            Jarkko
          </p>
          <p className="roles">
            <span>PhD</span>
            <span>Author</span>
            <span>Standards Maintainer</span>
            <span>Builder</span>
            <span>Educator</span>
            <span>Speaker</span>
          </p>
        </div>

        <div className="hero-art" aria-hidden="true">
          <p className="scribble note-right">Building better systems for real impact</p>
          <img className="skyline" src="/images/hero-skyline.jpg" alt="" />
          <img className="portrait" src="/images/jarkko-hero-clean.png" alt="" />
          <div className="stamp">
            <span>Working on what matters now</span>
            <small>UAE</small>
          </div>
        </div>
      </section>

      <section className="focus-band" aria-labelledby="focus-title">
        <div className="focus-title">
          <h2 id="focus-title" className="scribble">
            Where I Focus
          </h2>
        </div>
        <div className="focus-grid">
          {focusAreas.map((area) => (
            <article className="focus-card" key={area.title}>
              <div className="focus-icon" aria-hidden="true">
                {area.icon}
              </div>
              <h3>{area.title}</h3>
              <p>{area.body}</p>
              <a href={area.href}>
                Explore <Arrow />
              </a>
            </article>
          ))}
        </div>
        <div className="flow-note" aria-label="From vision to measurable value">
          <p className="scribble">
            From vision to <strong>measurable value.</strong>
          </p>
          <div className="flow-boxes">
            <span>Strategy</span>
            <span>Data Products</span>
            <span>AI Products</span>
            <small>Public Value</small>
          </div>
        </div>
      </section>

      <section className="section selected-work" id="work">
        <div className="section-heading">
          <h2 className="scribble">Selected Work</h2>
          <a href="/work">
            View all work <Arrow />
          </a>
        </div>
        <div className="work-grid">
          {selectedWork.map((item) => (
            <article className="work-card" key={item.title}>
              <img src={item.image} alt="" />
              <p className="card-label">{item.label}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <a href={item.href}>
                {item.action} <Arrow />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section knowledge" id="insights">
        <div className="writing">
          <div className="section-heading">
            <h2 className="scribble">Latest Writing</h2>
            <a href="/insights/articles">
              All articles <Arrow />
            </a>
          </div>
          <div className="writing-list">
            {writing.map(([date, title, category]) => (
              <a href="/insights/articles" className="writing-row" key={title}>
                <span>{date}</span>
                <strong>{title}</strong>
                <small>{category}</small>
              </a>
            ))}
          </div>
        </div>

        <div className="books">
          <div className="section-heading">
            <h2 className="scribble">Books & Courses</h2>
            <a href="/insights">
              View all <Arrow />
            </a>
          </div>
          <div className="book-grid">
            {books.map(([image, title]) => (
              <a href="/insights/books" className="book-card" key={title}>
                <img src={image} alt="" />
                <span>{title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band" id="contact">
        <div className="cta-scribble">
          <span className="scribble">Let's build what matters.</span>
        </div>
        <div>
          <p>
            I accept a limited number of advisory, workshop, and strategic
            review engagements alongside my current work.
          </p>
          <a href="/contact">
            Discuss an engagement <Arrow />
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="socials" aria-label="Social links">
          <a href="https://www.linkedin.com/">in</a>
          <a href="https://x.com/">X</a>
          <a href="https://www.youtube.com/">YouTube</a>
          <a href="/contact">Mail</a>
        </div>
        <form className="newsletter">
          <label htmlFor="email">Stay in the loop</label>
          <p>Insights on data products, AI, and standards. No spam.</p>
          <div>
            <input id="email" type="email" placeholder="Your email address" />
            <button type="button">Subscribe</button>
          </div>
        </form>
        <div className="footer-bottom">
          <span>© 2026 Jarkko Moilanen, PhD</span>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/rss">RSS</a>
          <a href="/sitemap.xml">Sitemap</a>
          <strong className="scribble">Abu Dhabi, UAE</strong>
        </div>
      </footer>
    </main>
  );
}
