import { useGameStore } from "@/store/game";
import { useEffect } from "react";
import GuessInput from "@/components/GuessInput";
import LetterCarousel from "@/components/LetterCarousel";
import SongCard from "@/components/SongCard";

export default function Game() {
  const loadSongs = useGameStore((state) => state.loadSongs);

  useEffect(() => {
    loadSongs();
  }, [loadSongs]);

  return (
    <div className="flex flex-col justify-between flex-1 p-4">
      <LetterCarousel />
      <SongCard />
      <GuessInput />
    </div>
  );
}
