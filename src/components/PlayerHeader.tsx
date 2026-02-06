import React, { useRef } from 'react';
import playerPhoto from "@/assets/player-photo.jpg";
import teamLogo from "@/assets/team-logo.png";
import leagueLogo from "@/assets/league-logo.png";
import { Camera, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

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
  playerImage?: string;
  editable?: boolean;
  onUpdate?: (updates: any) => void;
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
  playerImage,
  editable,
  onUpdate
}: PlayerHeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdate) {
      const imageUrl = URL.createObjectURL(file);
      onUpdate({ avatar: imageUrl });
    }
  };

  const handleTextChange = (field: string, value: string) => {
    if (onUpdate) {
      onUpdate({ [field]: value });
    }
  };

  return (
    <header className="relative flex flex-col items-center group/header">
      {/* Hero image — full width, tall */}
      <div className="relative w-full aspect-[3/4] max-h-[420px] rounded-b-3xl overflow-hidden bg-muted">
        <img
          src={playerImage || (editable ? "https://myhockeybio.com/wp-content/uploads/2025/03/placeholder-player-cutout.png" : playerPhoto)}
          alt={name}
          className={cn(
            "w-full h-full object-cover object-top",
            !playerImage && editable && "opacity-50 scale-90 object-contain translate-y-10"
          )}
        />

        {/* Image Upload Overlay */}
        {editable && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity cursor-pointer z-10",
                // Show consistently if no image, otherwise hover
                !playerImage ? "opacity-100 bg-transparent" : "opacity-0 group-hover/header:opacity-100 bg-black/30"
              )}
            >
              <div className="bg-background/90 text-foreground px-4 py-2 rounded-full flex items-center gap-2 font-medium shadow-lg hover:bg-background transition-colors">
                <Camera className="w-4 h-4" />
                <span>{playerImage ? "Change Photo" : "Add Photo"}</span>
              </div>
            </button>
          </>
        )}

        {/* Gradient overlay at bottom for text legibility */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />

        {/* Name + number overlay */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-5 z-20">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 min-w-0">
              {editable ? (
                <input
                  value={name}
                  onChange={(e) => handleTextChange('displayName', e.target.value)}
                  className="w-full bg-transparent text-3xl font-extrabold tracking-tight text-foreground leading-tight border-none focus:ring-0 p-0 placeholder:text-foreground/50"
                  placeholder="Player Name"
                />
              ) : (
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground leading-tight truncate">
                  {name}
                </h1>
              )}

              <div className="flex items-center gap-4 mt-2">
                {flag && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-border/50 shadow-sm relative shrink-0">
                    <img src={flag} alt={nationality} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="text-lg font-medium text-foreground/80 tracking-tight flex items-center gap-2">
                  {editable ? (
                    <div className="flex items-center gap-1">
                      <input
                        value={position}
                        onChange={(e) => handleTextChange('position', e.target.value)}
                        className="w-12 bg-transparent border-b border-foreground/30 focus:border-primary text-center leading-none pb-0.5"
                        placeholder="POS"
                      />
                      <span className="opacity-50">•</span>
                      <input
                        value={dob || ''}
                        onChange={(e) => handleTextChange('dob', e.target.value)}
                        className="w-20 bg-transparent border-b border-foreground/30 focus:border-primary leading-none pb-0.5"
                        placeholder="Year"
                      />
                    </div>
                  ) : (
                    <span>{position} <span className="mx-2 opacity-50">•</span> {dob}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="shrink-0 text-right">
              {editable ? (
                <input
                  value={number}
                  onChange={(e) => handleTextChange('number', e.target.value)}
                  className="w-16 bg-transparent text-5xl font-black text-foreground/60 leading-none text-right border-none focus:ring-0 p-0 placeholder:text-foreground/20"
                  placeholder="#"
                />
              ) : (
                <span className="text-5xl font-black text-foreground/60 leading-none">
                  {number}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info bar below image */}
      <div className="w-full mt-4 space-y-3 px-4">
        {/* Team & League */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2.5 flex-1 bg-card rounded-xl border border-border px-4 py-2.5 shadow-sm overflow-hidden">
            <img src={teamLogo} alt={team} className="w-8 h-8 object-contain shrink-0" />
            <div className="min-w-0 flex-1">
              {editable ? (
                <input
                  value={team}
                  onChange={(e) => handleTextChange('team', e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-foreground leading-tight border-b border-border/50 focus:border-primary pb-0.5"
                  placeholder="Team Name"
                />
              ) : (
                <p className="text-sm font-bold text-foreground leading-tight truncate">{team}</p>
              )}
              <p className="text-xs text-muted-foreground leading-tight mt-0.5">Current Team</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-card rounded-xl border border-border px-4 py-2.5 shadow-sm min-w-[120px]">
            <img src={leagueLogo} alt={league} className="w-7 h-7 object-contain shrink-0" />
            <div className="min-w-0 flex-1">
              {editable ? (
                <input
                  value={league}
                  onChange={(e) => handleTextChange('league', e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-foreground leading-tight border-b border-border/50 focus:border-primary pb-0.5"
                  placeholder="League"
                />
              ) : (
                <p className="text-sm font-bold text-foreground leading-tight truncate">{league}</p>
              )}
              <p className="text-xs text-muted-foreground leading-tight mt-0.5">League</p>
            </div>
          </div>
        </div>

        {/* Player details grid */}
        <div className="grid grid-cols-4 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          {[
            { label: "Nation", value: nationality, key: 'nationality' },
            { label: "Age", value: age, key: 'age' },
            { label: "Height", value: height, key: 'height' },
            { label: "Weight", value: weight, key: 'weight' },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`py-3 text-center ${i < 3 ? "border-r border-border" : ""}`}
            >
              {editable ? (
                <input
                  value={item.value}
                  onChange={(e) => handleTextChange(item.key, e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-foreground text-center focus:ring-0 border-none p-0"
                  placeholder="-"
                />
              ) : (
                <p className="text-sm font-bold text-foreground truncate px-1">
                  {item.key === 'nationality' && item.value === "Canada" ? "CAN" :
                    item.key === 'nationality' && item.value === "USA" ? "USA" :
                      item.value}
                </p>
              )}
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
