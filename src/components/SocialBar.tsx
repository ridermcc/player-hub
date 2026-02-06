import { Instagram, Youtube, Music2 } from "lucide-react";

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://eliteprospects.com",
    icon: <span className="text-xs font-extrabold leading-none">EP</span>,
    label: "Elite Prospects",
  },
  {
    href: "https://instatscout.com",
    icon: <span className="text-xs font-extrabold leading-none">IN</span>,
    label: "InStat",
  },
  {
    href: "https://graet.com",
    icon: <span className="text-xs font-extrabold leading-none">G</span>,
    label: "GRAET",
  },
  {
    href: "https://youtube.com",
    icon: <Youtube className="w-4 h-4" />,
    label: "YouTube",
  },
  {
    href: "https://instagram.com",
    icon: <Instagram className="w-4 h-4" />,
    label: "Instagram",
  },
  {
    href: "https://tiktok.com",
    icon: <Music2 className="w-4 h-4" />,
    label: "TikTok",
  },
];

export const SocialBar = () => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="group flex flex-col items-center gap-1.5 py-3 rounded-xl bg-card border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-200"
        >
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
            {link.icon}
          </div>
          <span className="text-[10px] font-medium text-muted-foreground group-hover:text-primary transition-colors leading-tight text-center">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
};
