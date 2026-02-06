import playerPhoto from "@/assets/player-photo.jpg";
import teamLogo from "@/assets/team-logo.png";
import leagueLogo from "@/assets/league-logo.png";

interface PlayerHeaderProps {
  name: string;
  number: string;
  position: string;
  team: string;
  league: string;
  nationality: string;
  age: number;
  height: string;
  weight: string;
}

export const PlayerHeader = ({
  name,
  number,
  position,
  team,
  league,
  nationality,
  age,
  height,
  weight,
}: PlayerHeaderProps) => {
  return (
    <header className="relative flex flex-col items-center pt-8 pb-4">
      {/* Player photo — larger, rounded rectangle */}
      <div className="relative mb-5">
        <div className="w-44 h-56 rounded-2xl overflow-hidden shadow-lg ring-1 ring-border">
          <img
            src={playerPhoto}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Jersey number badge */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground font-extrabold text-lg px-4 py-1 rounded-full shadow-md">
          #{number}
        </div>
      </div>

      {/* Player name */}
      <h1 className="text-3xl font-extrabold tracking-tight mt-2 mb-1">{name}</h1>
      <p className="text-base font-semibold text-muted-foreground mb-4">
        {position}
      </p>

      {/* Team & League row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border shadow-sm">
          <img src={teamLogo} alt={team} className="w-7 h-7 object-contain" />
          <span className="font-semibold text-sm text-foreground">{team}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border shadow-sm">
          <img src={leagueLogo} alt={league} className="w-6 h-6 object-contain" />
          <span className="font-medium text-sm text-muted-foreground">{league}</span>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="text-base">{nationality === "Canada" ? "🇨🇦" : nationality === "USA" ? "🇺🇸" : "🏒"}</span>
          <span>{nationality}</span>
        </span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span>{age} yrs</span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span>{height}</span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span>{weight}</span>
      </div>
    </header>
  );
};
