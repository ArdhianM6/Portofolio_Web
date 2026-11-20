import ProjectCard from '../components/ProjectCard.jsx';
import { projects } from '../data/portfolio.js';

export default function Projects() {
  return (
    <section className="works-directory" aria-labelledby="works-directory-title">
      <div className="works-directory__content container">
        <header className="works-directory__header">
          <p className="works-directory__period"><span>(</span>2024 / 2026<span>)</span></p>
          <h1 id="works-directory-title">Selected <strong>Projects</strong></h1>
          <p>Six projects across commerce, food service, film discovery, and personal tools. Each case study includes the product context, implementation details, and working links.</p>
        </header>
        <div className="works-directory__grid">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}
