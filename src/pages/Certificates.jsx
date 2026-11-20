import { useRef, useState } from 'react';
import SectionHeading from '../components/SectionHeading.jsx';
import { certificates } from '../data/portfolio.js';
import { handleImageFallback } from '../components/imageFallback.js';

const filters = [['all', 'All'], ['huawei', 'Huawei ICT'], ['dicoding', 'Dicoding'], ['etc', 'ETC'], ['gunadarma', 'Gunadarma']];

export default function Certificates() {
  const [active, setActive] = useState('all');
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const shown = active === 'all' ? certificates : certificates.filter((cert) => cert.category === active);

  function openPreview(cert) {
    setSelected(cert);
    requestAnimationFrame(() => dialog.current?.showModal());
  }

  return (
    <section className="page-container page-section certificates-page mx-auto w-full max-w-[1320px] px-5 md:px-10">
      <SectionHeading eyebrow="Certificates · completed learning" title="Courses, practice, and proof of completion." description="Technology and language certificates, kept alongside the original documents where available." />
      <div className="certificate-summary"><strong>10</strong><span>certificates</span><span className="summary-divider" /><strong>4</strong><span>issuers</span></div>
      <div className="filter-row" role="group" aria-label="Filter certificates">{filters.map(([id, label]) => <button type="button" key={id} aria-pressed={active === id} className={`filter-button ${active === id ? 'is-active' : ''}`} onClick={() => setActive(id)}>{label}</button>)}</div>
      <div className="certificate-grid" aria-live="polite">
        {shown.map((cert, index) => <article className="certificate-item" style={{ '--filter-index': index }} key={cert.title}>
          <button className="certificate-image" type="button" onClick={() => openPreview(cert)} aria-label={`View ${cert.title} certificate`}><img src={cert.image} alt={`${cert.title} certificate from ${cert.issuer}`} loading="lazy" onError={handleImageFallback} /><span>View document ↗</span></button>
          <div className="certificate-copy"><p className="eyebrow">{cert.issuer}</p><h2>{cert.title}</h2>{cert.date && <p>{cert.date}{cert.note ? ` · ${cert.note}` : ''}</p>}{cert.pdf && <a href={cert.pdf} target="_blank" rel="noreferrer">Open original PDF ↗</a>}</div>
        </article>)}
      </div>
      <dialog className="certificate-dialog" ref={dialog} onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}>
        <button type="button" className="dialog-close" aria-label="Close certificate preview" onClick={() => dialog.current?.close()}>×</button>
        {selected && <><img src={selected.image} alt={`${selected.title} certificate from ${selected.issuer}`} onError={handleImageFallback} /><div className="certificate-dialog__caption"><strong>{selected.title}</strong><span>{selected.issuer}</span></div></>}
      </dialog>
    </section>
  );
}
