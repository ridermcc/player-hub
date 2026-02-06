
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface Block {
  id: string;
  type: 'link' | 'header' | 'social' | 'stats' | 'video' | 'games' | 'partnerships';
  title: string;
  url?: string;
  icon?: string;
  isVisible: boolean;
  // Specific data for rich blocks
  stats?: {
    games: number;
    goals: number;
    assists: number;
    points: number;
  };
  video?: {
    youtubeUrl: string;
    thumbnailUrl?: string; // Optional custom thumbnail
  };
  games?: any[]; // For MVP we might just use static data in the component, but structure allows expansion
  partnerships?: any[];
}

export interface UserProfile {
  username: string; // Unique ID
  displayName: string;
  bio: string;
  avatarUrl?: string;
  // Hockey specific fields
  position?: string;
  team?: string;
  league?: string;
  number?: string;
  nationality?: string;
  height?: string;
  weight?: string;
  age?: number;
  shoots?: string;

  theme: 'light' | 'dark' | 'custom';
  blocks: Block[];
}

interface User {
  username: string;
  password?: string;
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

// Pre-seeded data for 'ridermccallum'
const SEED_PROFILE: UserProfile = {
  username: 'ridermccallum',
  displayName: 'Rider McCallum',
  bio: 'Professional Hockey Player',
  avatarUrl: '/player-hub/player-photo.jpg', // Assuming this asset exists or will need to
  position: 'Defense',
  team: 'Steelheads',
  league: 'OHL',
  number: '14',
  nationality: 'Canada',
  height: "6'0\"",
  weight: '185 lbs',
  age: 19,
  shoots: 'L',
  theme: 'dark',
  blocks: [
    {
      id: 'stats-1',
      type: 'stats',
      title: 'Current Season Stats',
      isVisible: true,
      stats: { games: 45, goals: 12, assists: 28, points: 40 }
    },
    {
      id: 'video-1',
      type: 'video',
      title: '2024-25 Season Highlights',
      isVisible: true,
      video: { youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } // Placeholder
    },
    {
      id: 'games-1',
      type: 'games',
      title: 'Upcoming Games',
      isVisible: true
    },
    {
      id: 'partnerships-1',
      type: 'partnerships',
      title: 'Partnerships',
      isVisible: true
    },
    {
      id: 'social-1',
      type: 'social',
      title: 'Social Media',
      isVisible: true
    }
  ]
};

export const MockAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});
  const [users, setUsers] = useState<User[]>([]);

  // Load initial data
  useEffect(() => {
    const loadedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
    let loadedProfiles = JSON.parse(localStorage.getItem(STORAGE_KEY_PROFILES) || '{}');
    const loadedCurrentUser = JSON.parse(localStorage.getItem(STORAGE_KEY_CURRENT_USER) || 'null');

    // Seed ridermccallum if not exists
    if (!loadedProfiles['ridermccallum']) {
      loadedProfiles['ridermccallum'] = SEED_PROFILE;
      // Ensure user exists too
      if (!loadedUsers.find((u: User) => u.username === 'ridermccallum')) {
        loadedUsers.push({ username: 'ridermccallum' });
      }
    }

    setUsers(loadedUsers);
    setProfiles(loadedProfiles);
    if (loadedCurrentUser) {
      setUser(loadedCurrentUser);
    }
  }, []);

  // Persist data
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
      bio: 'Welcome to MyHockeyBio!',
      theme: 'dark',
      blocks: [],
      // Default hockey placeholders
      position: 'Forward',
      team: 'Free Agent',
      league: 'League',
      number: '99',
    };

    setUsers([...users, newUser]);
    setProfiles({ ...profiles, [username]: newProfile });
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const currentUserProfile = user ? profiles[user.username] : null;

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setProfiles(prev => ({
      ...prev,
      [user.username]: { ...prev[user.username], ...updates }
    }));
  };

  const addBlock = (blockData: Omit<Block, 'id'>) => {
    if (!user) return;
    const newBlock: Block = {
      ...blockData,
      id: crypto.randomUUID(),
    };
    const currentProfile = profiles[user.username];
    updateProfile({ blocks: [...currentProfile.blocks, newBlock] });
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    if (!user) return;
    const currentBlocks = profiles[user.username].blocks;
    const newBlocks = currentBlocks.map(b => b.id === id ? { ...b, ...updates } : b);
    updateProfile({ blocks: newBlocks });
  };

  const removeBlock = (id: string) => {
    if (!user) return;
    const currentBlocks = profiles[user.username].blocks;
    updateProfile({ blocks: currentBlocks.filter(b => b.id !== id) });
  };

  const reorderBlocks = (newBlocks: Block[]) => {
    if (!user) return;
    updateProfile({ blocks: newBlocks });
  };

  const getProfile = (username: string) => {
    return profiles[username] || null;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      updateProfile,
      getProfile,
      addBlock,
      updateBlock,
      removeBlock,
      reorderBlocks,
      currentUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a MockAuthProvider');
  }
  return context;
};
