import { Instagram, Youtube, Music2 } from "lucide-react";

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://eliteprospects.com",
    icon: <span className="text-[11px] font-extrabold leading-none">EP</span>,
    label: "Elite Prospects",
  },
  {
    href: "https://instatscout.com",
    icon: <span className="text-[11px] font-extrabold leading-none">IN</span>,
    label: "InStat",
  },
  {
    href: "https://graet.com",
    icon: <span className="text-[11px] font-extrabold leading-none">G</span>,
    label: "GRAET",
  },
  {
    href: "https://youtube.com",
    icon: <Youtube className="w-[18px] h-[18px]" />,
    label: "YouTube",
  },
  {
    href: "https://instagram.com",
    icon: <Instagram className="w-[18px] h-[18px]" />,
    label: "Instagram",
  },
  {
    href: "https://tiktok.com",
    icon: <Music2 className="w-[18px] h-[18px]" />,
    label: "TikTok",
  },
];

export const SocialBar = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-110 hover:shadow-md"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};
