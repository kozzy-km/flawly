import { useEffect, useRef, useState } from 'react';
import { Icon } from './UI';

export default function NaturalSphere() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const smoothPointer = useRef({ x: 0, y: 0 });
  const scrollSpin = useRef(0);
  const clock = useRef(9000);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const ctx = element.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let last = 0;
    let visible = true;
    let dirty = true;
    const onScroll = () => {
      if (!paused) {
        scrollSpin.current = window.scrollY * 0.0018;
        dirty = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const points: { x: number; y: number; z: number; green: boolean }[] = [];
    for (let row = 1; row < 76; row++) {
      const theta = row / 76 * Math.PI;
      const count = Math.round(154 * Math.sin(theta));
      for (let col = 0; col < count; col++) {
        const phi = col / count * Math.PI * 2;
        const r = 1 + .023 * Math.sin(phi * 9 + theta * 12) * Math.sin(theta);
        points.push({ x: r * Math.sin(theta) * Math.cos(phi), y: r * Math.cos(theta), z: r * Math.sin(theta) * Math.sin(phi), green: row > 33 && row < 37 && col % 3 === 0 });
      }
    }
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; dirty = true; });
    observer.observe(element);
    const resize = new ResizeObserver(() => { dirty = true; });
    resize.observe(element);
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible || document.hidden || (paused && !dirty) || time - last < 33) return;
      if (!paused) clock.current += Math.min(time - last, 60);
      last = time;
      dirty = false;
      const box = element.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      if (element.width !== Math.round(box.width * dpr) || element.height !== Math.round(box.height * dpr)) {
        element.width = Math.round(box.width * dpr); element.height = Math.round(box.height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, box.width, box.height);
      smoothPointer.current.x += (pointer.current.x - smoothPointer.current.x) * 0.12;
      smoothPointer.current.y += (pointer.current.y - smoothPointer.current.y) * 0.12;
      const radius = Math.min(box.width * .365, box.height * .38);
      const angle = clock.current * .000048 + (paused ? 0 : smoothPointer.current.x * .24 + scrollSpin.current);
      const tilt = -.30 + (paused ? 0 : smoothPointer.current.y * .16 + Math.min(scrollSpin.current * 0.12, 0.14));
      const ca = Math.cos(angle), sa = Math.sin(angle), ct = Math.cos(tilt), st = Math.sin(tilt);
      const transformed = points.map(p => {
        const x = p.x * ca + p.z * sa;
        const z = -p.x * sa + p.z * ca;
        return { x: x * ct - p.y * st, y: x * st + p.y * ct, z, green: p.green };
      }).sort((a, b) => a.z - b.z);
      for (const p of transformed) {
        const scale = 1 + p.z * .10;
        const alpha = .16 + (p.z + 1) / 2 * .76;
        ctx.fillStyle = p.green && p.z > .2 ? `rgba(128,151,63,${alpha})` : `rgba(42,46,36,${alpha})`;
        ctx.beginPath();
        ctx.arc(box.width * .5 + p.x * radius * scale, box.height * .5 + p.y * radius * scale, (.65 + (p.z + 1) * .31) * box.width / 560, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.save(); ctx.translate(box.width * .5, box.height * .5); ctx.rotate(-.28 + (paused ? 0 : smoothPointer.current.x * 0.05));
      ctx.strokeStyle = 'rgba(110,122,78,.27)'; ctx.lineWidth = .7; ctx.beginPath(); ctx.ellipse(0, 0, radius * 1.2, radius * .28, 0, 0, Math.PI * 2); ctx.stroke();
      const orbit = clock.current * .00022 + (paused ? 0 : scrollSpin.current * 1.4);
      ctx.fillStyle = '#a1af70'; ctx.beginPath(); ctx.arc(Math.cos(orbit) * radius * 1.2, Math.sin(orbit) * radius * .28, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.rotate(0.52);
      ctx.strokeStyle = 'rgba(110,122,78,.13)'; ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.ellipse(0, 0, radius * 1.08, radius * .21, 0, 0, Math.PI * 2); ctx.stroke();
      const orbit2 = -clock.current * .00016 - (paused ? 0 : scrollSpin.current);
      ctx.fillStyle = 'rgba(140,156,94,.75)'; ctx.beginPath(); ctx.arc(Math.cos(orbit2) * radius * 1.08, Math.sin(orbit2) * radius * .21, 2.3, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [paused]);
  return <div className="sphere-visual" onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); pointer.current = { x: (e.clientX - r.left) / r.width - .5, y: (e.clientY - r.top) / r.height - .5 }; }} onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; }}>
    <div className="sphere-grid" />
    <div className="visual-cross cross-one">+</div><div className="visual-cross cross-two">+</div><div className="visual-cross cross-three">+</div><div className="visual-cross cross-four">+</div>
    <div className="visual-top mono"><span className="status-dot" /> FLAWLY CORE <span className="muted">EXPERIMENTAL / V.01</span></div>
    <canvas ref={canvas} aria-label="Esfera de partículas animadas que representa la identidad de Flawly" role="img" />
    <div className="sphere-label label-context"><span />Identidad</div><div className="sphere-label label-intent"><span />Adaptación</div><div className="sphere-label label-emotion"><span />Expresión temporal</div>
    <div className="visual-bottom mono"><span>COMPLEJIDAD INTERNA. NATURALIDAD EXTERNA.</span><button className="sphere-toggle" aria-label={paused ? 'Reanudar animación de la esfera' : 'Pausar animación de la esfera'} aria-pressed={paused} onClick={() => setPaused(p => !p)}><Icon name={paused ? 'play' : 'pause'} size={10} /><span>{paused ? 'REANUDAR' : 'PAUSAR'}</span></button></div>
  </div>;
}
