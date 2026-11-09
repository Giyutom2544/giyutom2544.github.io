import { useEffect, useState } from 'react';
import { sections } from '../data/site';
import { useActiveSection } from '../lib/hooks';
import { scrollToId } from '../lib/scroll';

const ids = sections.map((s) => s.id);

export default function Nav() {
  const active = useActiveSection(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`} aria-label="Main">
      <a href="#top" className="logo" onClick={(e) => go(e, 'top')} aria-label="Back to top">
        M
      </a>
      <button className="nav-toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((o) => !o)}>
        <span className="sr-only">Menu</span>
        <span className="bar" />
        <span className="bar" />
      </button>
      <ul id="nav-links" className="nav-links">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={active === s.id ? 'active' : ''}
              aria-current={active === s.id ? 'true' : undefined}
              onClick={(e) => go(e, s.id)}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
