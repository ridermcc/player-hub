import { ExternalLink } from "lucide-react";
import { ReactNode } from "react";

interface LinkCardProps {
  href: string;
  icon: ReactNode;
  label: string;
  subtitle?: string;
  onClick?: () => void;
}

export const LinkCard = ({ href, icon, label, subtitle, onClick }: LinkCardProps) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group flex items-center gap-4 w-full p-4 rounded-xl glass link-card-hover border border-border/50 hover:border-primary/30"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground truncate">{label}</p>
        {subtitle && (
          <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
    </a>
  );
};
