import { experience } from '../data/portfolio.js';
import { handleImageFallback } from '../components/imageFallback.js';

export default function Experience() {
  return (
    <section className="about-experience experience-page" aria-labelledby="experience-heading">
      <div className="about-experience__inner">
        <p className="about-experience__eyebrow">Work and education</p>
        <h1 className="about-experience__title" id="experience-heading"><span>My</span><span>Experience</span></h1>
        <ol className="about-experience__list">
          {experience.map((item) => <li className={`about-experience__item${item.images ? ' has-images' : ''}`} key={`${item.place}-${item.date}`}>
            <p className="about-experience__period"><span aria-hidden="true">✳</span>{item.date}{item.status && <em>{item.status}</em>}</p>
            <div className="experience-entry">
              <div className="experience-entry__heading"><p className="about-experience__role">{item.role}</p><p className="about-experience__company">{item.place}</p></div>
              <div className="about-experience__description">
                <p>{item.detail}</p>
                {item.stack && <div className="tag-list">{item.stack.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>}
              </div>
              {item.images && <div className="timeline-images" aria-label={`Photos: ${item.role} at ${item.place}`}>{item.images.map((image) => <img src={image} alt={`${item.role} at ${item.place}`} loading="lazy" key={image} onError={handleImageFallback} />)}</div>}
            </div>
          </li>)}
        </ol>
      </div>
    </section>
  );
}
