
import React from 'react';
import { useAuth, Block } from '@/context/MockAuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProfileRenderer } from '@/components/ProfileRenderer';
import { LogOut, Eye } from 'lucide-react';

const DEFAULT_BLOCKS: Record<string, Omit<Block, 'id'>> = {
  stats: {
    type: 'stats', title: 'Season Stats', isVisible: true,
    stats: { gamesPlayed: 0, goals: 0, assists: 0, points: 0, plusMinus: '0', pim: 0 },
    season: '2024-25',
  },
  video: { type: 'video', title: 'Highlights', isVisible: true, videoUrl: '' },
  games: { type: 'games', title: 'Upcoming Games', isVisible: true, gamesList: [] },
  journey: { type: 'journey', title: 'My Journey', isVisible: true, journeyItems: [] },
  partnerships: { type: 'partnerships', title: 'Partners', isVisible: true, partnersList: [] },
  representation: { type: 'representation', title: 'Representation', isVisible: true, agent: { name: '', agency: '' } },
  social: { type: 'social', title: 'Connect', isVisible: true, socialLinks: [] },
  link: { type: 'link', title: 'New Link', isVisible: true, url: 'https://' },
  header: { type: 'header', title: 'New Section', isVisible: true },
};

const AdminPage = () => {
  const { user, currentUserProfile, logout, updateProfile, addBlock, updateBlock, removeBlock } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!currentUserProfile) return null;

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-lg mx-auto flex h-12 items-center justify-between px-4">
          <img src="https://myhockeybio.com/wp-content/uploads/2025/03/MHB-Logo-white.png" alt="MyHockeyBio" className="h-6" />
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs"
              onClick={() => window.open(`${import.meta.env.BASE_URL}${currentUserProfile.username}`, '_blank')}
            >
              <Eye className="mr-1.5 w-3.5 h-3.5" /> Preview
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-destructive hover:text-destructive"
              onClick={() => { logout(); navigate('/'); }}
            >
              <LogOut className="mr-1.5 w-3.5 h-3.5" /> Log out
            </Button>
          </div>
        </div>
      </div>

      {/* Phone frame - Full width on mobile, Phone mock on desktop */}
      <div className="flex justify-center h-[calc(100vh-48px)] md:py-6 md:px-4 md:h-auto">
        <div className="w-full h-full md:h-auto md:max-w-[430px] bg-background md:border md:border-border md:rounded-[2rem] md:shadow-2xl overflow-hidden relative flex flex-col">
          {/* Notch - hidden on mobile */}
          <div className="hidden md:flex h-5 bg-secondary/40 justify-center items-center shrink-0">
            <div className="w-16 h-1 rounded-full bg-border/50" />
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar md:max-h-[calc(100vh-120px)]">
            <ProfileRenderer
              profile={currentUserProfile}
              editable={true}
              onUpdateProfile={updateProfile}
              onAddBlock={(type) => addBlock(DEFAULT_BLOCKS[type] || { type, title: 'New Block', isVisible: true })}
              onUpdateBlock={updateBlock}
              onDeleteBlock={removeBlock}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
