import { PlayerHeader } from "@/components/PlayerHeader";
import { SocialBar } from "@/components/SocialBar";
import { SectionHeader } from "@/components/SectionHeader";
import { StatsCard } from "@/components/StatsCard";
import { PlayerJourney } from "@/components/PlayerJourney";
import { UpcomingGames } from "@/components/UpcomingGames";
import { VideoShowcase } from "@/components/VideoShowcase";
import { Partnerships } from "@/components/Partnerships";
import { Representation } from "@/components/Representation";
import { 
  BarChart3,
  Trophy,
  Calendar,
  Video,
  Handshake,
  MapPin
} from "lucide-react";

// Mock data for the example player
const playerData = {
  name: "Marcus Lindström",
  number: "17",
  position: "Center",
  team: "London Knights",
  league: "OHL",
  nationality: "Canada",
  age: 18,
  height: "6'1\"",
  weight: "185 lbs",
};

const currentStats = {
  gamesPlayed: 42,
  goals: 28,
  assists: 35,
  points: 63,
  plusMinus: "+24",
  pim: 18,
};

const journey = [
  { year: "2024-25", team: "London Knights", league: "OHL", role: "Alternate Captain" },
  { year: "2023-24", team: "London Knights", league: "OHL" },
  { year: "2022-23", team: "Elgin-Middlesex Chiefs", league: "ALLIANCE U18" },
  { year: "2021-22", team: "Toronto Jr. Canadiens", league: "GTHL U16" },
];

const upcomingGames = [
  { date: "Feb 7", time: "7:00 PM", opponent: "Oshawa Generals", location: "Budweiser Gardens", isHome: true },
  { date: "Feb 9", time: "2:00 PM", opponent: "Erie Otters", location: "Erie Insurance Arena", isHome: false },
  { date: "Feb 14", time: "7:30 PM", opponent: "Windsor Spitfires", location: "Budweiser Gardens", isHome: true },
];

const videos = [
  {
    id: "1",
    title: "Hat Trick vs Kitchener Rangers - All Goals",
    thumbnail: "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=200&h=150&fit=crop",
    duration: "2:34",
    url: "https://youtube.com",
  },
  {
    id: "2",
    title: "Top 10 Plays of the Season So Far",
    thumbnail: "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=200&h=150&fit=crop",
    duration: "4:12",
    url: "https://youtube.com",
  },
];

const partners = [
  { id: "1", name: "Bauer Hockey", logo: "", url: "https://bauer.com", promoCode: "MARCUS17", discount: "15% OFF" },
  { id: "2", name: "CCM", logo: "", url: "https://ccmhockey.com", promoCode: "ML17", discount: "10% OFF" },
  { id: "3", name: "Gatorade", logo: "", url: "https://gatorade.com" },
  { id: "4", name: "Elite Training", logo: "", url: "https://example.com", discount: "Free Trial" },
];

const agent = {
  name: "Michael Thompson",
  agency: "Elite Hockey Management",
  email: "mthompson@elitehockey.com",
};

const Index = () => {
  const handleAffiliateClick = (partnerId: string, partnerName: string) => {
    console.log(`Affiliate click tracked: ${partnerName} (${partnerId})`);
  };

  return (
    <div className="min-h-screen pb-16">
      <div className="max-w-md mx-auto">
        {/* Player Header — full bleed image */}
        <PlayerHeader {...playerData} />

        {/* Content sections with consistent padding */}
        <div className="px-4 space-y-8 mt-6">
          {/* Social & Hockey Profiles */}
          <section>
            <SectionHeader title="Connect" />
            <SocialBar />
          </section>

          {/* Season Stats */}
          <section>
            <SectionHeader title="Season Stats" icon={<BarChart3 className="w-3.5 h-3.5" />} />
            <StatsCard stats={currentStats} season="2024-25 OHL" />
          </section>

          {/* Upcoming Games */}
          <section>
            <SectionHeader title="Upcoming Games" icon={<Calendar className="w-3.5 h-3.5" />} />
            <UpcomingGames games={upcomingGames} />
          </section>

          {/* Video Highlights */}
          <section>
            <SectionHeader title="Highlights" icon={<Video className="w-3.5 h-3.5" />} />
            <VideoShowcase videos={videos} />
          </section>

          {/* Playing Journey */}
          <section>
            <SectionHeader title="My Journey" icon={<MapPin className="w-3.5 h-3.5" />} />
            <PlayerJourney journey={journey} />
          </section>

          {/* Representation */}
          <section>
            <SectionHeader title="Representation" icon={<Trophy className="w-3.5 h-3.5" />} />
            <Representation agent={agent} />
          </section>

          {/* Partnerships */}
          <section>
            <SectionHeader title="Partners" icon={<Handshake className="w-3.5 h-3.5" />} />
            <Partnerships partners={partners} onAffiliateClick={handleAffiliateClick} />
          </section>

          {/* Footer */}
          <footer className="pt-6 border-t border-border text-center pb-4">
            <p className="text-xs text-muted-foreground">
              Built with{" "}
              <span className="text-primary font-bold">PlayerLink</span>
            </p>
            <p className="text-[10px] text-muted-foreground/50 mt-1">
              © 2025 Marcus Lindström
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
