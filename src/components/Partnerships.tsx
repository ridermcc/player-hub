import { useState } from "react";
import { ExternalLink } from "lucide-react";
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

  if (!partners || partners.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 text-center text-muted-foreground text-sm">
        No partners added yet
      </div>
    );
  }

  const handleClick = (partner: Partner) => {
    setClickCounts(prev => ({
      ...prev,
      [partner.id]: (prev[partner.id] || 0) + 1
    }));

    if (onAffiliateClick) {
      onAffiliateClick(partner.id, partner.name);
    }

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
          className="group bg-card rounded-2xl border border-border shadow-sm p-4 flex flex-col items-center text-center hover:shadow-md hover:border-primary/20 transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-2.5 group-hover:bg-primary/10 transition-colors overflow-hidden">
            {partner.logo ? (
              <img src={partner.logo} alt={partner.name} className="w-8 h-8 object-contain" />
            ) : (
              <span className="text-lg font-bold text-muted-foreground">
                {partner.name.charAt(0)}
              </span>
            )}
          </div>
          
          <p className="font-bold text-sm text-foreground mb-1">{partner.name}</p>
          
          {partner.discount && (
            <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {partner.discount}
            </span>
          )}
          
          <div className="flex items-center gap-1 mt-2.5 text-xs text-muted-foreground group-hover:text-primary transition-colors">
            <ExternalLink className="w-3 h-3" />
            <span>Shop Now</span>
          </div>
        </a>
      ))}
    </div>
  );
};
