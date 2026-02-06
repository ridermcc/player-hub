
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/MockAuthContext';
import { ProfileRenderer } from '@/components/ProfileRenderer';

const PublicProfile = () => {
    const { username } = useParams();
    const { getProfile } = useAuth();

    const profile = getProfile(username || '');

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-muted-foreground">Profile @{username} not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="max-w-md mx-auto pt-10 min-h-screen border-x-0 md:border-x">
                <ProfileRenderer
                    profile={profile}
                    editable={false}
                />
            </div>
        </div>
    );
};

export default PublicProfile;
