
import React from 'react';
import { useAuth } from '@/context/MockAuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProfileRenderer } from '@/components/ProfileRenderer';
import { LogOut, Eye } from 'lucide-react';

const AdminPage = () => {
    const {
        user,
        currentUserProfile,
        logout,
        updateProfile,
        addBlock,
        updateBlock,
        removeBlock
    } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!currentUserProfile) return null;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-black/50">
            {/* Top Bar */}
            <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between px-4">
                    <div className="font-bold text-lg">Linktree MVP</div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => window.open(`/${currentUserProfile.username}`, '_blank')}>
                            <Eye className="mr-2 w-4 h-4" /> View Live
                        </Button>
                        <Button variant="destructive" size="sm" onClick={handleLogout}>
                            <LogOut className="mr-2 w-4 h-4" /> Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container py-8">
                <div className="flex gap-8 justify-center">
                    {/* We simulate the mobile view here for "WYSIWYG" feel */}
                    <div className="w-full max-w-[480px] bg-background border rounded-3xl shadow-xl min-h-[800px] overflow-hidden relative">
                        <div className="absolute top-0 left-0 right-0 h-6 bg-muted/50 z-10 flex justify-center items-center">
                            <div className="w-20 h-1.5 rounded-full bg-border/50" />
                        </div>
                        <div className="pt-8 h-full overflow-y-auto custom-scrollbar">
                            <ProfileRenderer
                                profile={currentUserProfile}
                                editable={true}
                                onUpdateProfile={updateProfile}
                                onAddBlock={(type) => addBlock({
                                    type,
                                    title: type === 'link' ? 'New Link' : 'New Header',
                                    url: type === 'link' ? 'https://' : undefined,
                                    isVisible: true
                                })}
                                onUpdateBlock={updateBlock}
                                onDeleteBlock={removeBlock}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
