import { useEffect, useRef, useState } from 'react';
import Mark from './FlawlyMark';
import { Icon } from './UI';

export default function AccessDialog({ initialTier, onClose }: { initialTier: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tier, setTier] = useState(initialTier);
  const [interest, setInterest] = useState('Exploración personal');
  const [message, setMessage] = useState('');
  const [prepared, setPrepared] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.querySelector<HTMLElement>('button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const items = ref.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input, select, textarea, a[href]');
        if (!items?.length) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', onKey); previous?.focus(); };
  }, [onClose]);
  const download = () => {
    const text = `FLAWLY — SOLICITUD DE INTERÉS\n\nPreparada localmente el ${new Date().toLocaleDateString('es-AR')}\nEsta solicitud no fue enviada. No confirma acceso ni una invitación.\n\nNombre: ${name}\nCorreo: ${email}\nNivel: ${tier}\nInterés: ${interest}\n\nNota:\n${message || 'Sin nota adicional.'}\n\nProyecto experimental de investigación independiente.\nCompartir cuando Flawly habilite un canal oficial de registro.\n`;
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'flawly-solicitud-de-interes.txt'; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); setDownloaded(true);
  };
  return <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}><div className="access-modal" ref={ref} role="dialog" aria-modal="true" aria-labelledby="access-title"><button className="modal-close icon-button" onClick={onClose} aria-label="Cerrar solicitud"><Icon name="close" size={21} /></button><Mark /><div className="mono modal-eyebrow">FLAWLY / ACCESO POR INVITACIÓN</div><h2 id="access-title">{prepared ? 'Una conversación\npor empezar.' : 'Lo natural empieza\ncon un hola.'}</h2>{prepared ? <div className="prepared-state"><div className="prepared-check"><Icon name="check" size={23} /></div><h3>Tu solicitud está preparada.</h3><p>Descargala para conservar tu interés y compartirlo cuando se habilite un canal oficial.</p><dl><div><dt>Nombre</dt><dd>{name}</dd></div><div><dt>Correo</dt><dd>{email}</dd></div><div><dt>Nivel</dt><dd>{tier}</dd></div><div><dt>Interés</dt><dd>{interest}</dd></div></dl><div className="form-notice"><Icon name="shield" size={18} /><p>No se enviaron datos. Esta preparación local no te inscribe en una lista ni garantiza acceso al prototipo.</p></div><button className="button button-dark full-width" onClick={download}>{downloaded ? 'Descargar de nuevo' : 'Descargar mi solicitud'}<Icon name="download" /></button><p className="download-status" role="status">{downloaded ? 'Archivo generado. Revisá las descargas de tu navegador.' : 'Archivo de texto · guardado solo en tu dispositivo'}</p><button className="text-link edit-request" onClick={() => setPrepared(false)}>Editar mis datos <Icon name="arrow" size={15} /></button></div> : <><p className="modal-intro">El prototipo se abrirá de forma gradual, en pruebas controladas. Prepará tu interés en participar.</p><div className="form-notice"><Icon name="shield" size={18} /><p>Registro online aún no habilitado. Este formulario genera una solicitud descargable; no envía datos ni confirma una invitación.</p></div><form className="access-form" onSubmit={e => { e.preventDefault(); setPrepared(true); setDownloaded(false); ref.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}><div className="form-row"><label>Tu nombre<input required value={name} onChange={e => setName(e.target.value)} maxLength={80} autoComplete="name" placeholder="Nombre y apellido" /></label><label>Correo electrónico<input required type="email" value={email} onChange={e => setEmail(e.target.value)} maxLength={160} autoComplete="email" placeholder="vos@ejemplo.com" /></label></div><div className="form-row"><label>Nivel de interés<select value={tier} onChange={e => setTier(e.target.value)}><option>Sway</option><option>Awly</option><option>Ambos niveles</option></select></label><label>¿Qué te trae por acá?<select value={interest} onChange={e => setInterest(e.target.value)}><option>Exploración personal</option><option>Investigación</option><option>Diseño de producto</option><option>Colaboración técnica</option></select></label></div><label>Algo que te gustaría explorar <span className="optional">(opcional)</span><textarea value={message} onChange={e => setMessage(e.target.value)} maxLength={600} rows={3} placeholder="Tu pregunta, idea o área de interés…" /></label><label className="checkbox-label"><input type="checkbox" required /><span>Entiendo que Flawly es experimental y que esta solicitud no se envía automáticamente.</span></label><button type="submit" className="button button-dark full-width">Preparar solicitud <Icon name="diagonal" size={17} /></button><p className="form-note">Sin pago. Sin envío de correos. Los datos se eliminan del formulario al cerrar esta ventana.</p></form></>}</div></div>;
}
