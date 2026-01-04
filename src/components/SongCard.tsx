import { Card, CardContent } from "@/components/ui/card";
import { useGameStore } from "@/store/game";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";
import { useRef, useState, useEffect, useMemo } from "react";

export default function SongCard() {
  const currentSong = useGameStore((state) => state.getCurrentSong());
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const artwork = useMemo(() => {
    const url = currentSong?.artwork_url;
    if (!url) return "";
    return url.replace(/\/\d+x\d+bb\.jpg$/, "/300x300bb.jpg");
  }, [currentSong]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.load();
    }
  }, [currentSong]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Card className="overflow-hidden">
        <CardContent className="relative flex justify-center items-center px-8 py-2">
          {artwork && (
            <div aria-hidden className="absolute inset-0 ">
              <img
                src={artwork}
                alt=""
                className={`
                  w-full h-full object-cover
                  blur-xl
                  saturate-150 brightness-110
                  scale-110
                  ${isPlaying ? "animate-pulse" : ""}
                `}
              />
            </div>
            
          )}

          {artwork && (
            <img
              src={artwork}
              alt="Album Art"
              className="relative rounded-lg"
            />
          )}
        </CardContent>

        <audio
          hidden
          ref={audioRef}
          src={currentSong?.preview_url}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      </Card>

      <Button onClick={togglePlay}>
        {isPlaying ? <Pause /> : <Play />}
        {isPlaying ? "Duraklat" : "Oynat"}
      </Button>
    </div>
  );
}
