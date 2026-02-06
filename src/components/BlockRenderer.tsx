
import React from 'react';
import { Block } from '@/context/MockAuthContext';
import { LinkCard } from './LinkCard';
import { StatsCard } from './StatsCard';
import { VideoShowcase } from './VideoShowcase';
import { UpcomingGames } from './UpcomingGames';
import { Partnerships } from './Partnerships';
import { SocialBar } from './SocialBar';
import { Link, GripVertical, Trash2, Edit2 } from 'lucide-react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from './ui/input';
import { Label } from './ui/label';

interface BlockRendererProps {
    block: Block;
    editable?: boolean;
    onUpdate?: (id: string, updates: Partial<Block>) => void;
    onDelete?: (id: string) => void;
}

export const BlockRenderer = ({ block, editable, onUpdate, onDelete }: BlockRendererProps) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [editOpen, setEditOpen] = React.useState(false);

    // Local state for editing form
    const [editTitle, setEditTitle] = React.useState(block.title);
    const [editUrl, setEditUrl] = React.useState(block.url || '');

    const handleSave = () => {
        if (onUpdate) {
            onUpdate(block.id, {
                title: editTitle,
                url: editUrl
            });
        }
        setEditOpen(false);
    };

    const renderContent = () => {
        switch (block.type) {
            case 'header':
                return (
                    <h2 className="text-xl font-bold text-center my-4 text-foreground">
                        {block.title}
                    </h2>
                );
            case 'stats':
                return (
                    <div className="pointer-events-none">
                        <StatsCard />
                    </div>
                );
            case 'video':
                return <VideoShowcase />;
            case 'games':
                return <UpcomingGames />;
            case 'partnerships':
                return <Partnerships />;
            case 'social':
                return <SocialBar />;
            case 'link':
            default:
                return (
                    <LinkCard
                        href={block.url || '#'}
                        icon={<Link className="w-5 h-5" />}
                        label={block.title}
                    />
                );
        }
    };

    if (!editable) {
        return <div className="mb-3 w-full">{renderContent()}</div>;
    }

    return (
        <div
            className="relative mb-3 group w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Edit Controls Overlay */}
            <div className={`absolute -left-12 top-1/2 -translate-y-1/2 flex gap-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'} z-20`}>
                <Button variant="ghost" size="icon" className="cursor-grab">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                </Button>
            </div>

            <div className={`absolute -right-20 top-1/2 -translate-y-1/2 flex gap-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'} z-20`}>
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <Edit2 className="w-4 h-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Block</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                            </div>
                            {block.type === 'link' && (
                                <div className="space-y-2">
                                    <Label>URL</Label>
                                    <Input value={editUrl} onChange={(e) => setEditUrl(e.target.value)} />
                                </div>
                            )}
                            <Button onClick={handleSave} className="w-full">Save Changes</Button>
                        </div>
                    </DialogContent>
                </Dialog>

                <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onDelete && onDelete(block.id)}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            {renderContent()}
        </div>
    );
};
