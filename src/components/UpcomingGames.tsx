import { Calendar, MapPin, Clock, Tv, CalendarPlus, ChevronDown } from "lucide-react";
import { downloadICS, getGoogleCalendarLink } from "@/lib/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

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
  playerName?: string;
}

export const UpcomingGames = ({ games, playerName }: UpcomingGamesProps) => {
  if (!games || games.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border shadow-sm p-6 text-center text-muted-foreground text-sm">
        No upcoming games
      </div>
    );
  }

  const handleDownloadICS = (game: Game) => {
    downloadICS({ ...game, playerName });
  };

  const handleGoogleCalendar = (game: Game) => {
    window.open(getGoogleCalendarLink({ ...game, playerName }), '_blank');
  };

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

            <div className="flex items-center gap-2">
              {/* Add to Calendar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground hover:text-primary"
                  >
                    <CalendarPlus className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => handleDownloadICS(game)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Download .ics
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleGoogleCalendar(game)}>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM0 5.684v12.632h5.684V5.684H0zM5.684 0v5.684h12.632V0H5.684z" />
                    </svg>
                    Google Calendar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

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
