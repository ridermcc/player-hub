import { Play, ExternalLink } from "lucide-react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  url: string;
}

interface VideoShowcaseProps {
  videos: Video[];
}

export const VideoShowcase = ({ videos }: VideoShowcaseProps) => {
  return (
    <div className="space-y-3">
      {videos.map((video) => (
        <a
          key={video.id}
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex gap-3 glass rounded-xl overflow-hidden border border-border/50 link-card-hover"
        >
          {/* Thumbnail */}
          <div className="relative w-28 h-20 flex-shrink-0 bg-secondary overflow-hidden">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/40 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
              </div>
            </div>
            <span className="absolute bottom-1 right-1 text-[10px] bg-background/80 px-1.5 py-0.5 rounded font-medium">
              {video.duration}
            </span>
          </div>
          
          {/* Info */}
          <div className="flex-1 py-2 pr-3 flex flex-col justify-center">
            <p className="font-medium text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {video.title}
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <ExternalLink className="w-3 h-3" />
              <span>Watch Highlight</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
