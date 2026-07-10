// Main app component for the AIDreamLab landing page
import { useState, useEffect} from 'react';
import type { SyntheticEvent } from 'react';
import './App.css';

const DEMO_OUTPUTS =
[
  'Generate landing page copy',
  'Create social captions',
  'Draft customer email',
  'Suggest launch visuals',
];

// Small delay helper for the simulated "thinking" animation below
function sleep(ms: number)
{
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const COUNTER_ENDPOINT = 'https://aidreamlab-counter.quantumarcllc.workers.dev';

export default function App()
{
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [revealedCount, setRevealedCount] = useState(0);
  const [thinkingIndex, setThinkingIndex] = useState(-1);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(()=> 
  {
    fetch(COUNTER_ENDPOINT)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {if (data?.count) setWaitlistCount(data.count);})
      .catch(() => {}); // Stay silent if the worker is unreachable
  }, []);

  useEffect(() =>
  {
    let cancelled = false;

    async function cycle()
    {
      let index = 0;

      while(!cancelled)
      {
        setThinkingIndex(index);

        // Randomized "thinking" time per item so it doesn't feel mechanical -
        // some tasks read as quicker/slower than others.
        await sleep(450 + Math.random() * 500);

        if (cancelled) return;

        setRevealedCount(index + 1);
        setThinkingIndex(-1);

        await sleep(500 + Math.random() * 700);
        if (cancelled) return;

        index += 1;

        if(index >= DEMO_OUTPUTS.length)
        {
          await sleep(1400); // pause on the full list before looping
          if (cancelled) return;

          index = 0;

          setRevealedCount(0);
        }
      }
    }

    cycle();
    return () => {cancelled = true;}
  }, []);

  async function handleWaitListSubmit(e: SyntheticEvent<HTMLFormElement>)
  {
    e.preventDefault(); 
    setStatus('loading');

    const formData = new FormData();
    formData.append('EMAIL', email);
    formData.append('locale', 'en');
    formData.append('email_address_check', ''); // honeypot field - must stay empty

    try 
    {
      await fetch(
        'https://e5fa72de.sibforms.com/serve/MUIFAGTIm0KRTPS3SiUHFjXLB8nitH72rLp98fc8Mp4OLkThosxSH9xZZqf4xOpNsPv69_Xzdr7no4GgSXHW6kJXy4M1iX-qAuTFKUdSs1lD94P7ImuXC5EkFMwy3JLckx-wOHE73SXLFQo2Wd8DLAOgxOrf4duTod07HfpEavHTzKOof8IPsKU1SM0QjOXRWPUZwjEmpH0ONdz7',
        {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        }
      );
      // mode: no-cors means we cannot read the real response, so we assume success
      setStatus('success');
      setEmail('');
    } catch
    {
      setStatus('error');
    }
  }

  useEffect(() =>
  {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) =>
      {
        entries.forEach((entry) =>
        {
          if(entry.isIntersecting)
          {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.2}
    );

    revealEls.forEach((el)=> observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return(
    <>
      <header className="site-header">
        <a href="/" className="brand" aria-label="AIDreamLab Home">
          <span className="brand__mark" aria-hidden="true">
            <img src="/dazbog.png" alt="Dazbog" />
          </span>
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
            
            <h1>Skip the creative agency. Launch your next campaign yourself.</h1>

            <p className="hero__description">
              AI Dream Labs is a coming-soon creative AI workspace inspired by Dazbog,
              redesigned for American creators, small businesses, and builders who want
              faster content, sharper visuals, and practical launch tools in one place.
            </p>

            <div className="hero__actions">
              <a href="#waitlist" className="button button--primary">Join the waitlist</a>
              <a href="#features" className="button button--secondary">See Features</a>
            </div>
          </div>

          <aside className="hero-card" aria-label="AI Dream Lab preview">
            <div className="hero-card__topbar">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <p className="hero-card__label">Creator Console</p>
            
            <div className="hero-card__prompt">
              <span>Prompt</span>
              <p>Launch a new product campaign for a small business.</p>
            </div>

            <div className="hero-card__result">
              <span>AI Output</span>
              <ul>
                {
                  DEMO_OUTPUTS.map((item, index) =>
                  {
                    const isRevealed = index < revealedCount;
                    const isThinking = index === thinkingIndex;

                    return(
                      <li key={item} className={isRevealed ? "is-visible" : isThinking ? "is-thinking" : ""}>
                        {
                          isRevealed ? item : isThinking ? 
                          (
                            <span className="thinking-dots" aria-hidden="true">
                              <span></span><span></span><span></span>
                            </span>
                          ) : null
                        }
                      </li>
                    );
                  })
                }                
              </ul>
            </div>
          </aside>
        </section>

        <section className="features" id="features">
          <div className="section-heading">
            <p className="eyebrow">What it could become</p>
            <h2>Useful AI tools without the clutter.</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-card reveal">
              <span className="feature-card__icon">01</span>
              <h3>Content creation</h3>
              <p>Create posts, captions, ads, emails, and product copy faster.</p>
            </article>

            <article className="feature-card reveal">
              <span className="feature-card__icon">02</span>
              <h3>Image generation</h3>
              <p>Turn campaign ideas, brand concepts, and product prompts into visuals.</p>
            </article>

            <article className="feature-card reveal">
              <span className="feature-card__icon">03</span>
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
            Dazbog-style functionality as a foundation while tailoring the experience,
            messaging, and product flow for U.S. users.
          </p>
        </section>

        <section className="waitlist" id="waitlist">
          <p className="eyebrow">Coming Soon</p>
          <h2>Be first in line when the lab opens.</h2>
          {
            waitlistCount !== null &&
            (
              <p className="waitlist-count">{waitlistCount}+ people already on the list</p>
            )
          }
          <p>
             Drop your email below and we'll let you know the moment AI Dream Lab opens its doors.
          </p>

          <form className="waitlist-form" onSubmit={handleWaitListSubmit}>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="you@example.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              disabled={status === 'loading' || status === 'success'}
            />
            <button 
              className="button button--primary" 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'success' ? "You're on the list!" : status === 'loading' ? "Joining..." : "Join Soon"}
            </button>
          </form>
          {status==='error' && 
          (
            <p className="waitlist-error">Something went wrong - please try again.</p>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; 2026 AIDreamLab. Built for ideas still warming up in the incubator.</p>
      </footer>
    </>
  )
}