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
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden divide-y divide-border">
      {games.map((game, index) => (
        <div key={index} className="px-5 py-4">
          {game.isLive && (
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-[10px] font-bold text-destructive uppercase tracking-wider">Live Now</span>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-foreground">
              {game.isHome ? "vs" : "@"} {game.opponent}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
              game.isHome 
                ? "bg-primary/10 text-primary" 
                : "bg-secondary text-muted-foreground"
            }`}>
              {game.isHome ? "HOME" : "AWAY"}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {game.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {game.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {game.location}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
