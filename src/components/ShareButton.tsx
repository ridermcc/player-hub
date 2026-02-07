import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Share2, Copy, Check, X, QrCode } from 'lucide-react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ShareButtonProps {
    playerName: string;
    username: string;
}

export const ShareButton = ({ playerName, username }: ShareButtonProps) => {
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const profileUrl = typeof window !== 'undefined'
        ? `${window.location.origin}${import.meta.env.BASE_URL}${username}`
        : '';

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(profileUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${playerName} | MyHockeyBio`,
                    text: `Check out ${playerName}'s hockey profile`,
                    url: profileUrl,
                });
            } catch (err) {
                // User cancelled or share failed
                console.log('Share cancelled');
            }
        }
    };

    const canNativeShare = typeof navigator !== 'undefined' && navigator.share;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-3 rounded-full bg-card border-border shadow-sm hover:shadow-md transition-all"
                >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-center">Share Profile</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-6 py-4">
                    {/* QR Code */}
                    <div className="p-4 bg-white rounded-2xl shadow-inner">
                        <QRCodeSVG
                            value={profileUrl}
                            size={180}
                            level="H"
                            includeMargin={false}
                            bgColor="#ffffff"
                            fgColor="#1a365d"
                        />
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                        Scan to view {playerName}'s profile
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col w-full gap-2">
                        <Button
                            onClick={handleCopy}
                            variant="outline"
                            className="w-full justify-center gap-2"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 text-green-500" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    Copy Link
                                </>
                            )}
                        </Button>

                        {canNativeShare && (
                            <Button
                                onClick={handleNativeShare}
                                className="w-full justify-center gap-2"
                            >
                                <Share2 className="w-4 h-4" />
                                Share via...
                            </Button>
                        )}
                    </div>

                    {/* URL Preview */}
                    <div className="w-full px-3 py-2 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground truncate text-center font-mono">
                            {profileUrl}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
