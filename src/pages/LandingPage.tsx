
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/MockAuthContext';
import { ProfileRenderer } from '@/components/ProfileRenderer';

const LandingPage = () => {
  const { getProfile } = useAuth();
  const riderProfile = getProfile('ridermccallum');

  if (!riderProfile) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto min-h-screen bg-background relative z-0">
        <ProfileRenderer profile={riderProfile} editable={false} />
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

export default LandingPage;
