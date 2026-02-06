
import React from 'react';
import { UserProfile, Block } from '@/context/MockAuthContext';
import { PlayerHeader } from './PlayerHeader';
import { SocialBar } from './SocialBar';
import { SectionHeader } from './SectionHeader';
import { StatsCard } from './StatsCard';
import { VideoShowcase } from './VideoShowcase';
import { UpcomingGames } from './UpcomingGames';
import { PlayerJourney } from './PlayerJourney';
import { Representation } from './Representation';
import { Partnerships } from './Partnerships';
import { LinkCard } from './LinkCard';
import { BlockEditor } from './BlockEditor';
import {
  BarChart3, Trophy, Calendar, Video, Handshake, MapPin,
  Link as LinkIcon, Users, GripHorizontal, Plus, Eye, EyeOff
} from 'lucide-react';
import { Button } from './ui/button';

interface ProfileRendererProps {
  profile: UserProfile;
  editable?: boolean;
  onUpdateProfile?: (updates: Partial<UserProfile>) => void;
  onAddBlock?: (type: Block['type']) => void;
  onUpdateBlock?: (id: string, updates: Partial<Block>) => void;
  onDeleteBlock?: (id: string) => void;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  social: <LinkIcon className="w-3.5 h-3.5" />,
  stats: <BarChart3 className="w-3.5 h-3.5" />,
  video: <Video className="w-3.5 h-3.5" />,
  games: <Calendar className="w-3.5 h-3.5" />,
  journey: <MapPin className="w-3.5 h-3.5" />,
  representation: <Trophy className="w-3.5 h-3.5" />,
  partnerships: <Handshake className="w-3.5 h-3.5" />,
  link: <LinkIcon className="w-3.5 h-3.5" />,
  header: <GripHorizontal className="w-3.5 h-3.5" />,
};

export const ProfileRenderer = ({
  profile,
  editable,
  onUpdateProfile,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock
}: ProfileRendererProps) => {

  const renderBlock = (block: Block) => {
    if (!block.isVisible && !editable) return null;

    const content = (() => {
      switch (block.type) {
        case 'social':
          return (
            <section>
              <SectionHeader title={block.title || 'Connect'} icon={SECTION_ICONS.social} />
              <SocialBar links={block.socialLinks} />
            </section>
          );
        case 'stats':
          return (
            <section>
              <SectionHeader title={block.title || 'Season Stats'} icon={SECTION_ICONS.stats} />
              <StatsCard
                stats={block.stats || { gamesPlayed: 0, goals: 0, assists: 0, points: 0, plusMinus: '0', pim: 0 }}
                season={block.season || '2024-25'}
                league={block.league}
              />
            </section>
          );
        case 'video':
          return (
            <section>
              <SectionHeader title={block.title || 'Highlights'} icon={SECTION_ICONS.video} />
              <VideoShowcase url={block.videoUrl} />
            </section>
          );
        case 'games':
          return (
            <section>
              <SectionHeader title={block.title || 'Upcoming Games'} icon={SECTION_ICONS.games} />
              <UpcomingGames games={block.gamesList || []} />
            </section>
          );
        case 'journey':
          return (
            <section>
              <SectionHeader title={block.title || 'My Journey'} icon={SECTION_ICONS.journey} />
              <PlayerJourney journey={block.journeyItems || []} />
            </section>
          );
        case 'representation':
          return (
            <section>
              <SectionHeader title={block.title || 'Representation'} icon={SECTION_ICONS.representation} />
              <Representation agent={block.agent || { name: '', agency: '' }} />
            </section>
          );
        case 'partnerships':
          return (
            <section>
              <SectionHeader title={block.title || 'Partners'} icon={SECTION_ICONS.partnerships} />
              <Partnerships partners={block.partnersList || []} />
            </section>
          );
        case 'link':
          return (
            <LinkCard
              href={block.url || '#'}
              icon={<LinkIcon className="w-5 h-5" />}
              label={block.title}
            />
          );
        case 'header':
          return (
            <h2 className="text-xl font-bold text-center my-2 text-foreground">
              {block.title}
            </h2>
          );
        default:
          return null;
      }
    })();

    if (!editable) {
      return <div key={block.id} className="w-full">{content}</div>;
    }

    return (
      <BlockEditor
        key={block.id}
        block={block}
        onUpdate={onUpdateBlock}
        onDelete={onDeleteBlock}
      >
        <div className={!block.isVisible ? 'opacity-40' : ''}>{content}</div>
      </BlockEditor>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto pb-20">
      <PlayerHeader
        name={profile.displayName}
        number={profile.number || ''}
        position={profile.position || ''}
        team={profile.team || ''}
        league={profile.league || ''}
        nationality={profile.nationality || ''}
        age={profile.age || 0}
        height={profile.height || ''}
        weight={profile.weight || ''}
        shoots={profile.shoots || ''}
        flag={profile.flag}
        dob={profile.dob || ''}
        playerImage={profile.avatar}
        editable={editable}
        onUpdate={(updates) => onUpdateProfile && onUpdateProfile(updates)}
      />

      <div className="px-4 space-y-8 mt-6">
        {profile.blocks.length === 0 && (
          <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
            {editable ? "Add your first content block below!" : "No content yet."}
          </div>
        )}

        {profile.blocks.map(renderBlock)}
      </div>

      {/* Admin Add Controls */}
      {editable && (
        <div className="sticky bottom-0 z-30 p-4 bg-background/80 backdrop-blur-lg border-t mt-8">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider text-center">Add Content Block</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { type: 'stats' as const, icon: <Trophy className="w-4 h-4 text-yellow-500" />, label: 'Stats' },
              { type: 'video' as const, icon: <Video className="w-4 h-4 text-red-500" />, label: 'Video' },
              { type: 'games' as const, icon: <Calendar className="w-4 h-4 text-blue-500" />, label: 'Games' },
              { type: 'journey' as const, icon: <MapPin className="w-4 h-4 text-orange-500" />, label: 'Journey' },
              { type: 'partnerships' as const, icon: <Users className="w-4 h-4 text-green-500" />, label: 'Sponsors' },
              { type: 'representation' as const, icon: <Handshake className="w-4 h-4 text-purple-500" />, label: 'Agent' },
              { type: 'social' as const, icon: <LinkIcon className="w-4 h-4 text-cyan-500" />, label: 'Social' },
              { type: 'link' as const, icon: <LinkIcon className="w-4 h-4" />, label: 'Link' },
            ].map(item => (
              <Button
                key={item.type}
                variant="outline"
                size="sm"
                onClick={() => onAddBlock && onAddBlock(item.type)}
                className="flex flex-col h-auto py-2.5 gap-1"
              >
                {item.icon}
                <span className="text-[10px]">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
