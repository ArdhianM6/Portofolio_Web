import { Link } from 'react-router-dom';
import { profile, projects, softSkills } from '../data/portfolio.js';
import { handleImageFallback } from '../components/imageFallback.js';
import { assetUrl } from '../utils/assetUrl.js';

export default function About() {
  const socials = [
    ['LinkedIn', profile.linkedIn, assetUrl('/img/linkedin.svg')],
    ['GitHub', profile.github, assetUrl('/img/github-logo.svg')],
    ['Instagram', profile.instagram, assetUrl('/img/instagram.svg')],
  ];

  return (
    <>
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero__body container">
          <div className="about-hero__center">
            <div className="about-hero__portrait-wrap">
              <div className="about-hero__portrait-frame">
                <img className="about-hero__vector" src={assetUrl('/images/about-hero/about-vector.svg')} alt="" width="700" height="472" aria-hidden="true" onError={handleImageFallback} />
                <img className="about-hero__portrait" src={assetUrl('/foto.webp')} alt={profile.name} width="600" height="600" onError={handleImageFallback} />
              </div>
              <div className="about-hero__chat" aria-hidden="true"><img src={assetUrl('/images/about-hero/chat-shape.svg')} alt="" width="100" height="100" onError={handleImageFallback} /><span>Hello!</span></div>
            </div>
            <h1 className="about-hero__title" id="about-hero-title"><span>Hi there,</span><span>I’m <strong>{profile.name.split(' ')[0]}</strong></span></h1>
            <p className="about-hero__description">A full-stack developer from Padang, Indonesia, building useful web applications for everyday work.</p>
          </div>
          <div className="about-hero__bottom">
            <p className="about-hero__location"><span aria-hidden="true">⌖</span>{profile.location}</p>
            <ul className="site-header__socials about-hero__socials" aria-label="Social media">
              {socials.map(([label, href, icon]) => <li key={label}><a className="site-header__social" href={href} target="_blank" rel="noreferrer" aria-label={label}><img src={icon} alt="" onError={handleImageFallback} /></a></li>)}
            </ul>
            <p className="about-hero__scroll"><span>Scroll to explore</span><img src={assetUrl('/images/about-hero/mouse-shape.svg')} alt="" width="48" height="48" aria-hidden="true" onError={handleImageFallback} /></p>
          </div>
        </div>
      </section>

      <section className="about" aria-labelledby="about-heading">
        <div className="container">
          <div className="about__layout">
            <p className="about__label"><span className="about__label-mark" aria-hidden="true">✳</span>About Me</p>
            <div className="about__content">
              <h2 className="about__headline" id="about-heading">I care about the whole flow—from a clear screen to the data and logic behind it.</h2>
              <div className="about__stats">
                <div className="about__stat"><p className="about__stat-value">{profile.gpa}</p><p className="about__stat-label">GPA · Cum Laude</p></div>
                <div className="about__stat"><p className="about__stat-value">{String(projects.length).padStart(2, '0')}</p><p className="about__stat-label">Full-stack projects</p></div>
                <div className="about__stat"><p className="about__stat-value">02</p><p className="about__stat-label">Web development internships</p></div>
              </div>
              <p className="about__summary">I graduated from Universitas Putra Indonesia “YPTK” Padang in 2026. My internship work introduced me to software in an organization, while personal projects let me build across interfaces, application logic, and data.</p>
              <div className="education-note"><span className="eyebrow">Education</span><strong>{profile.education}</strong><span>GPA {profile.gpa} · Cum Laude · 2022–2026</span></div>
              <Link className="about__cta" to="/experience">My experience <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <div className="soft-skills"><h2>How I work with a team</h2><div className="tag-list">{softSkills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div></div>
        </div>
      </section>
    </>
  );
}
