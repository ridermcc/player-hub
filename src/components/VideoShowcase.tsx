
interface VideoShowcaseProps {
  url?: string;
}

export const VideoShowcase = ({ url }: VideoShowcaseProps) => {
  if (!url) {
    return (
      <div className="bg-card rounded-2xl border border-border shadow-sm p-8 text-center text-muted-foreground">
        No video added yet
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
      <div className="relative w-full pb-[56.25%] bg-black">
        <iframe
          src={url}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
          title="Highlight Reel"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};
