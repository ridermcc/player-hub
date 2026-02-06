import { Calendar, MapPin, Clock, Tv } from "lucide-react";

interface Game {
  date: string;
  time: string;
  opponent: string;
  location: string;
  isHome: boolean;
  isLive?: boolean;
  logo?: string;
  watchLink?: string;
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

          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-3">
              {game.logo && (
                <img
                  src={game.logo}
                  alt={game.opponent}
                  className="w-10 h-10 object-contain"
                />
              )}
              <div>
                <span className="font-bold text-foreground block leading-tight">
                  {game.isHome ? "vs" : "@"} {game.opponent}
                </span>
              </div>
            </div>

            {game.watchLink && (
              <a
                href={game.watchLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors group/watch"
              >
                <Tv className="w-3.5 h-3.5 text-muted-foreground group-hover/watch:text-primary transition-colors" />
                <span className="text-xs font-semibold">Watch</span>
              </a>
            )}
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
      ))
      }
    </div >
  );
};
