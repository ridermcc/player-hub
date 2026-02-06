
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                One Link. Infinite Possibilities.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl">
                Join the best athletes and creators. Create your free Profile today.
            </p>
            <div className="flex gap-4">
                <Link to="/signup">
                    <Button size="lg" className="text-lg px-8">
                        Create your Linktree
                    </Button>
                </Link>
                <Link to="/login">
                    <Button variant="outline" size="lg" className="text-lg px-8">
                        Log In
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
