type LinkCardProps = {
  emoji: string;
  title: string;
  url: string;
};

export default function LinkCard({ emoji, title, url }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center gap-4 rounded-3xl border border-line bg-surface px-6 py-5 font-medium tracking-tight shadow-glass backdrop-blur-xl transition-colors duration-200 hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:opacity-80"
    >
      <span aria-hidden="true" className="text-xl leading-none">
        {emoji}
      </span>
      <span className="flex-1">{title}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="text-muted transition-colors duration-200 group-hover:text-foreground"
      >
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </a>
  );
}
