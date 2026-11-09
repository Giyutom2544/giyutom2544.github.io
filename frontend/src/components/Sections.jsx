import { lazy, Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { about, education, experience, hero, honors, links, projects, skills } from '../data/site';
import { usePrefersReducedMotion } from '../lib/hooks';
import { scrollToId } from '../lib/scroll';
import { Item, Section, SpotlightCard, Tags } from './ui';

const StarField = lazy(() => import('./StarField'));
const ease = [0.22, 1, 0.36, 1];

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const rise = (delay) =>
    reduced ? {} : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay, ease } };
  return (
    <header id="top" className="hero">
      <Suspense fallback={null}>
        <StarField />
      </Suspense>
      <div className="hero-inner">
        <motion.p className="motto" {...rise(0.1)}>
          {hero.motto}
        </motion.p>
        <motion.h1 {...rise(0.2)}>
          {hero.first} <em>{hero.last}</em>
        </motion.h1>
        <motion.p className="tagline" {...rise(0.35)}>
          {hero.tagline}
        </motion.p>
      </div>
      <a
        href="#about"
        className="scroll-hint"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('about');
        }}
      >
        <span>scroll</span>
        <span className="scroll-line" aria-hidden="true" />
      </a>
    </header>
  );
}

export function About() {
  return (
    <Section id="about" eyebrow="01" title="About">
      <div className="about-grid">
        <Item className="lede">
          {about.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Item>
        <Item>
          <h3 className="sub">Interests</h3>
          <Tags items={about.interests} />
        </Item>
      </div>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" eyebrow="02" title="Education">
      <ol className="timeline">
        {education.map((e) => (
          <Item as="li" key={e.school} className="timeline-row">
            <div className="row-meta">{e.dates || ''}</div>
            <div>
              <h3>{e.school}</h3>
              <p>{e.detail}</p>
              {e.note && <p className="muted">{e.note}</p>}
            </div>
          </Item>
        ))}
      </ol>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" eyebrow="03" title="Skills">
      <div className="skills-grid">
        {Object.entries(skills).map(([group, items]) => (
          <Item key={group}>
            <h3 className="sub">{group}</h3>
            <Tags items={items} />
          </Item>
        ))}
      </div>
    </Section>
  );
}

function ExperienceCard({ job }) {
  const [open, setOpen] = useState(false);
  const id = `more-${job.role.replace(/\W+/g, '-').toLowerCase()}`;
  return (
    <SpotlightCard as="article" className="exp-card">
      <div className="card-top">
        <h3>{job.role}</h3>
        {job.dates && <span className="dates">{job.dates}</span>}
      </div>
      <p>{job.summary}</p>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="more"
            className="more"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <ul>
              {job.more.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            {job.links && (
              <div className="link-row">
                {job.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="card-bottom">
        <Tags items={job.tags} />
        <button className="more-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          {open ? 'Show less' : 'Show more'}
        </button>
      </div>
    </SpotlightCard>
  );
}

export function Experience() {
  return (
    <Section id="experience" eyebrow="04" title="Experience">
      <div className="card-grid">
        {experience.map((job) => (
          <ExperienceCard key={job.role} job={job} />
        ))}
      </div>
    </Section>
  );
}

export function Projects() {
  return (
    <Section id="projects" eyebrow="05" title="Projects">
      <div className="card-grid projects">
        {projects.map((p) => (
          <SpotlightCard
            as="a"
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            data-cursor="view"
          >
            <h3>{p.title}</h3>
            <p>{p.blurb}</p>
            <div className="card-bottom">
              <Tags items={p.tags} />
              <span className="cta">{p.cta} ↗</span>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  );
}

export function Honors() {
  return (
    <Section id="honors" eyebrow="06" title="Honors">
      <ol className="honors">
        {honors.map((h, i) => (
          <Item as="li" key={h.title}>
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <span className="h-title">{h.title}</span>
            <span className="h-meta">
              <span className="medal">{h.medal}</span>
              <span className="year">{h.year}</span>
            </span>
          </Item>
        ))}
      </ol>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 Monica Macaes · Growing Dreams</span>
      <a href={links.github} target="_blank" rel="noopener noreferrer">
        GitHub ↗
      </a>
    </footer>
  );
}
