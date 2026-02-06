interface StatsCardProps {
  stats: {
    gamesPlayed: number;
    goals: number;
    assists: number;
    points: number;
    plusMinus: string;
    pim: number;
  };
  season: string;
  league?: string;
}

export const StatsCard = ({ stats, season, league }: StatsCardProps) => {
  const statItems = [
    { label: "GP", value: stats.gamesPlayed },
    { label: "G", value: stats.goals },
    { label: "A", value: stats.assists },
    { label: "PTS", value: stats.points },
    { label: "+/-", value: stats.plusMinus },
    { label: "PIM", value: stats.pim },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <span className="text-sm font-semibold text-foreground">{season}</span>
        {league && (
          <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
            {league}
          </span>
        )}
      </div>
      <div className="grid grid-cols-6 divide-x divide-border">
        {statItems.map((stat) => (
          <div key={stat.label} className="py-4 text-center">
            <p className="text-xl font-extrabold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
