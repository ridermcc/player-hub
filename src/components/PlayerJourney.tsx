interface JourneyItem {
  year: string;
  team: string;
  league: string;
  role?: string;
  logo?: string;
}

interface PlayerJourneyProps {
  journey: JourneyItem[];
}

export const PlayerJourney = ({ journey }: PlayerJourneyProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      {journey.map((item, index) => (
        <div key={index} className="flex items-start gap-4 px-5 py-3.5 group">
          {/* Timeline indicator or Logo */}
          <div className="flex-shrink-0 relative self-stretch">
            {/* Connecting Line */}
            {index < journey.length - 1 && (
              <div className="absolute top-10 bottom-[-28px] left-1/2 -translate-x-1/2 w-0.5 bg-border z-0" />
            )}

            {item.logo ? (
              <div className="w-10 h-10 rounded-full bg-card border border-border p-1 overflow-hidden relative z-10">
                <img
                  src={item.logo}
                  alt={item.team}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className={`w-2.5 h-2.5 rounded-full ${index === 0 ? "bg-primary" : "bg-border"
                }`} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-sm font-bold text-foreground leading-tight">{item.team}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.league}</p>
          </div>

          {/* Year + role */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-0.5">
            {item.role && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {item.role}
              </span>
            )}
            <span className="text-xs font-medium text-muted-foreground">{item.year}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
