import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Skills from './pages/Skills.jsx';
import Projects from './pages/Projects.jsx';
import Experience from './pages/Experience.jsx';
import Certificates from './pages/Certificates.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import { profile, projects } from './data/portfolio.js';

function RouteEffects() {
  const location = useLocation();
  useEffect(() => {
    document.documentElement.classList.add('motion-ready');
    const revealItems = document.querySelectorAll('main section, main > header, .page-section, .works__card, .services__card, .skill-item, .about-experience__item');
    revealItems.forEach((item, index) => {
      item.dataset.reveal = '';
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
    });
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach((item) => revealObserver.observe(item));

    const isSkills = location.pathname === '/skills';
    const isExperience = location.pathname === '/experience';
    const isCertificate = location.pathname === '/certificates';
    const isAbout = location.pathname === '/about';
    const isProject = location.pathname === '/projects' || location.pathname.startsWith('/projects/');
    const currentProject = projects.find((project) => project.path === location.pathname);
    const pageName = isSkills ? 'Skills' : isExperience ? 'Experience' : isCertificate ? 'Certificates' : isAbout ? 'About' : isProject ? 'Projects' : '';
    document.title = currentProject ? `${currentProject.title} — ${profile.name}` : pageName ? `${pageName} — ${profile.name}` : `${profile.name} — Full-Stack Developer`;
    const description = currentProject?.summary || (isSkills ? 'Technologies Ardhian has applied in web projects, with a note on where each one was used.'
      : isExperience ? 'Web development internships, training, work, and education for Ardhian Maulana Tanjung.'
        : isCertificate ? 'Technology and language course certificates completed by Ardhian Maulana Tanjung.'
          : isAbout ? 'About Ardhian Maulana Tanjung, an Informatics Engineering graduate and full-stack developer.'
            : isProject ? 'Selected full-stack projects, with product context, implementation details, demos, and source code.'
              : 'Ardhian Maulana Tanjung is a full-stack developer building useful web applications for everyday work.');
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.name = 'description';
      document.head.append(descriptionTag);
    }
    descriptionTag.content = description;
    if (location.hash) {
      requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    return () => {
      revealObserver.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, [location]);
  return null;
}

export default function App() {
  return (
    <SiteLayout>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/about.html" element={<Navigate to="/about" replace />} />
        <Route path="/skills.html" element={<Navigate to="/skills" replace />} />
        <Route path="/project.html" element={<Navigate to="/projects" replace />} />
        <Route path="/experience.html" element={<Navigate to="/experience" replace />} />
        <Route path="/certificate.html" element={<Navigate to="/certificates" replace />} />
        {projects.map((project) => <Route key={project.slug} path={project.legacyPath} element={<Navigate to={project.path} replace />} />)}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}
