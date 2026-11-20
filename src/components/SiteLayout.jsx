import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { profile } from '../data/portfolio.js';
import { handleImageFallback } from './imageFallback.js';
import { assetUrl } from '../utils/assetUrl.js';

const pages = [
  ['Home', '/'], ['About', '/about'], ['Skills', '/skills'],
  ['Projects', '/projects'], ['Experience', '/experience'], ['Certificates', '/certificates'],
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="site-header__bar container"
      aria-label="Primary navigation"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false);
          event.currentTarget.querySelector('.site-header__menu-toggle')?.focus();
        }
      }}
    >
      <Link className="site-header__logo" to="/" aria-label={`${profile.name} home`}>
        <span className="site-header__logo-track">
          <span className="site-header__logo-text">{profile.shortName}</span>
          <span className="site-header__logo-text site-header__logo-text--accent" aria-hidden="true">{profile.shortName}</span>
        </span>
      </Link>
      <button
        className="site-header__menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-navigation-links"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? 'Close' : 'Menu'}
      </button>
      <div className={`site-header__nav-links ${menuOpen ? 'is-open' : ''}`} id="site-navigation-links">
        {pages.map(([label, href]) => (
          <NavLink
            key={href}
            to={href}
            end={href !== '/projects'}
            className="site-header__nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </div>
      <Link className="site-header__cta" to="/#contact">Get in touch</Link>
    </nav>
  );
}

function Footer() {
  const socials = [
    ['LinkedIn', profile.linkedIn, assetUrl('/img/linkedin.svg')],
    ['GitHub', profile.github, assetUrl('/img/github-logo.svg')],
    ['Instagram', profile.instagram, assetUrl('/img/instagram.svg')],
  ];

  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__card">
        <div className="site-footer__main">
          <div className="site-footer__info">
            <Link className="site-footer__brand site-footer__slide-link" to="/" aria-label={`${profile.name} home`}>
              <span className="site-footer__link-clip"><span className="site-footer__link-track">
                <span className="site-footer__link-text">{profile.shortName}</span>
                <span className="site-footer__link-text site-footer__link-text--accent" aria-hidden="true">{profile.shortName}</span>
              </span></span>
            </Link>
            <p className="site-footer__description">Building useful web applications for everyday work, from the interface to the data.</p>
            <a className="site-footer__email site-footer__slide-link" href={`mailto:${profile.email}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4.5 7 7.5 6 7.5-6" /></svg>
              <span className="site-footer__link-clip"><span className="site-footer__link-track">
                <span className="site-footer__link-text">{profile.email}</span>
                <span className="site-footer__link-text site-footer__link-text--accent" aria-hidden="true">{profile.email}</span>
              </span></span>
            </a>
            <ul className="site-footer__socials" aria-label="Social media">
              {socials.map(([label, href, icon]) => (
                <li key={label}><a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <img src={icon} alt="" onError={handleImageFallback} />
                </a></li>
              ))}
            </ul>
          </div>
          <nav className="site-footer__pages" aria-label="Footer pages">
            <h2>Pages</h2>
            <ul>{pages.map(([label, href]) => <li key={href}><Link className="site-footer__slide-link" to={href}>{label}</Link></li>)}</ul>
          </nav>
          <a className="site-footer__cta" href={`https://wa.me/${profile.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">Let’s Talk</a>
        </div>
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  return <a className="back-to-top" href="#main-content" aria-label="Back to top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" /></svg><span>TOP</span></a>;
}

export default function SiteLayout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="site-navigation"><Header /></div>
      <main id="main-content" tabIndex="-1">{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
