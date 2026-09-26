export default function FlawlyMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-mark flawly-mark ${small ? 'small' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 28V9L11 3H29L23 9H12V22L6 28H5Z" fill="currentColor" />
        <path d="M15 13H27L21 19H15V13Z" fill="currentColor" />
      </svg>
    </span>
  );
}
