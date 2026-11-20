import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { profile, projects, skills } from '../data/portfolio.js';
import ProjectCard from '../components/ProjectCard.jsx';
import { handleImageFallback } from '../components/imageFallback.js';
import { assetUrl } from '../utils/assetUrl.js';

function ContactDialog({ dialogRef }) {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setStatus('');
    try {
      const response = await fetch('https://formspree.io/f/mvgwdwnj', {
        method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Could not send');
      setStatus('Message sent. I’ll get back to you soon.');
      form.reset();
    } catch {
      setStatus(`Message could not be sent. Email me at ${profile.email} instead.`);
    } finally {
      setSending(false);
    }
  }

  return (
    <dialog ref={dialogRef} className="contact-dialog" onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }}>
      <div className="dialog-inner">
        <button type="button" className="dialog-close" aria-label="Close contact form" onClick={() => dialogRef.current?.close()}>×</button>
        <p className="eyebrow">Start a conversation</p>
        <h2>Tell me about the role.</h2>
        <p className="dialog-intro">Share a few details and I’ll reply by email.</p>
        <form onSubmit={submit} className="contact-form">
          <label>Company<input name="company" autoComplete="organization" required /></label>
          <label>Role<input name="job" required /></label>
          <label>Your email<input name="email" type="email" autoComplete="email" required /></label>
          <label>Message<textarea name="message" rows="3" /></label>
          <button className="button button--primary" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</button>
          <p role="status" aria-live="polite" className="form-status">{status}</p>
        </form>
      </div>
    </dialog>
  );
}

