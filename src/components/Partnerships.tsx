import { useState } from "react";
import { ExternalLink, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
  promoCode?: string;
  discount?: string;
}

interface PartnershipsProps {
  partners: Partner[];
  onAffiliateClick?: (partnerId: string, partnerName: string) => void;
}

export const Partnerships = ({ partners, onAffiliateClick }: PartnershipsProps) => {
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});

  const handleClick = (partner: Partner) => {
    // Track click
    setClickCounts(prev => ({
      ...prev,
      [partner.id]: (prev[partner.id] || 0) + 1
    }));

    // Call external tracking if provided
    if (onAffiliateClick) {
      onAffiliateClick(partner.id, partner.name);
    }

    // Show toast with promo code if available
    if (partner.promoCode) {
      toast({
        title: `${partner.discount} with code: ${partner.promoCode}`,
        description: "Code copied to clipboard!",
      });
      navigator.clipboard.writeText(partner.promoCode);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {partners.map((partner) => (
        <a
          key={partner.id}
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick(partner)}
          className="group glass rounded-xl p-4 border border-border/50 link-card-hover flex flex-col items-center text-center"
        >
          {/* Logo placeholder */}
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors overflow-hidden">
            {partner.logo ? (
              <img src={partner.logo} alt={partner.name} className="w-8 h-8 object-contain" />
            ) : (
              <span className="text-lg font-bold text-muted-foreground">
                {partner.name.charAt(0)}
              </span>
            )}
          </div>
          
          <p className="font-medium text-sm text-foreground mb-1">{partner.name}</p>
          
          {partner.discount && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {partner.discount}
            </span>
          )}
          
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground group-hover:text-primary transition-colors">
            <ExternalLink className="w-3 h-3" />
            <span>Shop Now</span>
          </div>
        </a>
      ))}
    </div>
  );
};
