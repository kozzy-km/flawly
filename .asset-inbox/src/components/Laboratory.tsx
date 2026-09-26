import { useEffect, useMemo, useState } from 'react';
import { Icon, SectionLabel } from './UI';

const modes = [
  { name: 'Equilibrado', short: 'Calma y continuidad', base: 150, amp: 75, pause: 125, description: 'Intervalos moderados, con pequeñas pausas. Un ritmo estable sin ser mecánico.' },
  { name: 'Expresivo', short: 'Energía y contraste', base: 90, amp: 65, pause: 160, description: 'Ráfagas cortas y rápidas, interrumpidas por pausas más marcadas.' },
  { name: 'Agotado', short: 'Menos energía, más espacio', base: 310, amp: 115, pause: 215, description: 'Una entrega más espaciada. La fatiga es un parámetro simulado, no una sensación.' },
];
const phrase = 'No siempre hace falta una respuesta perfecta. A veces, alcanza con encontrar el ritmo.';
const profiles = [
  { name: 'Flawly', x: 71, y: 23, tag: 'OBJETIVO DE INVESTIGACIÓN', description: 'Explorar una conversación con identidad y variación temporal, sin abandonar la coherencia. Esta posición representa una intención de diseño; no es una puntuación medida.' },
  { name: 'Asistente de tareas', x: 84, y: 69, tag: 'PERFIL ILUSTRATIVO', description: 'Prioriza resolver una tarea de forma directa y estructurada. El mapa no atribuye esta posición a un proveedor o modelo específico.' },
  { name: 'Chatbot de reglas', x: 25, y: 81, tag: 'PERFIL ILUSTRATIVO', description: 'Responde sobre flujos y reglas predefinidas. Es útil en dominios acotados, aunque deja menos espacio para variaciones conversacionales.' },
  { name: 'Referente humano', x: 32, y: 18, tag: 'REFERENCIA CONCEPTUAL', description: 'La conversación humana tiene pausas, variabilidad y contexto imperfecto. Es un referente de estudio, no una capacidad que Flawly afirme reproducir por completo.' },
];

