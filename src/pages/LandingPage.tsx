
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/MockAuthContext';
import { ProfileRenderer } from '@/components/ProfileRenderer';

const LandingPage = () => {
    const { getProfile } = useAuth();
    const riderProfile = getProfile('ridermccallum');

    if (!riderProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background pb-24">
            <div className="max-w-md mx-auto min-h-screen border-x-0 md:border-x bg-background relative z-0">
                <ProfileRenderer profile={riderProfile} editable={false} />
            </div>

            {/* Sticky Signup Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur border-t z-50">
                <div className="max-w-md mx-auto flex flex-col gap-2">
                    <p className="text-center text-sm font-medium">Want a profile like this?</p>
                    <Link to="/signup" className="w-full">
                        <Button size="lg" className="w-full text-lg font-bold shadow-xl animate-pulse bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0">
                            Build your own MyHockeyBio
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
