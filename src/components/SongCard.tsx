import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGameStore } from "@/store/game";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function SongCard() {
  const currentSong = useGameStore((state) => state.getCurrentSong());
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{currentSong?.track_name}</CardTitle>
        <CardDescription>
          {currentSong?.artist_name}
        </CardDescription>
        <CardAction>{audioRef.current?.currentTime.toFixed(2)}</CardAction>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <img
          src={currentSong?.artwork_url.replace(
            /\/\d+x\d+bb\.jpg$/,
            "/300x300bb.jpg"
          )}
          alt="Album Art"
        />
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Button onClick={togglePlay}>
          {audioRef.current?.paused ? <Play /> : <Pause />}
          {audioRef.current?.paused ? "Oynat" : "Duraklat"}
        </Button>
      </CardFooter>
      <audio
        hidden
        ref={audioRef}
        src={currentSong?.preview_url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
    </Card>
  );
}
