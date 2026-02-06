
import React from 'react';
import { UserProfile, Block } from '@/context/MockAuthContext';
import { BlockRenderer } from './BlockRenderer';
import { PlayerHeader } from './PlayerHeader';
import { Button } from './ui/button';
import { Plus, Video, Trophy, Calendar, Users, GripHorizontal, Link as LinkIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface ProfileRendererProps {
    profile: UserProfile;
    editable?: boolean;
    onUpdateProfile?: (updates: Partial<UserProfile>) => void;
    onAddBlock?: (type: Block['type']) => void;
    onUpdateBlock?: (id: string, updates: Partial<Block>) => void;
    onDeleteBlock?: (id: string) => void;
}

export const ProfileRenderer = ({
    profile,
    editable,
    onUpdateProfile,
    onAddBlock,
    onUpdateBlock,
    onDeleteBlock
}: ProfileRendererProps) => {

    return (
        <div className="w-full max-w-md mx-auto pb-20">
            {/* Rich Header Section */}
            <PlayerHeader
                name={profile.displayName}
                number={profile.number || ''}
                position={profile.position || ''}
                team={profile.team || ''}
                league={profile.league || ''}
                nationality={profile.nationality || ''}
                age={profile.age || 0}
                height={profile.height || ''}
                weight={profile.weight || ''}
                shoots={profile.shoots || ''}
                flag={undefined}
                dob="2005"
            />

            {/* Blocks Section */}
            <div className="px-4 mt-6 space-y-4">
                {profile.blocks.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
                        {editable ? "Start building your MyHockeyBio below!" : "No content yet."}
                    </div>
                )}

                {profile.blocks.map((block) => (
                    <BlockRenderer
                        key={block.id}
                        block={block}
                        editable={editable}
                        onUpdate={onUpdateBlock}
                        onDelete={onDeleteBlock}
                    />
                ))}
            </div>

            {/* Admin Add Controls */}
            {editable && (
                <div className="sticky bottom-0 z-30 p-4 bg-background/80 backdrop-blur-lg border-t mt-8">
                    <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider text-center">Add Content Block</p>
                    <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" size="sm" onClick={() => onAddBlock && onAddBlock('stats')} className="flex flex-col h-auto py-3 gap-1">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            <span className="text-[10px]">Stats</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onAddBlock && onAddBlock('video')} className="flex flex-col h-auto py-3 gap-1">
                            <Video className="w-5 h-5 text-red-500" />
                            <span className="text-[10px]">Video</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onAddBlock && onAddBlock('games')} className="flex flex-col h-auto py-3 gap-1">
                            <Calendar className="w-5 h-5 text-blue-500" />
                            <span className="text-[10px]">Games</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onAddBlock && onAddBlock('partnerships')} className="flex flex-col h-auto py-3 gap-1">
                            <Users className="w-5 h-5 text-green-500" />
                            <span className="text-[10px]">Sponsors</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onAddBlock && onAddBlock('link')} className="flex flex-col h-auto py-3 gap-1">
                            <LinkIcon className="w-5 h-5" />
                            <span className="text-[10px]">Link</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onAddBlock && onAddBlock('header')} className="flex flex-col h-auto py-3 gap-1">
                            <GripHorizontal className="w-5 h-5" />
                            <span className="text-[10px]">Header</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
