import playerPhoto from "@/assets/player-photo.jpg";

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
    <header className="relative flex flex-col items-center pt-8 pb-6">
      {/* Glow effect behind photo */}
      <div className="absolute top-12 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
      
      {/* Player photo */}
      <div className="relative mb-4">
        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/30 ice-glow">
          <img
            src={playerPhoto}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground font-bold text-lg px-3 py-1 rounded-lg">
          #{number}
        </div>
      </div>

      {/* Player name and info */}
      <h1 className="text-3xl font-bold tracking-tight mb-1">{name}</h1>
      <p className="text-primary font-semibold text-lg mb-3">
        {position} • {team}
      </p>

      {/* Quick stats row */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="text-lg">{nationality === "Canada" ? "🇨🇦" : nationality === "USA" ? "🇺🇸" : "🏒"}</span>
          <span>{nationality}</span>
        </span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
        <span>{age} yrs</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
        <span>{height}</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
        <span>{weight}</span>
      </div>

      {/* League badge */}
      <div className="mt-4 px-4 py-1.5 rounded-full glass text-sm font-medium">
        {league}
      </div>
    </header>
  );
};
