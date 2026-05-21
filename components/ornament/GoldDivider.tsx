export default function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-600/60" />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2 L11.8 7.6 L17.6 7.6 L13 11 L14.8 16.6 L10 13.2 L5.2 16.6 L7 11 L2.4 7.6 L8.2 7.6 Z"
          fill="#d4a40e"
          opacity="0.8"
        />
      </svg>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-600/60" />
    </div>
  );
}
