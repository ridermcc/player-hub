interface JourneyItem {
  year: string;
  team: string;
  league: string;
  role?: string;
}

interface PlayerJourneyProps {
  journey: JourneyItem[];
}

export const PlayerJourney = ({ journey }: PlayerJourneyProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden divide-y divide-border">
      {journey.map((item, index) => (
        <div key={index} className="flex items-center gap-4 px-5 py-3.5">
          {/* Timeline indicator */}
          <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
            index === 0 ? "bg-primary" : "bg-border"
          }`} />
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground truncate">{item.team}</p>
            <p className="text-xs text-muted-foreground">{item.league}</p>
          </div>

          {/* Year + role */}
          <div className="flex items-center gap-2 flex-shrink-0">
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
