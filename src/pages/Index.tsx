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
  MapPin,
  Link
} from "lucide-react";

// Mock data for the example player
const playerData = {
  name: "Rider McCallum",
  number: "16", // Using #16 as requested
  position: "D", // Changed to D
  team: "Plymouth State Univ.",
  league: "NCAA III",
  nationality: "Canada",
  flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/330px-Flag_of_Canada_%28Pantone%29.svg.png",
  shoots: "Left",
  dob: "2001",
  age: 24,
  height: "6'0\"",
  weight: "175 lbs",
  playerImage: "/player-hub/player-photo.jpg",
};

const currentStats = {
  gamesPlayed: 18,
  goals: 1,
  assists: 10,
  points: 11,
  plusMinus: "-4",
  pim: 21,
};

const journey = [
  {
    year: "2018-2020",
    team: "Revelstoke Grizzlies",
    league: "KIJHL",
    role: "2 Seasons",
    logo: "https://www.revelstokegrizzlies.com/wp-content/uploads/sites/19/2020/10/grizzlies_512.png"
  },
  {
    year: "2020-2022",
    team: "Fort McMurray Oil Barons",
    league: "AJHL",
    role: "2 Seasons",
    logo: "https://files.eliteprospects.com/layout/logos/a3f6f86f-2c9c-4962-8ae9-715e18739940_large.png"
  },
  {
    year: "2022-2026",
    team: "Plymouth State Univ.",
    league: "NCAA III",
    role: "4 Seasons",
    logo: "https://myhockeybio.com/wp-content/uploads/2025/02/PSU-Logo-Full-.png"
  },
];

const upcomingGames = [
  {
    date: "Feb 7",
    time: "7:00 PM",
    opponent: "UMass Boston",
    location: "Hanaway Rink",
    isHome: true,
    logo: "https://athletics.plymouth.edu/images/logos/UMASS_Boston.png",
    watchLink: "https://mascac.tv",
  },
  {
    date: "Feb 9",
    time: "2:00 PM",
    opponent: "UMass Dartmouth",
    location: "Hetland Arena",
    isHome: false,
    logo: "https://athletics.plymouth.edu/images/logos/UMASS_Dartmouth.png",
    watchLink: "https://mascac.tv",
  },
  {
    date: "Feb 14",
    time: "7:30 PM",
    opponent: "New England College",
    location: "Hanaway Rink",
    isHome: true,
    logo: "https://athletics.plymouth.edu/images/logos/nec_200x200.png",
    watchLink: "https://mascac.tv",
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
            <SectionHeader title="Connect" icon={<Link className="w-3.5 h-3.5" />} />
            <SocialBar />
          </section>

          {/* Season Stats */}
          <section>
            <SectionHeader title="Season Stats" icon={<BarChart3 className="w-3.5 h-3.5" />} />
            <StatsCard stats={currentStats} season="2025-26" league="NCAA III" />
          </section>

          {/* Video Highlights */}
          <section>
            <SectionHeader title="Highlights" icon={<Video className="w-3.5 h-3.5" />} />
            <VideoShowcase />
          </section>

          {/* Upcoming Games */}
          <section>
            <SectionHeader title="Upcoming Games" icon={<Calendar className="w-3.5 h-3.5" />} />
            <UpcomingGames games={upcomingGames} />
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
            <div className="flex justify-center items-center gap-1 text-xs text-muted-foreground">
              Built with <img src="https://myhockeybio.com/wp-content/uploads/2025/03/MHB-Logo-white.png" alt="MyHockeyBio" className="h-3 inline" />
            </div>
            <p className="text-[10px] text-muted-foreground/50 mt-1">
              © 2025 Rider McCallum
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
