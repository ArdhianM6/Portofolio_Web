import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { skills, softSkills } from '../data/portfolio.js';

const categories = [
  ['all', 'All skills'], ['frontend', 'Front end'], ['backend', 'Back end'], ['database', 'Data'], ['tools', 'Tools'],
];
const areas = [
  { id: 'frontend', title: 'Front end', mark: '</>', color: '#007FFF' },
  { id: 'backend', title: 'Back end', mark: 'API', color: '#5268FF' },
  { id: 'database', title: 'Data', mark: 'SQL', color: '#0F52BA' },
  { id: 'tools', title: 'Tools', mark: 'DEV', color: '#70B8FF' },
];

export default function Skills() {
  const [active, setActive] = useState('all');
  const filtered = useMemo(() => active === 'all' ? skills : skills.filter((skill) => skill.category === active), [active]);

  return (
    <section className="services skills-page" aria-labelledby="skills-heading">
      <div className="container">
        <p className="works-directory__period"><span>(</span>Skills · used in projects<span>)</span></p>
        <h1 className="services__title" id="skills-heading"><span>Tools I’ve</span><span className="services__title-accent">Put to Work</span></h1>
        <p className="skills-page__intro">A practical inventory of technologies and the project work where I’ve used them.</p>
        <div className="services__grid skills-page__areas">
          {areas.map((area) => {
            const categorySkills = skills.filter((skill) => skill.category === area.id);
            return <article className="services__card" key={area.id} style={{ '--service-color': area.color }}>
              <div className="services__card-frame"><div className="services__shape" aria-hidden="true" />
                <div className="services__outline"><span className="services__icon" aria-hidden="true">{area.mark}</span><h2>{area.title}</h2><p>{categorySkills.slice(0, 5).map((skill) => skill.name).join(' · ')}</p></div>
              </div>
            </article>;
          })}
        </div>
        <div className="skills-page__detail">
          <div className="skills-page__detail-heading"><div><p className="works-directory__period"><span>(</span>Technology index<span>)</span></p><h2>Skills in context</h2></div><p>{skills.length} technologies · 4 working areas</p></div>
          <div className="filter-row" role="group" aria-label="Filter skills">
            {categories.map(([id, label]) => <button key={id} type="button" aria-pressed={active === id} className={`filter-button ${active === id ? 'is-active' : ''}`} onClick={() => setActive(id)}>{label}<span>{id === 'all' ? skills.length : skills.filter((skill) => skill.category === id).length}</span></button>)}
          </div>
          <div className="skills-grid" aria-live="polite">
            {filtered.map((skill, index) => <article className="skill-item" style={{ '--filter-index': index }} key={skill.name}><div className="skill-item__top"><span className="skill-category">{skill.category}</span><span className="skill-level">{skill.level}</span></div><h3>{skill.name}</h3><p>{skill.detail}</p></article>)}
          </div>
          <aside className="soft-skills soft-skills--wide"><h2>And the people side</h2><div className="tag-list">{softSkills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div></aside>
          <Link className="about__cta" to="/projects">See where I used these <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
