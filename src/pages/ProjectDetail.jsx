import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading.jsx';
import { projects } from '../data/portfolio.js';
import { handleImageFallback } from '../components/imageFallback.js';

const caseStudySections = {
  alovera: ['A place for conversations worth keeping', 'The workspace behind the assistant', 'Chat, saved notes, and a small character'],
  'alovera-pos': ['A cafe order from menu to receipt', 'The checkout and operations flow', 'What staff can manage'],
  'ruang-saji': ['Booking without an account', 'Guest and staff workflows', 'From availability to arrival'],
  marketplace: ['Customer and admin work in one system', 'Checkout and payment handling', 'Shopping and order management'],
  'screen-search': ['From a search result to a decision', 'The discovery flow', 'Details, lists, and viewing options'],
  'expense-tracker': ['Quick entry, useful overview', 'The personal finance dashboard', 'Ways to read monthly spending'],
};

export default function ProjectDetail() {
  const galleryDialog = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <section className="page-container page-section"><SectionHeading eyebrow="Project not found" title="That case study isn’t here." /><Link className="text-link" to="/projects">Back to all projects ↗</Link></section>;
  const sectionTitles = caseStudySections[project.slug];
  const projectIndex = projects.indexOf(project);
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const activeImage = activeImageIndex === null ? null : project.gallery[activeImageIndex];

  function openGallery(index) {
    setActiveImageIndex(index);
    requestAnimationFrame(() => galleryDialog.current?.showModal());
  }

  function moveGallery(direction) {
    setActiveImageIndex((index) => (index + direction + project.gallery.length) % project.gallery.length);
  }

  function handleGalleryKeyDown(event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveGallery(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveGallery(-1);
    }
  }

  return (
    <article className="page-container page-section case-study mx-auto w-full max-w-[1320px] px-5 md:px-10">
      <Link className="back-link" to="/projects">← All projects</Link>
      <div className="case-study__intro"><div className="case-study__copy"><p className="eyebrow">{project.type} · {project.year}</p><h1>{project.title}</h1><p className="case-study__summary">{project.summary}</p><div className="tag-list">{project.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div><div className="case-study__links">{project.live && <a className="button button--primary" href={project.live} target="_blank" rel="noreferrer">Open live project ↗</a>}{project.repo && <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">View source code ↗</a>}</div></div><img className="case-study__cover" src={project.image} alt={project.imageAlt} onError={handleImageFallback} />
      </div>
      <div className="case-study__body">
        <section><p className="eyebrow">The context</p><h2>{sectionTitles[0]}</h2><p>{project.context}</p></section>
        <section><p className="eyebrow">My contribution</p><h2>{sectionTitles[1]}</h2><p>{project.contribution}</p></section>
        <section><p className="eyebrow">In the product</p><h2>{sectionTitles[2]}</h2><ul className="feature-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
      </div>
      <div className={`case-study__gallery case-study__gallery--count-${project.gallery.length}`} aria-label={`${project.title} screenshots`}>{project.gallery.map((image, index) => <figure key={image}>
        <button className="gallery-image-button group relative block w-full cursor-zoom-in overflow-hidden border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon" type="button" aria-label={`View full screenshot: ${project.galleryLabels[index]}`} onClick={() => openGallery(index)}>
          <img src={image} alt={`${project.title}: ${project.galleryLabels[index]}`} loading="lazy" onError={handleImageFallback} />
          <span className="gallery-image-hint pointer-events-none absolute bottom-3 right-3 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-semibold text-neon opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">View screenshot</span>
        </button>
        <figcaption>{project.galleryLabels[index]}</figcaption>
      </figure>)}</div>
      <dialog className="gallery-dialog m-auto w-[min(96vw,1400px)] max-w-none max-h-[94dvh] overflow-y-auto border border-line bg-paper p-3 text-ink shadow-2xl sm:p-5" ref={galleryDialog} aria-label={`${project.title} image viewer`} onKeyDown={handleGalleryKeyDown} onClose={() => setActiveImageIndex(null)} onClick={(event) => { if (event.target === galleryDialog.current) galleryDialog.current.close(); }}>
        {activeImage && <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-3 sm:gap-x-5">
          <p className="m-0 min-w-0 text-sm font-medium text-ink sm:text-base">{project.galleryLabels[activeImageIndex]}</p>
          <button className="grid size-11 place-items-center rounded-full border border-line bg-surface text-xl text-white transition hover:border-neon hover:text-neon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon" type="button" aria-label="Close image viewer" onClick={() => galleryDialog.current?.close()}>×</button>
          <img className="gallery-dialog__image col-span-2 row-start-2 max-h-[72dvh] w-full object-contain" src={activeImage} alt={`${project.title}: ${project.galleryLabels[activeImageIndex]}`} onError={handleImageFallback} />
          <button className="min-h-11 justify-self-start rounded-full border border-line px-4 text-sm font-semibold text-ink transition hover:border-neon hover:text-neon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon" type="button" aria-label="Previous screenshot" onClick={() => moveGallery(-1)}>← <span className="hidden sm:inline">Previous</span></button>
          <div className="flex items-center justify-self-end gap-3"><span className="text-xs tabular-nums text-muted" aria-live="polite">{activeImageIndex + 1} / {project.gallery.length}</span><button className="min-h-11 rounded-full border border-line px-4 text-sm font-semibold text-ink transition hover:border-neon hover:text-neon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon" type="button" aria-label="Next screenshot" onClick={() => moveGallery(1)}><span className="hidden sm:inline">Next</span> →</button></div>
        </div>}
      </dialog>
      <nav className="case-study__next" aria-label="Browse project case studies">
        <Link className="case-study__adjacent" to={previousProject.path}><span>Previous project</span><strong>{previousProject.title}</strong></Link>
        <Link className="case-study__all" to="/projects">All projects</Link>
        <Link className="case-study__adjacent case-study__adjacent--next" to={nextProject.path}><span>Next project</span><strong>{nextProject.title}</strong></Link>
      </nav>
    </article>
  );
}
