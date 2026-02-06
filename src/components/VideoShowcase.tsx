import { Play } from "lucide-react";

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
          className="group flex gap-4 bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md hover:border-primary/20 transition-all duration-200"
        >
          {/* Thumbnail */}
          <div className="relative w-32 h-24 flex-shrink-0 bg-secondary overflow-hidden">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <div className="w-9 h-9 rounded-full bg-card/90 flex items-center justify-center shadow-sm">
                <Play className="w-4 h-4 text-primary fill-primary ml-0.5" />
              </div>
            </div>
            <span className="absolute bottom-1.5 right-1.5 text-[10px] bg-foreground/80 text-primary-foreground px-1.5 py-0.5 rounded font-bold">
              {video.duration}
            </span>
          </div>
          
          {/* Info */}
          <div className="flex-1 py-3 pr-4 flex flex-col justify-center">
            <p className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {video.title}
            </p>
            <span className="text-[11px] text-muted-foreground mt-1">Watch Highlight →</span>
          </div>
        </a>
      ))}
    </div>
  );
};
