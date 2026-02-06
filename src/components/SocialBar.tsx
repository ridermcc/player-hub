
interface SocialLink {
  href: string;
  logo: string;
  label: string;
}

interface SocialBarProps {
  links?: SocialLink[];
}

export const SocialBar = ({ links }: SocialBarProps) => {
  if (!links || links.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 text-center text-muted-foreground text-sm">
        No social links added yet
      </div>
    );
  }

  return (
    <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${Math.min(links.length, 5)}, 1fr)` }}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="group flex flex-col items-center gap-2 py-3 rounded-xl bg-card border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-200 border border-border/10">
            <img src={link.logo} alt={link.label} className="w-full h-full object-contain" />
          </div>
          <span className="text-[10px] font-bold text-muted-foreground group-hover:text-primary transition-colors leading-tight text-center">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
};