export default function Home() {
  const dialogRef = useRef(null);
  const ctaRef = useRef(null);
  const featured = projects.slice(0, 2);
  const recentExperience = [
    { period: 'Apr - Jul 2025', role: 'Web Development Intern', company: 'BPSDM West Sumatra', description: 'Designed the employee menu and login interface, and entered employee data into the system database.' },
    { period: 'Nov 2024 - Feb 2025', role: 'Web Development Intern', company: 'PT Leholeh', description: 'Worked on the company website interface and supported testing and debugging.' },
  ];
  const skillAreas = [
    { title: 'Front end', category: 'frontend', color: '#007FFF', mark: '</>' },
    { title: 'Back end', category: 'backend', color: '#5268FF', mark: 'API' },
    { title: 'Data', category: 'database', color: '#0F52BA', mark: 'SQL' },
    { title: 'Tools', category: 'tools', color: '#70B8FF', mark: 'DEV' },
  ];

  useEffect(() => {
    const section = ctaRef.current;
    const layer = section?.querySelector('.cta__trail');
    const canUseTrail = window.matchMedia('(min-width: 561px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!section || !layer || !canUseTrail.matches) return undefined;

    const trailImages = Array.from({ length: 8 }, (_, index) => assetUrl(`/images/cta/cta-image-${String(index + 1).padStart(2, '0')}.svg`));
    const activeItems = new Set();
    let imageIndex = 0;
    let previousPosition = null;

    function handlePointerMove(event) {
      const bounds = section.getBoundingClientRect();
      const position = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      if (previousPosition && Math.abs(previousPosition.x - position.x) <= 100 && Math.abs(previousPosition.y - position.y) <= 100) return;
      previousPosition = position;

      const item = document.createElement('span');
      const image = document.createElement('img');
      item.className = 'cta__trail-item';
      item.style.left = `${position.x}px`;
      item.style.top = `${position.y}px`;
      item.style.setProperty('--trail-rotation', `${Math.round(Math.random() * 14 - 7)}deg`);
      image.src = trailImages[imageIndex];
      image.alt = '';
      image.decoding = 'async';
      item.append(image);
      layer.append(item);
      activeItems.add(item);
      imageIndex = (imageIndex + 1) % trailImages.length;

      while (activeItems.size > 10) {
        const oldestItem = activeItems.values().next().value;
        oldestItem?.remove();
        activeItems.delete(oldestItem);
      }
      item.addEventListener('animationend', () => {
        item.remove();
        activeItems.delete(item);
      }, { once: true });
    }

    function resetPosition() { previousPosition = null; }
    section.addEventListener('pointermove', handlePointerMove);
    section.addEventListener('pointerleave', resetPosition);
    return () => {
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerleave', resetPosition);
      activeItems.forEach((item) => item.remove());
      activeItems.clear();
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="site-header__hero container">
          <div className="site-header__copy">
            <p className="site-header__location">
              <svg className="site-header__pin" viewBox="0 0 48 48" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M24 2C13 2 4 11 4 22c0 12 12 22 20 26 8-4 20-14 20-26C44 11 35 2 24 2Zm0 28a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" fill="currentColor" /></svg>
              <span>Based in {profile.location}</span>
            </p>
            <h1 className="site-header__title">
              <span className="site-header__title-line">Hi, I am {profile.shortName},</span>
              <span className="site-header__title-line">Full-Stack <span className="site-header__title-accent">Developer</span></span>
            </h1>
            <p className="site-header__desc">I build useful web applications for everyday work, from cafe checkout and restaurant reservations to online shopping and personal tools.</p>
            <div className="site-header__core-stack" aria-label="Most used technologies">
              <span>Core stack</span>
              <ul>{['React.js', 'Node.js', 'PostgreSQL'].map((technology) => <li key={technology}>{technology}</li>)}</ul>
            </div>
            <div className="site-header__actions">
              <button className="site-header__cta" type="button" onClick={() => dialogRef.current?.showModal()}>Talk about a role</button>
              <a className="site-header__cv" href={profile.cv} target="_blank" rel="noreferrer">View my CV <span aria-hidden="true">↗</span></a>
            </div>
            <ul className="site-header__socials" aria-label="Social media">
              {[
                ['LinkedIn', profile.linkedIn, assetUrl('/img/linkedin.svg')],
                ['GitHub', profile.github, assetUrl('/img/github-logo.svg')],
                ['Instagram', profile.instagram, assetUrl('/img/instagram.svg')],
              ].map(([label, href, icon]) => (
                <li key={label}><a className="site-header__social" href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <span className="site-header__social-clip"><span className="site-header__social-track">
                    <span className="site-header__social-icon"><img src={icon} alt="" onError={handleImageFallback} /></span>
                    <span className="site-header__social-icon" aria-hidden="true"><img src={icon} alt="" onError={handleImageFallback} /></span>
                  </span></span>
                </a></li>
              ))}
            </ul>
          </div>
          <div className="site-header__visual">
            <div className="site-header__stage">
              <img className="site-header__browser" src={assetUrl('/images/header/browser.png')} alt="" width="1039" height="1079" fetchPriority="high" onError={handleImageFallback} />
              <img className="site-header__portrait" src={assetUrl('/foto.webp')} alt={`Portrait of ${profile.name}`} width="680" height="711" fetchPriority="high" onError={handleImageFallback} />
              <span className="site-header__ui" aria-hidden="true">React</span>
              <span className="site-header__ux" aria-hidden="true">Full stack</span>
              <img className="site-header__star" src={assetUrl('/images/header/star.png')} alt="" width="200" height="200" onError={handleImageFallback} />
            </div>
          </div>
        </div>
      </header>

      <section className="about" aria-labelledby="home-about-heading">
        <div className="container">
          <div className="about__layout">
            <p className="about__label"><span className="about__label-mark" aria-hidden="true">✳</span>About Me</p>
            <div className="about__content">
              <h2 className="about__headline" id="home-about-heading">An Informatics Engineering graduate building full-stack apps around the tasks people need to get done.</h2>
              <div className="about__stats">
                <div className="about__stat"><p className="about__stat-value">3.56</p><p className="about__stat-label">GPA - Cum Laude</p></div>
                <div className="about__stat"><p className="about__stat-value">06</p><p className="about__stat-label">Full-stack projects</p></div>
                <div className="about__stat"><p className="about__stat-value">02</p><p className="about__stat-label">Web development internships</p></div>
              </div>
              <p className="about__summary">I graduated from Universitas Putra Indonesia YPTK Padang in 2026. My work spans user interfaces, application logic, and data, from a cafe POS to a restaurant booking flow.</p>
              <Link className="about__cta" to="/about">More about me <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="works" aria-labelledby="home-works-heading">
        <div className="works__layout container">
          <div className="works__intro"><div className="works__intro-sticky">
            <h2 className="works__title" id="home-works-heading"><span>Selected</span><span className="works__title-accent">Projects</span></h2>
            <p className="works__period"><span className="works__period-accent">(</span>2024 / 2026<span className="works__period-accent">)</span></p>
          </div></div>
          <div className="works__list">
            {featured.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
            <Link className="works__all-link site-header__cta" to="/projects">All Projects <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="about-experience" aria-labelledby="home-experience-heading">
        <div className="about-experience__inner">
          <h2 className="about-experience__title" id="home-experience-heading"><span>My</span><span>Experience</span></h2>
          <ol className="about-experience__list">
            {recentExperience.map((item) => <li className="about-experience__item" key={item.company}>
              <p className="about-experience__period"><span aria-hidden="true">✳</span>{item.period}</p>
              <p className="about-experience__role">{item.role}</p>
              <p className="about-experience__company">{item.company}</p>
              <p className="about-experience__description">{item.description}</p>
            </li>)}
          </ol>
          <Link className="about__cta" to="/experience">Full experience and education <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="services" aria-labelledby="home-skills-heading">
        <div className="container">
          <h2 className="services__title" id="home-skills-heading"><span>What I</span><span className="services__title-accent">Work With</span></h2>
          <div className="services__grid">
            {skillAreas.map((area, index) => {
              const categorySkills = skills.filter((skill) => skill.category === area.category);
              return <article className="services__card" key={area.category} style={{ '--service-color': area.color }}>
                <div className="services__card-frame"><div className="services__shape" aria-hidden="true" />
                  <div className="services__outline">
                    <span className="services__icon" aria-hidden="true">{area.mark}</span>
                    <h3>{area.title}</h3>
                    <p>{categorySkills.slice(0, 4).map((skill) => skill.name).join(' · ')}</p>
                  </div>
                </div>
              </article>;
            })}
          </div>
          <Link className="services__all-link" to="/skills">Browse all {skills.length} skills <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="cta" aria-labelledby="home-cta-heading" ref={ctaRef}>
        <div className="cta__trail" aria-hidden="true" />
        <div className="container cta__inner">
          <p className="cta__eyebrow"><span className="cta__eyebrow-mark" aria-hidden="true">✳</span>Available for full-stack roles</p>
          <h2 className="cta__headline" id="home-cta-heading">
            <span className="cta__line cta__line--top">Let us <span className="cta__accent">Build</span></span>
            <img className="cta__portrait" src={assetUrl('/foto.webp')} alt="" width="200" height="197" loading="lazy" onError={handleImageFallback} />
            <span className="cta__line cta__line--bottom">Something Useful</span>
          </h2>
          <button className="cta__button" type="button" onClick={() => dialogRef.current?.showModal()}>Talk about a role</button>
        </div>
      </section>
      <ContactDialog dialogRef={dialogRef} />
    </>
  );
}
