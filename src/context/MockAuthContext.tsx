
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface Block {
  id: string;
  type: 'link' | 'header' | 'social' | 'stats' | 'video' | 'games' | 'journey' | 'partnerships' | 'representation';
  title: string;
  url?: string;
  isVisible: boolean;
  // Stats
  stats?: { gamesPlayed: number; goals: number; assists: number; points: number; plusMinus: string; pim: number };
  season?: string;
  league?: string;
  // Video
  videoUrl?: string;
  // Games
  gamesList?: { date: string; time: string; opponent: string; location: string; isHome: boolean; logo?: string; watchLink?: string }[];
  // Journey
  journeyItems?: { year: string; team: string; league: string; role?: string; logo?: string }[];
  // Partnerships
  partnersList?: { id: string; name: string; logo: string; url: string; promoCode?: string; discount?: string }[];
  // Representation
  agent?: { name: string; agency: string; email?: string };
  // Social
  socialLinks?: { href: string; logo: string; label: string }[];
}

export interface UserProfile {
  username: string;
  displayName: string;
  bio: string;
  avatar?: string;
  position?: string;
  team?: string;
  league?: string;
  number?: string;
  nationality?: string;
  height?: string;
  weight?: string;
  age?: number;
  shoots?: string;
  flag?: string;
  dob?: string;
  theme: 'light' | 'dark' | 'custom';
  blocks: Block[];
}

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string) => void;
  signup: (username: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  getProfile: (username: string) => UserProfile | null;
  addBlock: (block: Omit<Block, 'id'>) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  removeBlock: (id: string) => void;
  reorderBlocks: (newBlocks: Block[]) => void;
  currentUserProfile: UserProfile | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_USERS = 'myhockeybio_users';
const STORAGE_KEY_PROFILES = 'myhockeybio_profiles';
const STORAGE_KEY_CURRENT_USER = 'myhockeybio_current_user';

const SEED_PROFILE: UserProfile = {
  username: 'ridermccallum',
  displayName: 'Rider McCallum',
  bio: 'Professional Hockey Player',
  avatar: '/player-hub/player-photo.jpg',
  position: 'D',
  team: 'Plymouth State Univ.',
  league: 'NCAA III',
  number: '16',
  nationality: 'Canada',
  height: "6'0\"",
  weight: '175 lbs',
  age: 24,
  shoots: 'Left',
  flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/330px-Flag_of_Canada_%28Pantone%29.svg.png',
  dob: '2001',
  theme: 'light',
  blocks: [
    {
      id: 'social-1',
      type: 'social',
      title: 'Connect',
      isVisible: true,
      socialLinks: [
        { href: 'https://eliteprospects.com', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu4j6L8PjCUydVTS1uTA2XfHDiH7_f6Ipf5g&s', label: 'Elite Prospects' },
        { href: 'https://instatscout.com', logo: 'https://support.hudl.com/resource/1766089243000/DataCategoryImages/Images/Instat_for_Basketball.png', label: 'InStat' },
        { href: 'https://graet.com', logo: 'https://play-lh.googleusercontent.com/BFFQBJYq_3j1jChSSsPO1_WkhYw2gI0FCB7K1mKCWTh2FEGmG79-e2rRuM6HCnntNuk', label: 'GRAET' },
        { href: 'https://youtube.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/960px-YouTube_full-color_icon_%282017%29.svg.png', label: 'YouTube' },
        { href: 'https://instagram.com', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/500px-Instagram_icon.png', label: 'Instagram' },
      ],
    },
    {
      id: 'stats-1',
      type: 'stats',
      title: 'Season Stats',
      isVisible: true,
      stats: { gamesPlayed: 18, goals: 1, assists: 10, points: 11, plusMinus: '-4', pim: 21 },
      season: '2025-26',
      league: 'NCAA III',
    },
    {
      id: 'video-1',
      type: 'video',
      title: 'Highlights',
      isVisible: true,
      videoUrl: 'https://player.vimeo.com/video/1083704020?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      id: 'games-1',
      type: 'games',
      title: 'Upcoming Games',
      isVisible: true,
      gamesList: [
        { date: 'Feb 7', time: '7:00 PM', opponent: 'UMass Boston', location: 'Hanaway Rink', isHome: true, logo: 'https://athletics.plymouth.edu/images/logos/UMASS_Boston.png', watchLink: 'https://mascac.tv' },
        { date: 'Feb 9', time: '2:00 PM', opponent: 'UMass Dartmouth', location: 'Hetland Arena', isHome: false, logo: 'https://athletics.plymouth.edu/images/logos/UMASS_Dartmouth.png', watchLink: 'https://mascac.tv' },
        { date: 'Feb 14', time: '7:30 PM', opponent: 'New England College', location: 'Hanaway Rink', isHome: true, logo: 'https://athletics.plymouth.edu/images/logos/nec_200x200.png', watchLink: 'https://mascac.tv' },
      ],
    },
    {
      id: 'journey-1',
      type: 'journey',
      title: 'My Journey',
      isVisible: true,
      journeyItems: [
        { year: '2018-2020', team: 'Revelstoke Grizzlies', league: 'KIJHL', role: '2 Seasons', logo: 'https://www.revelstokegrizzlies.com/wp-content/uploads/sites/19/2020/10/grizzlies_512.png' },
        { year: '2020-2022', team: 'Fort McMurray Oil Barons', league: 'AJHL', role: '2 Seasons', logo: 'https://files.eliteprospects.com/layout/logos/a3f6f86f-2c9c-4962-8ae9-715e18739940_large.png' },
        { year: '2022-2026', team: 'Plymouth State Univ.', league: 'NCAA III', role: '4 Seasons', logo: 'https://myhockeybio.com/wp-content/uploads/2025/02/PSU-Logo-Full-.png' },
      ],
    },
    {
      id: 'representation-1',
      type: 'representation',
      title: 'Representation',
      isVisible: true,
      agent: { name: 'Michael Thompson', agency: 'Elite Hockey Management', email: 'mthompson@elitehockey.com' },
    },
    {
      id: 'partnerships-1',
      type: 'partnerships',
      title: 'Partners',
      isVisible: true,
      partnersList: [
        { id: '1', name: 'Bauer Hockey', logo: '', url: 'https://bauer.com', promoCode: 'MARCUS17', discount: '15% OFF' },
        { id: '2', name: 'CCM', logo: '', url: 'https://ccmhockey.com', promoCode: 'ML17', discount: '10% OFF' },
        { id: '3', name: 'Gatorade', logo: '', url: 'https://gatorade.com' },
        { id: '4', name: 'Elite Training', logo: '', url: 'https://example.com', discount: 'Free Trial' },
      ],
    },
  ],
};

export const MockAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
    let loadedProfiles = JSON.parse(localStorage.getItem(STORAGE_KEY_PROFILES) || '{}');
    const loadedCurrentUser = JSON.parse(localStorage.getItem(STORAGE_KEY_CURRENT_USER) || 'null');

    // Always re-seed ridermccallum with latest data structure
    loadedProfiles['ridermccallum'] = SEED_PROFILE;
    if (!loadedUsers.find((u: User) => u.username === 'ridermccallum')) {
      loadedUsers.push({ username: 'ridermccallum' });
    }

    setUsers(loadedUsers);
    setProfiles(loadedProfiles);
    if (loadedCurrentUser) setUser(loadedCurrentUser);
  }, []);

  useEffect(() => {
    if (users.length > 0) localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (Object.keys(profiles).length > 0) localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
  }, [user]);

  const login = (username: string) => {
    const foundUser = users.find(u => u.username === username);
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert('User not found. Please sign up.');
    }
  };

  const signup = (username: string) => {
    if (users.find(u => u.username === username)) {
      alert('Username taken.');
      return;
    }
    const newUser = { username };
    const newProfile: UserProfile = {
      username,
      displayName: username,
      bio: '',
      theme: 'light',
      blocks: [],
      position: 'Forward',
      team: 'Free Agent',
      league: '',
      number: '00',
    };
    setUsers([...users, newUser]);
    setProfiles({ ...profiles, [username]: newProfile });
    setUser(newUser);
  };

  const logout = () => setUser(null);

  const currentUserProfile = user ? profiles[user.username] : null;

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setProfiles(prev => ({ ...prev, [user.username]: { ...prev[user.username], ...updates } }));
  };

  const addBlock = (blockData: Omit<Block, 'id'>) => {
    if (!user) return;
    const newBlock: Block = { ...blockData, id: crypto.randomUUID() };
    updateProfile({ blocks: [...profiles[user.username].blocks, newBlock] });
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    if (!user) return;
    const newBlocks = profiles[user.username].blocks.map(b => b.id === id ? { ...b, ...updates } : b);
    updateProfile({ blocks: newBlocks });
  };

  const removeBlock = (id: string) => {
    if (!user) return;
    updateProfile({ blocks: profiles[user.username].blocks.filter(b => b.id !== id) });
  };

  const reorderBlocks = (newBlocks: Block[]) => {
    if (!user) return;
    updateProfile({ blocks: newBlocks });
  };

  const getProfile = (username: string) => profiles[username] || null;

  return (
    <AuthContext.Provider value={{
      user, login, signup, logout, updateProfile, getProfile,
      addBlock, updateBlock, removeBlock, reorderBlocks, currentUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within a MockAuthProvider');
  return context;
};
