
import React from 'react';
import { UserProfile, Block } from '@/context/MockAuthContext';
import { BlockRenderer } from './BlockRenderer';
import { Button } from './ui/button';
import { Plus, Image as ImageIcon } from 'lucide-react';
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
    const [editingHeader, setEditingHeader] = React.useState(false);
    const [tempName, setTempName] = React.useState(profile.displayName);
    const [tempBio, setTempBio] = React.useState(profile.bio);

    const saveHeader = () => {
        if (onUpdateProfile) {
            onUpdateProfile({ displayName: tempName, bio: tempBio });
        }
        setEditingHeader(false);
    };

    return (
        <div className="w-full max-w-md mx-auto pb-20">
            {/* Header Section */}
            <div className="flex flex-col items-center text-center p-6 space-y-4">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-secondary overflow-hidden border-2 border-border">
                        {profile.avatarUrl ? (
                            <img src={profile.avatarUrl} alt={profile.displayName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground">
                                {profile.displayName.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    {editable && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <ImageIcon className="text-white w-6 h-6" />
                        </div>
                    )}
                </div>

                {editable && editingHeader ? (
                    <div className="w-full space-y-2 p-4 bg-card border rounded-lg shadow-sm">
                        <Input
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            placeholder="Display Name"
                            className="text-center font-bold"
                        />
                        <Textarea
                            value={tempBio}
                            onChange={(e) => setTempBio(e.target.value)}
                            placeholder="Bio"
                            className="text-center"
                        />
                        <div className="flex gap-2 justify-center">
                            <Button size="sm" onClick={saveHeader}>Save</Button>
                            <Button size="sm" variant="ghost" onClick={() => setEditingHeader(false)}>Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <div onClick={() => editable && setEditingHeader(true)} className={editable ? "cursor-pointer hover:bg-black/5 p-2 rounded-lg transition-colors" : ""}>
                        <h1 className="text-2xl font-bold tracking-tight">{profile.displayName}</h1>
                        <p className="text-muted-foreground mt-2">{profile.bio}</p>
                    </div>
                )}
            </div>

            {/* Blocks Section */}
            <div className="px-4 space-y-4">
                {profile.blocks.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
                        {editable ? "Add your first block below!" : "No links yet."}
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
                <div className="sticky bottom-6 mt-8 flex justify-center gap-2">
                    <Button onClick={() => onAddBlock && onAddBlock('link')} className="shadow-lg rounded-full px-6">
                        <Plus className="mr-2 w-4 h-4" /> Add Link
                    </Button>
                    <Button onClick={() => onAddBlock && onAddBlock('header')} variant="secondary" className="shadow-lg rounded-full px-6">
                        Add Header
                    </Button>
                </div>
            )}
        </div>
    );
};
