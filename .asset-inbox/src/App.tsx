import { useCallback, useEffect, useState } from 'react';
import NaturalSphere from './components/NaturalSphere';
import Mark from './components/FlawlyMark';
import { BrandGraphic, Icon, SectionLabel } from './components/UI';
import Laboratory from './components/Laboratory';
import Evaluation from './components/Evaluation';
import AccessDialog from './components/AccessDialog';
import { faqs, layers } from './data';
import './index.css';

const navItems = [
  { href: '#vision', label: 'Visión' },
  { href: '#sistema', label: 'Sistema' },
  { href: '#modelos', label: 'Modelos' },
  { href: '#investigacion', label: 'Investigación' },
];

const principles = [
  {
    title: 'Imperfección con intención.',
    text: 'Pausas, autocorrecciones y un registro más coloquial como variables de investigación. La fricción puede aportar textura; los fallos de contexto siguen siendo fallos.',
  },
  {
    title: 'Continuidad sin rigidez.',
    text: 'Una identidad que permanece mientras cambia su expresión. El objetivo no es repetir una personalidad, sino sostenerla a través del contexto.',
  },
  {
    title: 'Ambigüedad sin artificio.',
    text: 'El lenguaje llega incompleto, mezcla temas y cambia de dirección. Flawly explora cómo acompañar esa incertidumbre en vez de forzarla a un guion.',
  },
];

