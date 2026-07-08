// Main app component for the AIDreamLab landing page
import './App.css';

export default function App()
{
  return(
    <>
      <header className="site-header">
        <a href="/" className="brand" aria-label="AIDreamLab Home">
          <span className="brand__mark">+</span>
          <span className="brand__name">AI Dream Lab</span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#dazbog">Dazbog Link</a>
          <a href="#waitlist">Waitlist</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero__content">
            <p className="eyebrow">AI creator tools for the next idea</p>
            
            <h1>Build, create, and launch with AI at your side.</h1>

            <p className="hero__description">
              AI Dream Lab is a coming-soon creative AI workspace inspired by the power
              of Dazbog, redesigned for American creators, small businesses, and builders.
            </p>

            <div className="hero__actions">
              <a href="#waitlist" className="button button--primary">Join the waitlist</a>
              <a href="#features" className="button button--secondary">See Features</a>
            </div>
          </div>

          <aside className="hero-card" aria-label="AI Dream Lab preview">
            <p className="hero-card__label">Preview</p>
            <h2>Creator Console</h2>
            <p>
              Draft content, generate visuals, organize ideas, and prepare launches
              from one focused AI workspace.
            </p>
          </aside>
        </section>

        <section className="features" id="features">
          <div className="section-heading">
            <p className="eyebrow">What it could become</p>
            <h2>Useful AI tools without the clutter.</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <h3>Content creation</h3>
              <p>Create posts, captions, ads, emails, and product copy faster.</p>
            </article>

            <article className="feature-card">
              <h3>Image generation</h3>
              <p>Turn campaign ideas, brand concepts, and product prompts into visuals.</p>
            </article>

            <article className="feature-card">
              <h3>Brand workspace</h3>
              <p>Keep tones, ideas, drafts, and reusable brand direction in one place.</p>
            </article>
          </div>
        </section>

        <section className="dazbog-section" id="dazbog">
          <div>
            <p className="eyebrow">Inspired by Dazbog</p>
            <h2>Bringing creator-focused AI to an American audience.</h2>
          </div>

          <p>
            AI Dream Lab is being shaped as an American AI creator platform, using
            Dazbog-style functionality as a foundation while aailoring the experience,
            messaging, and product flow for U.S. users.
          </p>
        </section>

        <section className="waitlist" id="waitlist">
          <p className="eyebrow">Coming Soon</p>
          <h2>Be first in line when the lab opens.</h2>
          <p>
            The waitlist form will be connected in a later phase. For now, this section
            gives the page a clear launch direction.
          </p>

          <form className="waitlist-form">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input type="email" id="email" placeholder="you@example.com" disabled/>
            <button className="button button--primary" type="button" disabled>Join soon</button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 AIDreamLab. Built for ideas still warming up in the incubator.</p>
      </footer>
    </>
  )
}