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
  shoots: string;
  flag?: string;
  dob?: string;
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
  shoots,
  flag,
  dob,
}: PlayerHeaderProps) => {
  return (
    <header className="relative flex flex-col items-center">
      {/* Hero image — full width, tall */}
      <div className="relative w-full aspect-[3/4] max-h-[420px] rounded-b-3xl overflow-hidden">
        <img
          src={playerPhoto}
          alt={name}
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient overlay at bottom for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Name + number overlay */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                {name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                {flag && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-border/50 shadow-sm relative shrink-0">
                    <img src={flag} alt={nationality} className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-lg font-medium text-foreground/80 tracking-tight">
                  {position} <span className="mx-2 opacity-50">•</span> {dob}
                </p>
              </div>
            </div>
            <span className="text-5xl font-black text-foreground/60 leading-none">
              {number}
            </span>
          </div>
        </div>
      </div>

      {/* Info bar below image */}
      <div className="w-full mt-4 space-y-3 px-4">
        {/* Team & League */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2.5 flex-1 bg-card rounded-xl border border-border px-4 py-2.5 shadow-sm">
            <img src={teamLogo} alt={team} className="w-8 h-8 object-contain" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground leading-tight truncate">{team}</p>
              <p className="text-xs text-muted-foreground leading-tight">Current Team</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-card rounded-xl border border-border px-4 py-2.5 shadow-sm">
            <img src={leagueLogo} alt={league} className="w-7 h-7 object-contain" />
            <div>
              <p className="text-sm font-bold text-foreground leading-tight">{league}</p>
              <p className="text-xs text-muted-foreground leading-tight">League</p>
            </div>
          </div>
        </div>

        {/* Player details grid */}
        {/* Player details grid */}
        <div className="grid grid-cols-4 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          {[
            { label: "Nation", value: nationality === "Canada" ? "CAN" : nationality === "USA" ? "USA" : nationality },
            { label: "Age", value: `${age}` },
            { label: "Height", value: height },
            { label: "Weight", value: weight },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`py-3 text-center ${i < 3 ? "border-r border-border" : ""}`}
            >
              <p className="text-sm font-bold text-foreground">{item.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
