import { Play } from "lucide-react";



export const VideoShowcase = () => {
  return (
    <div className="-mx-4 w-[calc(100%+2rem)]">
      <div className="relative w-full pb-[56.25%] bg-black">
        <iframe
          src="https://player.vimeo.com/video/1083704020?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
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
