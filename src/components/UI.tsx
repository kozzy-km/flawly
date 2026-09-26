export type IconName = 'arrow' | 'diagonal' | 'plus' | 'close' | 'check' | 'download' | 'menu' | 'chevron' | 'play' | 'pause' | 'replay' | 'shield' | 'file';
export function Icon({ name = 'arrow', size = 18 }: { name?: IconName; size?: number }) {
  const paths: Record<IconName, string> = {
    arrow: 'M4 12h16m-6-6 6 6-6 6', diagonal: 'M5 19 19 5M5 5h14v14', plus: 'M12 5v14M5 12h14', close: 'm6 6 12 12M6 18 18 6', check: 'm5 12 4 4L19 6', download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5', menu: 'M4 7h16M4 12h16M4 17h16', chevron: 'm9 5 7 7-7 7', play: 'm8 5 11 7-11 7V5Z', pause: 'M8 5v14M16 5v14', replay: 'M4 10a8 8 0 1 1 1 8M4 4v6h6', shield: 'm12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6l8-3Zm-4 9 3 3 5-6', file: 'M14 3H5v18h14V8l-5-5Zm0 0v5h5M8 12h8M8 16h6',
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
export function SectionLabel({ number, children, light = false }: { number: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`section-label reveal-label ${light ? 'on-dark' : ''}`}>
      <span><i />{children}</span>
      <span className="section-label-rule" aria-hidden="true" />
      <span className="section-index">[ {number} / 09 ]</span>
    </div>
  );
}
export function BrandGraphic({ variant = 0 }: { variant?: number }) {
  return <div className={`brand-graphic graphic-${variant}`} aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <i key={i} />)}</div>;
}
