
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

      {/* Subtle footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border z-50">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <img src="https://myhockeybio.com/wp-content/uploads/2025/03/MHB-Logo-white.png" alt="MyHockeyBio" className="h-4 inline" />
          </p>
          <Link
            to="/signup"
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Create yours →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
