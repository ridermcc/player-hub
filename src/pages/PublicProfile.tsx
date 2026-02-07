
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/MockAuthContext';
import { ProfileRenderer } from '@/components/ProfileRenderer';

const PublicProfile = () => {
  const { username } = useParams();
  const { getProfile } = useAuth();
  const profile = getProfile(username || '');

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground gap-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">Profile @{username} not found</p>
        <Link to="/signup" className="text-primary font-semibold hover:underline">Create your MyHockeyBio →</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="max-w-md mx-auto min-h-screen">
        <ProfileRenderer profile={profile} editable={false} />
      </div>
      {/* Floating CTA Footer */}
      <Link
        to="/signup"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100%-2rem)] flex items-center justify-between px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-xl border border-blue-400/30 shadow-lg shadow-blue-500/10 hover:bg-blue-600/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group"
      >
        <img
          src="https://myhockeybio.com/wp-content/uploads/2025/03/MHB-Logo-white.png"
          alt="MyHockeyBio"
          className="h-5"
        />
        <span className="text-xs font-medium text-blue-100/90 group-hover:text-white transition-colors">
          Create yours →
        </span>
      </Link>
    </div>
  );
};

export default PublicProfile;
