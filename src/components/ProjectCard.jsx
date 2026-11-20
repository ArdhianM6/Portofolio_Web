import { Link } from 'react-router-dom';
import { handleImageFallback } from './imageFallback.js';
import { assetUrl } from '../utils/assetUrl.js';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <article className="works__card">
      <Link className="works__visual-link" to={project.path} aria-label={`Read the ${project.title} case study`}>
        <div className="works__browser">
          <img className="works__browser-frame" src={assetUrl('/images/works/work-browser.svg')} alt="" width="410" height="350" aria-hidden="true" onError={handleImageFallback} />
          <div className="works__project-media" aria-hidden="true">
            <img className="works__project-image" src={project.image} alt="" loading={index < 2 ? 'eager' : 'lazy'} onError={handleImageFallback} />
          </div>
          <span className="works__project-name">{project.title}</span>
          <span className="works__project-arrow" aria-hidden="true"><img src={assetUrl('/images/works/work-arrow.png')} alt="" width="73" height="50" onError={handleImageFallback} /></span>
        </div>
      </Link>
      <div className="works__details">
        <div className="works__details-heading">
          <p className="works__details-type">{project.type} <span>·</span> {project.year}</p>
          <h3><Link to={project.path}>{project.title}</Link></h3>
          <p className="works__details-summary">{project.summary}</p>
        </div>
        <div className="works__details-meta">
          <div className="tag-list" aria-label="Technologies used">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
          <div className="works__details-links">
            {project.live && <a href={project.live} target="_blank" rel="noreferrer">Live demo <span aria-hidden="true">↗</span></a>}
            {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">Source code <span aria-hidden="true">↗</span></a>}
          </div>
        </div>
      </div>
    </article>
  );
}
