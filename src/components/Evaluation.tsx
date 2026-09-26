import { useState } from 'react';
import { excerpts, metrics } from '../data';
import Mark from './FlawlyMark';
import { Icon, SectionLabel } from './UI';

export default function Evaluation() {
  const [filter, setFilter] = useState('all');
  const [excerpt, setExcerpt] = useState(0);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [tier, setTier] = useState<'sway' | 'awly'>('sway');
  const selected = excerpts[excerpt];
  const text = language === 'es' ? selected[tier === 'sway' ? 'swayEs' : 'awlyEs'] : selected[tier];
  return (
    <section id="investigacion" className="evaluation-section container section-space">
      <SectionLabel number="05">EVIDENCIA, NO PROMESAS</SectionLabel>
      <div className="section-heading reveal">
        <div>
          <h2>Lo que probamos.<br /><span className="muted">Lo que todavía no.</span></h2>
          <p>Una evaluación empírica del prototipo. Resultados concretos,<br className="desktop-only" /> limitaciones a la vista y ninguna conclusión inflada.</p>
        </div>
        <a className="text-link" href="docs/about-flawly.txt" download>Descargar informe completo <Icon name="download" size={16} /></a>
      </div>
      <div className="study-summary reveal">
        <div><span className="mono">DISEÑO DE LA PRUEBA</span><strong>Un mismo guion.<br />Dos niveles.</strong></div>
        <div><strong>24<span>× 2</span></strong><span>turnos de usuario por nivel</span></div>
        <div><strong>v0.1</strong><span>evaluación del prototipo</span></div>
        <div><span className="study-tag"><span className="status-dot" /> PRUEBA EXPLORATORIA</span><p>Conversación, memoria de sesión, aritmética y reflexión sobre riesgos.</p></div>
      </div>
      <div className="evaluation-table-wrap reveal">
        <div className="table-toolbar">
          <h3>Resultados observados</h3>
          <div className="segmented compact" aria-label="Filtrar resultados">
            {[{ id: 'all', label: 'Todos' }, { id: 'quant', label: 'Datos' }, { id: 'qual', label: 'Observaciones' }].map(f => (
              <button key={f.id} className={filter === f.id ? 'active' : ''} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
          </div>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">MÉTRICA / OBSERVACIÓN</th>
                <th scope="col"><span className="table-model"><i /> Sway</span></th>
                <th scope="col"><span className="table-model awly"><i /> Awly</span></th>
              </tr>
            </thead>
            <tbody>
              {metrics.filter(m => filter === 'all' || m.type === filter).map((m, i) => (
                <tr key={m.name} style={{ '--row-idx': i } as React.CSSProperties}>
                  <th scope="row">{m.name}</th>
                  <td>{m.sway}</td>
                  <td>{m.awly}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="table-note"><span>LECTURA CORRECTA</span> «Bueno», «medio» o «alto» son valoraciones cualitativas del informe, no escalas estandarizadas.</p>
      </div>
      <div className="caveat-grid reveal">
        <article><span className="mono">01 / COMPATIBILIDAD</span><h4>El runtime también importa.</h4><p>Awly rechazó un parámetro de muestreo. Se ajustó el entorno de prueba para retirarlo, manteniendo el prompt, las herramientas, el historial y el bucle de comportamiento.</p></article>
        <article><span className="mono">02 / ESTADO EMOCIONAL</span><h4>Cero registros. En ambos.</h4><p>La naturalidad observada provino del estilo de respuesta y del historial. Ningún nivel activó el registro de estado «emotional-weather» durante estas pruebas.</p></article>
        <article><span className="mono">03 / ALCANCE</span><h4>Una sesión no es un benchmark.</h4><p>El ensayo no demuestra memoria entre sesiones, seguridad clínica ni superioridad general. Los mensajes visibles tampoco permiten verificar todo el razonamiento interno.</p></article>
      </div>
      <div id="experiencia" className="transcript-section reveal">
        <div className="transcript-heading">
          <div><span className="mono">DENTRO DE LA PRUEBA</span><h3>Leé la conversación.<br />Sacá tus propias conclusiones.</h3></div>
          <p>Fragmentos de sesiones reales del prototipo.<br />No es un chat conectado ni una conversación generada en esta página.</p>
        </div>
        <div className="transcript-viewer">
          <aside className="transcript-sidebar">
            <span className="mono">EXPLORAR FRAGMENTOS</span>
            {excerpts.map((e, i) => (
              <button key={e.label} style={{ '--stagger': i } as React.CSSProperties} className={excerpt === i ? 'active' : ''} onClick={() => setExcerpt(i)} aria-pressed={excerpt === i}>
                <span className="mono">0{i + 1}</span>
                <span>{e.label}<small>Turno {e.turn}</small></span>
                <Icon name="diagonal" size={14} />
              </button>
            ))}
            <div className="source-card">
              <Icon name="file" size={20} />
              <strong>El contexto completo importa.</strong>
              <p>Consultá ambos registros íntegros en el documento original.</p>
              <a href="docs/about-flawly.txt" download>Ver documento <Icon name="download" size={13} /></a>
            </div>
          </aside>
          <div className="transcript-main">
            <div className="transcript-toolbar">
              <div className="model-tabs" aria-label="Modelo de la transcripción">
                <button className={tier === 'sway' ? 'active' : ''} onClick={() => setTier('sway')} aria-pressed={tier === 'sway'}><Mark small />Sway</button>
                <button className={tier === 'awly' ? 'active' : ''} onClick={() => setTier('awly')} aria-pressed={tier === 'awly'}><Mark small />Awly</button>
              </div>
              <div className="language-switch" aria-label="Idioma del fragmento">
                <button aria-pressed={language === 'es'} onClick={() => setLanguage('es')} className={language === 'es' ? 'active' : ''}>ES</button>
                <span>/</span>
                <button aria-pressed={language === 'en'} onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
              </div>
            </div>
            <div className="transcript-messages" key={`${tier}-${excerpt}-${language}`}>
              <div className="transcript-user">
                <span className="mono">USUARIO</span>
                <p lang={language}>{language === 'es' ? selected.questionEs : selected.question}</p>
              </div>
              <div className="transcript-assistant">
                <div className="assistant-avatar"><Mark small /></div>
                <div>
                  <strong>{tier === 'sway' ? 'Sway' : 'Awly'}<span className="mono">REGISTRO DEL PROTOTIPO</span></strong>
                  <p lang={language}>{text || (language === 'es' ? 'Resultado documentado: 16. El informe confirma el recuerdo correcto de Awly. Consultá el registro íntegro para leer su respuesta textual.' : 'Documented result: 16. The report confirms correct recall by Awly. See the full source for the verbatim response.')}</p>
                </div>
              </div>
            </div>
            <div className="translation-note mono">
              <span className="status-dot" />
              {language === 'es' ? 'TRADUCCIÓN EDITORIAL · ORIGINAL DISPONIBLE EN EN' : 'ORIGINAL EN INGLÉS · FRAGMENTO SIN REESCRITURA'}
            </div>
          </div>
        </div>
        <div className="excerpt-insight" key={`insight-${excerpt}`}>
          <span className="mono">QUÉ OBSERVAR <Icon name="arrow" size={15} /></span>
          <p aria-live="polite">{selected.note}</p>
        </div>
      </div>
    </section>
  );
}
