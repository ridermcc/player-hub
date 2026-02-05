import { TrendingUp, Target, Award, Clock } from "lucide-react";

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
}

export const StatsCard = ({ stats, season }: StatsCardProps) => {
  const statItems = [
    { label: "GP", value: stats.gamesPlayed, icon: Clock },
    { label: "G", value: stats.goals, icon: Target },
    { label: "A", value: stats.assists, icon: TrendingUp },
    { label: "PTS", value: stats.points, icon: Award },
    { label: "+/-", value: stats.plusMinus, icon: null },
    { label: "PIM", value: stats.pim, icon: null },
  ];

  return (
    <div className="glass rounded-xl p-4 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{season}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
          Current Season
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {statItems.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
