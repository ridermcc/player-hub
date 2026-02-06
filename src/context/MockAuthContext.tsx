
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface Block {
  id: string;
  type: 'link' | 'header' | 'social';
  title: string;
  url?: string;
  icon?: string;
  isVisible: boolean;
}

export interface UserProfile {
  username: string; // Unique ID
  displayName: string;
  bio: string;
  avatarUrl?: string;
  theme: 'light' | 'dark' | 'custom';
  blocks: Block[];
}

interface User {
  username: string;
  password?: string; // storing plain text for mock MVP only
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

const STORAGE_KEY_USERS = 'linktree_mvp_users';
const STORAGE_KEY_PROFILES = 'linktree_mvp_profiles';
const STORAGE_KEY_CURRENT_USER = 'linktree_mvp_current_user';

export const MockAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>({});
  const [users, setUsers] = useState<User[]>([]);

  // Load initial data
  useEffect(() => {
    const loadedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]');
    const loadedProfiles = JSON.parse(localStorage.getItem(STORAGE_KEY_PROFILES) || '{}');
    const loadedCurrentUser = JSON.parse(localStorage.getItem(STORAGE_KEY_CURRENT_USER) || 'null');

    setUsers(loadedUsers);
    setProfiles(loadedProfiles);
    if (loadedCurrentUser) {
      setUser(loadedCurrentUser);
    }
  }, []);

  // Persist data
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILES, JSON.stringify(profiles));
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
      bio: 'Welcome to my page!',
      theme: 'dark',
      blocks: [],
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
