
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
      {/* Subtle footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border z-50">
        <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Built with <span className="font-bold text-primary">MyHockeyBio</span>
          </p>
          <Link to="/signup" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
            Create yours →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