export default function Laboratory() {
  const [mode, setMode] = useState(0);
  const [variation, setVariation] = useState(65);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [profile, setProfile] = useState(0);
  const values = useMemo(() => Array.from({ length: phrase.length }, (_, i) => Math.max(25, Math.round(modes[mode].base + (Math.sin(i * 1.57) * modes[mode].amp + Math.cos(i * .64) * 32 + (i % 13 === 0 ? modes[mode].pause : 0)) * variation / 65))), [mode, variation]);
  const mean = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  useEffect(() => {
    if (!playing) return;
    if (progress >= phrase.length) { setPlaying(false); return; }
    const timer = setTimeout(() => setProgress(p => p + 1), values[progress]);
    return () => clearTimeout(timer);
  }, [playing, progress, values]);
  const chartX = (i: number) => 42 + i / (values.length - 1) * 638;
  const chartY = (v: number) => 217 - Math.min(v, 800) / 800 * 185;
  const path = values.map((v, i) => `${i ? 'L' : 'M'}${chartX(i).toFixed(1)},${chartY(v).toFixed(1)}`).join(' ');
  const index = hover ?? Math.min(progress, values.length - 1);
  return <section id="laboratorio" className="lab-section section-space">
    <div className="container">
      <SectionLabel number="04">LABORATORIO DE EXPRESIÓN</SectionLabel>
      <div className="section-heading reveal"><div><h2>El tiempo también<br /><span className="muted">dice algo.</span></h2><p>Una pausa puede cambiar cómo se percibe una frase.<br className="desktop-only" /> Explorá la diferencia entre entregar texto y construir un ritmo.</p></div><span className="outline-badge"><span className="status-dot" /> SIMULACIÓN INTERACTIVA</span></div>
      <div className="rhythm-panel reveal">
        <div className="panel-title"><div><span className="mono">EXPERIMENTO 01</span><h3>Entropía del ritmo lingüístico</h3></div><span className="mono muted">INTERVALO ENTRE CARACTERES / MS</span></div>
        <div className="rhythm-body">
          <div className="rhythm-chart">
            <div className="segmented" aria-label="Modo de ritmo">{modes.map((m, i) => <button key={m.name} aria-pressed={mode === i} className={mode === i ? 'active' : ''} onClick={() => { setMode(i); setProgress(0); }}>{m.name}</button>)}</div>
            <div className="chart-wrap" onPointerLeave={() => setHover(null)}>
              <svg viewBox="0 0 720 250" role="img" aria-label={`Intervalos simulados en modo ${modes[mode].name}. Promedio de ${mean} milisegundos.`} onPointerMove={e => { const rect = e.currentTarget.getBoundingClientRect(); setHover(Math.max(0, Math.min(values.length - 1, Math.round(((e.clientX - rect.left) / rect.width * 720 - 42) / 638 * (values.length - 1))))); }}>
                {[0, 200, 400, 600, 800].map(v => <g key={v}><line x1="42" x2="680" y1={chartY(v)} y2={chartY(v)} stroke="var(--line)" strokeDasharray="3 5" /><text x="28" y={chartY(v) + 4} textAnchor="end">{v}</text></g>)}
                <path d={`${path} L680,217 L42,217 Z`} className="chart-area" fill="var(--chart-fill)" />
                <line x1="42" x2="680" y1={chartY(125)} y2={chartY(125)} stroke="#9a9c92" strokeWidth="1.4" strokeDasharray="6 5" />
                <path d={path} pathLength={1} className="rhythm-line" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
                {(playing || hover !== null || progress > 0) && <g><line x1={chartX(index)} x2={chartX(index)} y1="20" y2="217" stroke="#8a9b65" strokeDasharray="3 3" /><circle cx={chartX(index)} cy={chartY(values[index])} r="4.5" fill="#87975d" stroke="var(--paper)" strokeWidth="2" /></g>}
                <text x="42" y="241">INICIO</text><text x="680" y="241" textAnchor="end">SECUENCIA DE ESCRITURA →</text>
              </svg>
              {hover !== null && <div className="chart-tooltip mono">CARÁCTER {hover + 1} <b>{values[hover]} ms</b></div>}
            </div>
            <div className="chart-legend mono"><span><i /> RITMO VARIABLE</span><span><i className="dashed" /> REFERENCIA UNIFORME · 125 MS</span></div>
          </div>
          <aside className="rhythm-settings"><span className="mono">ESTADO SIMULADO / 0{mode + 1}</span><h4>{modes[mode].short}</h4><p>{modes[mode].description}</p><div className="rhythm-value"><strong>{mean}<span>ms</span></strong><span>intervalo medio<br />simulado</span></div><label className="range-label" htmlFor="variation">Variación temporal <span>{variation}%</span></label><input id="variation" type="range" min="0" max="100" value={variation} onChange={e => setVariation(Number(e.target.value))} style={{ '--range': `${variation}%` } as React.CSSProperties} /><div className="range-ends mono"><span>UNIFORME</span><span>VARIABLE</span></div></aside>
        </div>
        <div className="rhythm-playback"><div className="playback-controls"><button className="play-button" onClick={() => { if (progress === phrase.length) setProgress(0); setPlaying(p => !p); }} aria-label={playing ? 'Pausar simulación' : 'Reproducir simulación'}><Icon name={playing ? 'pause' : 'play'} size={17} /></button><button className="icon-button" aria-label="Reiniciar simulación" onClick={() => { setProgress(0); setPlaying(true); }}><Icon name="replay" size={17} /></button></div><p aria-label={phrase}>{progress === 0 ? <span className="muted">Reproducí la misma frase con otro ritmo.</span> : phrase.slice(0, progress)}{playing && <i className="typing-cursor" />}</p><span className="mono playback-status">{playing ? 'ESCRIBIENDO' : progress === phrase.length ? 'COMPLETADO' : 'EN PAUSA'}</span></div>
        <div className="panel-footnote"><Icon name="file" size={14} /><p>Datos sintéticos generados en el navegador. Ilustran variación temporal; no son telemetría del modelo ni una medida validada de entropía.</p></div>
      </div>
      <div className="matrix-section reveal"><div className="matrix-copy"><span className="mono">EXPERIMENTO 02</span><h3>Una coordenada distinta<br />para la conversación.</h3><p>Resolver una tarea y generar sensación de presencia no son el mismo objetivo. Este mapa ayuda a pensar la diferencia.</p><div className="matrix-detail" key={profile}><span className="mono"><span className="status-dot" /> {profiles[profile].tag}</span><h4>{profiles[profile].name}</h4><p>{profiles[profile].description}</p></div><div className="matrix-navigation" aria-label="Perfiles de la matriz">{profiles.map((p, i) => <button key={p.name} onClick={() => setProfile(i)} aria-label={`Explorar ${p.name}`} aria-pressed={profile === i} className={profile === i ? 'active' : ''}>0{i + 1}</button>)}</div></div><div className="matrix-visual"><span className="matrix-y mono">MAYOR NATURALIDAD CONVERSACIONAL ↑</span><div className="matrix-plot"><span className="matrix-target-x" style={{ top: `${profiles[profile].y}%` }} aria-hidden="true" /><span className="matrix-target-y" style={{ left: `${profiles[profile].x}%` }} aria-hidden="true" /><span className="quadrant-label q-one">PRESENCIA</span><span className="quadrant-label q-two">CONVERGENCIA</span><span className="quadrant-label q-three">ESTRUCTURA</span>{profiles.map((p, i) => <button key={p.name} className={`matrix-point ${profile === i ? 'selected' : ''} ${i === 0 ? 'flawly-point' : ''}`} style={{ left: `${p.x}%`, top: `${p.y}%`, '--stagger': i } as React.CSSProperties} onClick={() => setProfile(i)} aria-pressed={profile === i}><i /><span>{p.name}</span></button>)}</div><span className="matrix-x mono">MAYOR ENFOQUE EN TAREAS →</span><span className="matrix-caption">Mapa cualitativo · posiciones ilustrativas · no es un benchmark</span></div></div>
    </div>
  </section>;
}
