import { Card, CardContent } from "@/components/ui/card";
import { useGameStore } from "@/store/gameStore";
import { useAudioStore } from "@/store/audioStore";
import { audioManager } from "@/lib/audioManager";
import { useEffect, useMemo } from "react";
import { Play, Pause } from "lucide-react";

export default function SongCard() {
  const currentSong = useGameStore((state) => state.getCurrentSong());
  const { isPlaying, setIsPlaying } = useAudioStore();

  const artwork = useMemo(() => {
    const url = currentSong?.artwork_url;
    if (!url) return "";
    return url.replace(/\/\d+x\d+bb\.jpg$/, "/300x300bb.jpg");
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong?.preview_url) {
      audioManager.stopSong();
      setIsPlaying(false);
      return;
    }

    audioManager.loadSong(currentSong.preview_url, () => {
      setIsPlaying(false);
    });
    setIsPlaying(true);
  }, [currentSong?.preview_url, setIsPlaying]);

  const handlePlayPause = () => {
    audioManager.togglePlay();
    setIsPlaying(audioManager.isPlaying());
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Card className="overflow-hidden select-none" onClick={handlePlayPause}>
        <CardContent className="relative flex justify-center items-center px-8 py-2 group">
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
                draggable={false}
              />
            </div>
          )}

          {artwork && (
            <div>
              <div className="absolute z-10 cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-in-out">
                {isPlaying ? (
                  <Pause className="opacity-0 group-hover:opacity-100 w-20 h-20 p-4 text-primary drop-shadow-lg backdrop-blur-none hover:border hover:bg-accent/80 hover:bg-opacity-20 transition-all rounded-full" />
                ) : (
                  <Play className="opacity-80 group-hover:opacity-100 w-20 h-20 p-4 text-primary drop-shadow-lg backdrop-blur-none hover:border hover:bg-accent/80 transition-all rounded-full" />
                )}
              </div>
              <img
                src={artwork}
                alt="Album Art"
                className={`relative rounded-lg transition-all border drop-shadow-lg ${
                  isPlaying ? "scale-105" : ""
                }`}
                draggable={false}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