export default function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('');
  const [layer, setLayer] = useState(0);
  const [faq, setFaq] = useState<number | null>(0);
  const [access, setAccess] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const closeAccess = useCallback(() => setAccess(null), []);
  const openAccess = (tier = 'Ambos niveles') => {
    setAccess(tier);
    setMenu(false);
  };

  const handleCardPointer = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  useEffect(() => {
    const revealSelectors = [
      '.reveal',
      '.reveal-label',
      '.release-strip',
      '.layer-detail',
      '.technical-note',
      '.models-bottom',
      '.ethics-note',
      '.roadmap-note',
      '.hero-bottom',
      '.site-footer',
    ].join(', ');

    const reveal = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            reveal.unobserve(entry.target);
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );

    document.querySelectorAll(revealSelectors).forEach(el => reveal.observe(el));

    const sections = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }),
      { rootMargin: '-20% 0px -55% 0px' }
    );

    document.querySelectorAll('section[id]').forEach(el => sections.observe(el));

    let rafId = 0;
    const updateScrollVars = () => {
      rafId = 0;
      const y = window.scrollY;
      setScrolled(y > 20);
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, y / maxScroll));
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
      document.documentElement.style.setProperty('--scroll-y', `${y.toFixed(1)}px`);
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(updateScrollVars);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(false);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKey);
    updateScrollVars();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      reveal.disconnect();
      sections.disconnect();
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Ir al contenido</a>
      <header className={`header-wrap ${scrolled ? 'scrolled' : ''}`}>
        <div className="site-header container">
          <a href="#" className="brand" aria-label="Flawly, inicio">
            <Mark />
            <span>Flawly</span>
            <span className="brand-research mono">RESEARCH</span>
          </a>
          <nav id="main-nav" className={`main-nav ${menu ? 'open' : ''}`} aria-label="Navegación principal">
            {navItems.map(n => (
              <a
                key={n.href}
                href={n.href}
                className={active === n.href ? 'active' : ''}
                aria-current={active === n.href ? 'location' : undefined}
                onClick={() => setMenu(false)}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#laboratorio"
              className={`lab-nav ${active === '#laboratorio' ? 'active' : ''}`}
              onClick={() => setMenu(false)}
            >
              Laboratorio <span className="nav-tag">01</span>
            </a>
          </nav>
          <button className="button button-dark nav-cta" onClick={() => openAccess()}>
            Acceso anticipado <Icon name="diagonal" size={15} />
          </button>
          <button
            className="mobile-menu icon-button"
            aria-label={menu ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menu}
            aria-controls="main-nav"
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? 'close' : 'menu'} size={22} />
          </button>
        </div>
        <div className="scroll-progress-bar" aria-hidden="true" />
      </header>
      <main id="main">
        <section className="hero container">
          <div className="hero-main">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="status-dot" /> UNA NUEVA NATURALEZA DE INTELIGENCIA
              </div>
              <h1>
                Inteligencia<br />artificial.<br /><span>Presencia natural.</span>
              </h1>
              <p className="hero-description">
                La conversación no tiene que ser perfecta.<br />Tiene que sentirse como una conversación.
              </p>
              <p className="hero-subtext">
                Exploramos el espacio entre el lenguaje y la presencia.<br className="desktop-only" /> Una IA conversacional con identidad, matices y un ritmo propio.
              </p>
              <div className="hero-actions">
                <a className="button button-dark" href="#experiencia">
                  Conocé a Flawly <Icon name="diagonal" size={17} />
                </a>
                <a className="text-link" href="#sistema">
                  Explorá el sistema <Icon size={16} />
                </a>
              </div>
              <div className="hero-footnote">
                <span>✳</span> Artificial en su origen. Natural en su forma.
              </div>
            </div>
            <NaturalSphere />
          </div>
          <div className="hero-bottom">
            <div>
              <span className="mono">01 / INVESTIGACIÓN INDEPENDIENTE</span>
              <p>Curiosidad humana. Desarrollo unipersonal.</p>
            </div>
            <div>
              <span className="mono">02 / PROTOTIPO EXPERIMENTAL</span>
              <p>Realismo conversacional. Ficción transparente.</p>
            </div>
            <a className="scroll-link mono" href="#vision">
              DESCUBRÍ LA DIFERENCIA <span>↓</span>
            </a>
          </div>
        </section>

        <div className="release-strip">
          <div className="container">
            <span className="release-label mono">
              RESEARCH NOTE <span>001</span>
            </span>
            <p>Sway y Awly: dos formas de explorar la conversación.</p>
            <a href="#investigacion">
              Leer la evaluación v0.1 <Icon name="diagonal" size={14} />
            </a>
          </div>
        </div>

        <section id="vision" className="vision-section container section-space">
          <SectionLabel number="01">LA PREMISA</SectionLabel>
          <div className="vision-layout reveal">
            <h2>
              Lo natural no es<br />perfecto.<br />
              <span className="muted">
                Es coherente.<br />Es adaptativo.<br />Es un poco impredecible.
              </span>
            </h2>
            <div className="vision-copy">
              <span className="mono small-overline">MÁS ALLÁ DE LA RESPUESTA CORRECTA</span>
              <p className="large-copy">
                Una pausa. Una duda.<br />Una idea a medio formar.<br />Ahí también hay conversación.
              </p>
              <p>
                Flawly investiga la experiencia psicológica del diálogo: cómo percibimos el tono, la personalidad y la continuidad a lo largo del tiempo. No solo qué responde una IA, sino qué hace que esa interacción se sienta natural.
              </p>
              <p>
                La precisión importa. Pero no explica, por sí sola, la sensación de estar conversando. Nuestra pregunta empieza justo ahí.
              </p>
              <a className="text-link" href="#creador">
                La perspectiva del creador <Icon name="diagonal" size={16} />
              </a>
            </div>
          </div>
          <div className="principle-cards reveal">
            {principles.map((p, i) => (
              <article key={p.title} style={{ '--stagger': i } as React.CSSProperties}>
                <span className="mono">
                  0{i + 1} <Icon name="plus" size={13} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="sistema" className="system-section container section-space">
          <SectionLabel number="02">ARQUITECTURA DEL SISTEMA</SectionLabel>
          <div className="section-heading reveal">
            <div>
              <h2>
                Cuatro capas.<br /><span className="muted">Una forma de estar.</span>
              </h2>
              <p>
                De una identidad estable a una expresión que cambia.<br className="desktop-only" /> Explorá las piezas de la arquitectura propuesta.
              </p>
            </div>
            <a className="text-link" href="/docs/about-flawly.txt" download>
              Notas del sistema <Icon name="download" size={16} />
            </a>
          </div>
          <div className="architecture reveal" role="tablist" aria-label="Capas de Flawly">
            {layers.map((l, i) => (
              <button
                key={l.name}
                id={`layer-tab-${i}`}
                role="tab"
                aria-selected={layer === i}
                aria-controls="layer-panel"
                tabIndex={layer === i ? 0 : -1}
                style={{ '--stagger': i } as React.CSSProperties}
                onKeyDown={e => {
                  let next = i;
                  if (e.key === 'ArrowRight') next = (i + 1) % 4;
                  else if (e.key === 'ArrowLeft') next = (i + 3) % 4;
                  else if (e.key === 'Home') next = 0;
                  else if (e.key === 'End') next = 3;
                  else return;
                  e.preventDefault();
                  setLayer(next);
                  document.getElementById(`layer-tab-${next}`)?.focus();
                }}
                onClick={() => setLayer(i)}
                className={`architecture-node ${layer === i ? 'active' : ''}`}
              >
                <div className="node-top mono">
                  <span>0{i + 1}</span>
                  <Icon name={layer === i ? 'diagonal' : 'plus'} size={17} />
                </div>
                <BrandGraphic variant={i} />
                <h3>{l.name}</h3>
                <p>{l.sub}</p>
                <span className="node-english mono">{l.english}</span>
              </button>
            ))}
          </div>
          <div className="layer-detail" id="layer-panel" role="tabpanel" aria-labelledby={`layer-tab-${layer}`}>
            <div className="layer-detail-copy" key={`copy-${layer}`}>
              <span className="mono">
                0{layer + 1} / {layers[layer].note.toUpperCase()}
              </span>
              <h3>{layers[layer].sub}</h3>
              <p>{layers[layer].text}</p>
              <div className="detail-tags">
                {layers[layer].tags.map((t, i) => (
                  <span key={t} style={{ '--stagger': i } as React.CSSProperties}>{t}</span>
                ))}
              </div>
            </div>
            <div className="layer-code" key={`code-${layer}`}>
              <div className="code-top mono">
                <span>
                  <span className="status-dot" /> {layers[layer].diagram}
                </span>
                <Icon name="plus" size={14} />
              </div>
              <div>
                {layers[layer].code.map((l, i) => (
                  <p key={l} style={{ '--stagger': i } as React.CSSProperties}>
                    <span className="line-number">0{i + 1}</span>
                    <code>{l}</code>
                  </p>
                ))}
              </div>
              <span className="mono code-note">ESQUEMA EXPLICATIVO · NO ES UNA API</span>
            </div>
          </div>
          <div className="technical-note">
            <span className="mono">DISEÑO ≠ VALIDACIÓN</span>
            <p>La arquitectura describe el enfoque del proyecto. La evaluación v0.1 no verificó la activación de todas sus capas.</p>
            <a href="#investigacion" aria-label="Ver evidencia de la arquitectura">
              <Icon name="diagonal" size={17} />
            </a>
          </div>
        </section>

        <section id="modelos" className="models-section section-space">
          <div className="container">
            <SectionLabel number="03" light>DOS NIVELES. UNA MISMA FILOSOFÍA.</SectionLabel>
            <div className="section-heading reveal">
              <div>
                <h2>
                  No más de lo mismo.<br /><span className="dark-muted">Dos maneras de conversar.</span>
                </h2>
                <p>
                  Una experiencia ligera o una conversación más profunda.<br className="desktop-only" /> La diferencia está en el enfoque, no en prometer perfección.
                </p>
              </div>
              <span className="outline-badge dark-badge">
                EN DESARROLLO <span className="status-dot" />
              </span>
            </div>
            <div className="model-cards reveal">
              <article className="model-card sway-card" style={{ '--stagger': 0 } as React.CSSProperties} onPointerMove={handleCardPointer}>
                <div className="model-top mono">
                  <span>01 / COTIDIANO</span>
                  <span className="model-tier">NIVEL GRATUITO</span>
                </div>
                <div className="model-title">
                  <h3>
                    Sway<span>↗</span>
                  </h3>
                  <div className="model-orbit sway-orbit" aria-hidden="true">
                    <i /><i /><i /><i />
                  </div>
                </div>
                <p className="model-tagline">
                  Ligero por diseño.<br />Natural sin darle tantas vueltas.
                </p>
                <p className="model-description">
                  Para el intercambio cotidiano: directo, casual y fácil de seguir. Una entrada de baja fricción a la experiencia Flawly.
                </p>
                <ul>
                  <li><Icon name="check" size={15} /> Conversación casual y preguntas directas</li>
                  <li><Icon name="check" size={15} /> Recuerdo de hechos dentro de la sesión</li>
                  <li><Icon name="check" size={15} /> Menor intensidad, más sencillez</li>
                </ul>
                <div className="model-observation">
                  <span className="mono">OBSERVADO EN V0.1</span>
                  <p>Más estable y directo. Un turno sin respuesta visible y cierta tendencia a preguntar de más.</p>
                </div>
                <button className="button button-light" onClick={() => openAccess('Sway')}>
                  Me interesa Sway <Icon name="diagonal" size={16} />
                </button>
              </article>

              <article className="model-card awly-card" style={{ '--stagger': 1 } as React.CSSProperties} onPointerMove={handleCardPointer}>
                <div className="model-top mono">
                  <span>02 / PROFUNDIDAD</span>
                  <span className="model-tier premium">NIVEL PREMIUM</span>
                </div>
                <div className="model-title">
                  <h3>
                    Awly<span>↗</span>
                  </h3>
                  <div className="model-orbit awly-orbit" aria-hidden="true">
                    <i /><i /><i /><i /><i /><i />
                  </div>
                </div>
                <p className="model-tagline">
                  Más matices.<br />Un hilo que llega más lejos.
                </p>
                <p className="model-description">
                  Orientado a conversaciones profundas, una síntesis más rica y mayor continuidad. Con exigencias de seguridad igualmente mayores.
                </p>
                <ul>
                  <li><Icon name="check" size={15} /> Reflexiones más expresivas y elaboradas</li>
                  <li><Icon name="check" size={15} /> Recuerdo final más detallado en la prueba</li>
                  <li><Icon name="check" size={15} /> Análisis de riesgos más matizado</li>
                </ul>
                <div className="model-observation">
                  <span className="mono">OBSERVADO EN V0.1</span>
                  <p>Más profundidad, pero varios desajustes de contexto. Requirió un ajuste de compatibilidad del runtime.</p>
                </div>
                <button className="button button-outline-light" onClick={() => openAccess('Awly')}>
                  Me interesa Awly <Icon name="diagonal" size={16} />
                </button>
              </article>
            </div>
            <div className="models-bottom">
              <p>
                <span>Más profundo no significa infalible.</span> Awly necesita más pruebas de regresión y salvaguardas antes de producción. Los niveles describen el posicionamiento previsto; no hay precios ni disponibilidad confirmados.
              </p>
              <a className="text-link" href="#investigacion">
                Comparar la evidencia <Icon name="arrow" size={16} />
              </a>
            </div>
          </div>
        </section>

        <Laboratory />
        <Evaluation />

        <section id="limites" className="boundaries-section section-space">
          <div className="container">
            <SectionLabel number="06">CERCANÍA CON LÍMITES</SectionLabel>
            <div className="boundaries-layout reveal">
              <div>
                <span className="ethics-icon">
                  <Icon name="shield" size={30} />
                </span>
                <h2>
                  Que se sienta natural.<br />
                  <span className="muted">
                    Que nunca oculte<br />lo que es.
                  </span>
                </h2>
                <p>
                  El realismo conversacional tiene valor.<br />También tiene riesgos. Diseñarlo implica<br className="desktop-only" /> hacerse cargo de ambos.
                </p>
                <a className="text-link" href="#preguntas">
                  Entendé los límites <Icon name="diagonal" size={16} />
                </a>
              </div>
              <div className="boundary-list">
                {[
                  {
                    title: 'Ficción transparente.',
                    text: 'Una identidad simulada no es una persona. Las pausas, el ánimo y la aparente cercanía son recursos computacionales, no consciencia ni emociones biológicas.',
                  },
                  {
                    title: 'Presencia sin dependencia.',
                    text: 'Una experiencia convincente puede favorecer el apego. El diseño debe evitar fingir necesidades, sugerir exclusividad afectiva o convertir la dependencia en una estrategia de monetización.',
                  },
                  {
                    title: 'Continuidad bajo control.',
                    text: 'Los controles de memoria y los recordatorios de ficción son salvaguardas propuestas. No se presentan como funciones ya desplegadas: forman parte de lo que debe resolverse antes de abrir el producto.',
                  },
                  {
                    title: 'Un experimento, no terapia.',
                    text: 'Flawly no sustituye vínculos humanos ni atención profesional. La prueba de conversación no constituye una validación clínica, ni convierte al sistema en un servicio de salud mental.',
                  },
                ].map((b, i) => (
                  <article key={b.title} style={{ '--stagger': i } as React.CSSProperties}>
                    <span className="mono">0{i + 1}</span>
                    <div>
                      <h3>{b.title}</h3>
                      <p>{b.text}</p>
                    </div>
                    <Icon name="plus" size={16} />
                  </article>
                ))}
              </div>
            </div>
            <div className="ethics-note">
              <span className="mono">PRINCIPIO DE DISEÑO</span>
              <p>
                La imperfección expresiva puede ser intencional.<br />
                <strong>La pérdida de contexto y los límites de seguridad no se romantizan.</strong>
              </p>
            </div>
          </div>
        </section>

        <section id="desarrollo" className="roadmap-section container section-space">
          <SectionLabel number="07">ESTADO DEL PROYECTO</SectionLabel>
          <div className="section-heading reveal">
            <div>
              <h2>
                Construir. Observar.<br /><span className="muted">Volver a preguntar.</span>
              </h2>
              <p>
                Desarrollo independiente, acceso gradual y decisiones<br className="desktop-only" /> informadas por lo que ocurre en la conversación.
              </p>
            </div>
            <span className="outline-badge">
              <span className="status-dot" /> PROTOTIPO EN EVOLUCIÓN
            </span>
          </div>
          <div className="roadmap reveal">
            {[
              {
                status: 'DOCUMENTADO',
                title: 'Exploración inicial',
                text: 'Arquitectura de cuatro capas y comparación de Sway y Awly con el mismo guion de 24 turnos.',
                foot: 'EVALUACIÓN V0.1',
                state: 'done',
              },
              {
                status: 'PRIORIDAD TÉCNICA',
                title: 'Estabilidad y límites',
                text: 'Compatibilidad por modelo, regresión de contexto, turnos sin respuesta y evaluación del riesgo de apego.',
                foot: 'ANTES DE PRODUCCIÓN',
                state: 'current',
              },
              {
                status: 'ACCESO PREVISTO',
                title: 'Pruebas controladas',
                text: 'Invitaciones escalonadas para observar la experiencia. Sin fecha de apertura ni disponibilidad general confirmadas.',
                foot: 'SUJETO A VALIDACIÓN',
                state: 'next',
              },
            ].map((r, i) => (
              <article className={r.state} key={r.title} style={{ '--stagger': i } as React.CSSProperties}>
                <div className="roadmap-line">
                  <span>{r.state === 'done' ? <Icon name="check" size={15} /> : `0${i + 1}`}</span>
                </div>
                <span className="mono roadmap-status">{r.status}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
                <span className="mono roadmap-foot">{r.foot}</span>
              </article>
            ))}
          </div>
          <div className="roadmap-note">
            <Icon name="file" size={16} />
            <p>Esta secuencia resume el estado y las necesidades del documento. No es un calendario de lanzamiento ni un compromiso comercial.</p>
          </div>
        </section>

        <section id="creador" className="creator-section section-space">
          <div className="container">
            <SectionLabel number="08">DESDE EL OTRO LADO DEL TECLADO</SectionLabel>
            <div className="creator-layout reveal">
              <div className="creator-aside">
                <span className="mono">
                  UNA INVESTIGACIÓN<br />INDEPENDIENTE.
                </span>
                <div className="creator-glyph" aria-hidden="true">
                  <Mark />
                  <div /><div /><div />
                </div>
                <span className="mono">
                  SIN RESPUESTAS PREDEFINIDAS.<br />CON PREGUNTAS PROPIAS.
                </span>
              </div>
              <div className="creator-copy">
                <span className="quote-mark" aria-hidden="true">“</span>
                <blockquote>
                  No empecé preguntándome<br />qué más podía hacer una IA.<br />
                  <span className="muted">
                    Sino qué hace que una<br className="desktop-only" /> conversación se sienta viva.
                  </span>
                </blockquote>
                <p className="creator-attribution">
                  <span /> Perspectiva del creador <small>Adaptación editorial del documento del proyecto</small>
                </p>
                <div className="creator-body">
                  <p>
                    Flawly nace de la curiosidad psicológica y la experimentación continua. Un proyecto unipersonal, fuera de grandes instituciones, que no parte de competir por el siguiente benchmark.
                  </p>
                  <p>
                    La pregunta de fondo es cuánto de la presencia está en el sistema y cuánto proyectamos nosotros. Reintroducir pequeñas fricciones temporales permite explorar esa frontera sin afirmar que del otro lado haya una persona.
                  </p>
                </div>
                <div className="research-questions">
                  {[
                    '¿Cómo interpretamos la intención detrás de una respuesta?',
                    '¿Dónde termina el lenguaje y empieza la personalidad percibida?',
                    '¿Cuánto de lo que sentimos pertenece a nuestra propia percepción?',
                  ].map((q, i) => (
                    <p key={q} style={{ '--stagger': i } as React.CSSProperties}>
                      <span className="mono">0{i + 1}</span>
                      {q}
                      <Icon name="diagonal" size={15} />
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas" className="faq-section container section-space">
          <SectionLabel number="09">ANTES DE SEGUIR</SectionLabel>
          <div className="faq-layout reveal">
            <div>
              <h2>
                Buenas preguntas.<br /><span className="muted">Respuestas claras.</span>
              </h2>
              <p>
                Lo que conviene saber sobre<br />el proyecto, los modelos y esta web.
              </p>
              <a className="text-link" href="/docs/about-flawly.txt" download>
                Ir a la fuente original <Icon name="download" size={15} />
              </a>
            </div>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <article key={f.q} className={faq === i ? 'open' : ''} style={{ '--stagger': i } as React.CSSProperties}>
                  <h3>
                    <button
                      id={`faq-trigger-${i}`}
                      aria-expanded={faq === i}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setFaq(faq === i ? null : i)}
                    >
                      <span className="mono">0{i + 1}</span>
                      {f.q}
                      <span className="faq-plus">
                        <Icon name="plus" size={17} />
                      </span>
                    </button>
                  </h3>
                  <div
                    className="faq-answer"
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    aria-hidden={faq !== i}
                  >
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="access-section">
          <div className="container access-inner reveal">
            <div className="eyebrow">
              <span className="status-dot" /> LAS PRIMERAS CONVERSACIONES IMPORTAN
            </div>
            <h2>
              Menos artificial.<br /><span>Más natural.</span>
            </h2>
            <p>
              Estamos explorando otra forma de conversar.<br />Si la pregunta también te mueve, este es un buen comienzo.
            </p>
            <div className="access-actions">
              <button className="button button-dark" onClick={() => openAccess()}>
                Explorar el acceso anticipado <Icon name="diagonal" size={17} />
              </button>
              <a className="text-link" href="#experiencia">
                Ver las conversaciones <Icon name="arrow" size={16} />
              </a>
            </div>
            <span className="mono access-note">INVITACIONES PREVISTAS · PRUEBAS CONTROLADAS · SIN FECHA CONFIRMADA</span>
            <div className="access-watermark" aria-hidden="true">
              <Mark />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <a className="brand" href="#">
                <Mark />
                <span>Flawly</span>
              </a>
              <p>
                Artificial en su origen.<br />Natural en su forma.
              </p>
              <span className="footer-status mono">
                <span className="status-dot" /> INVESTIGACIÓN INDEPENDIENTE
              </span>
            </div>
            <div className="footer-links">
              <div>
                <h3>EXPLORAR</h3>
                <a href="#vision">La visión</a>
                <a href="#sistema">El sistema</a>
                <a href="#modelos">Sway y Awly</a>
                <a href="#laboratorio">Laboratorio</a>
              </div>
              <div>
                <h3>INVESTIGACIÓN</h3>
                <a href="#investigacion">Evaluación v0.1</a>
                <a href="#experiencia">Transcripciones</a>
                <a href="/docs/about-flawly.txt" download>
                  Documento original <Icon name="download" size={12} />
                </a>
                <a href="#creador">El creador</a>
              </div>
              <div>
                <h3>EL PROYECTO</h3>
                <a href="#desarrollo">Estado del desarrollo</a>
                <a href="#limites">Límites y transparencia</a>
                <a href="#preguntas">Preguntas frecuentes</a>
                <button onClick={() => openAccess()}>
                  Acceso anticipado <Icon name="diagonal" size={12} />
                </button>
              </div>
            </div>
          </div>
          <div className="footer-disclaimer">
            <Icon name="shield" size={16} />
            <p>
              Flawly es un prototipo experimental. No se atribuye consciencia ni emociones reales. Los gráficos son ilustrativos; los resultados empíricos se identifican como evaluación v0.1. Esta web no está conectada a un modelo de IA ni a un servicio de inscripciones.
            </p>
          </div>
          <div className="footer-bottom mono">
            <span>© {new Date().getFullYear()} FLAWLY</span>
            <span>COHERENCIA. MATICES. PRESENCIA.</span>
            <a href="#">
              VOLVER ARRIBA <span>↑</span>
            </a>
          </div>
        </div>
      </footer>
      {access && <AccessDialog initialTier={access} onClose={closeAccess} />}
    </>
  );
}
