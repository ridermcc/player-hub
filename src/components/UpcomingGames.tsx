import { Calendar, MapPin, Clock } from "lucide-react";

interface Game {
  date: string;
  time: string;
  opponent: string;
  location: string;
  isHome: boolean;
  isLive?: boolean;
}

interface UpcomingGamesProps {
  games: Game[];
}

export const UpcomingGames = ({ games }: UpcomingGamesProps) => {
  return (
    <div className="space-y-3">
      {games.map((game, index) => (
        <div
          key={index}
          className={`glass rounded-xl p-4 border ${
            game.isLive 
              ? "border-destructive/50 animate-pulse-glow" 
              : "border-border/50"
          }`}
        >
          {game.isLive && (
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-xs font-semibold text-destructive uppercase">Live Now</span>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-foreground">
              {game.isHome ? "vs" : "@"} {game.opponent}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              game.isHome 
                ? "bg-primary/10 text-primary" 
                : "bg-secondary text-secondary-foreground"
            }`}>
              {game.isHome ? "HOME" : "AWAY"}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {game.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {game.time}
            </span>
          </div>
          
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {game.location}
          </div>
        </div>
      ))}
    </div>
  );
};
