import { Instagram, Youtube, Music2 } from "lucide-react";

interface SocialLink {
  href: string;
  logo: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://eliteprospects.com",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu4j6L8PjCUydVTS1uTA2XfHDiH7_f6Ipf5g&s",
    label: "Elite Prospects",
  },
  {
    href: "https://instatscout.com",
    logo: "https://support.hudl.com/resource/1766089243000/DataCategoryImages/Images/Instat_for_Basketball.png",
    label: "InStat",
  },
  {
    href: "https://graet.com",
    logo: "https://play-lh.googleusercontent.com/BFFQBJYq_3j1jChSSsPO1_WkhYw2gI0FCB7K1mKCWTh2FEGmG79-e2rRuM6HCnntNuk",
    label: "GRAET",
  },
  {
    href: "https://youtube.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/960px-YouTube_full-color_icon_%282017%29.svg.png",
    label: "YouTube",
  },
  {
    href: "https://instagram.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/500px-Instagram_icon.png",
    label: "Instagram",
  },
];

export const SocialBar = () => {
  return (
    <div className="grid grid-cols-5 gap-3">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="group flex flex-col items-center gap-2 py-3 rounded-xl bg-card border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-200 border border-border/10">
            <img
              src={link.logo}
              alt={link.label}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[10px] font-bold text-muted-foreground group-hover:text-primary transition-colors leading-tight text-center">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
};
