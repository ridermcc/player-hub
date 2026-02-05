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
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />
      
      <div className="space-y-4">
        {journey.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            {/* Timeline dot */}
            <div className={`relative z-10 w-4 h-4 rounded-full border-2 ${
              index === 0 
                ? "bg-primary border-primary" 
                : "bg-background border-muted-foreground/50"
            }`} />
            
            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-foreground">{item.team}</span>
                <span className="text-xs text-muted-foreground">{item.year}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item.league}</p>
              {item.role && (
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {item.role}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
