import { useGameStore } from "@/store/game";
import { useEffect } from "react";
import GuessInput from "@/components/GuessInput";
import LetterCarousel from "@/components/LetterCarousel";
import SongCard from "@/components/SongCard";
import { Spinner } from "@/components/ui/spinner";

export default function Game() {
  const startGame = useGameStore((state) => state.startGame);
  const isLoading = useGameStore((state) => state.isLoading);

  useEffect(() => {
    startGame();
  }, [startGame]);

  return isLoading ? (
    <div className="flex flex-1 items-center justify-center">
      <Spinner className="size-8"/>
    </div>
  ) : (
    <div className="flex flex-col flex-1 justify-between p-4">
      <LetterCarousel />
      <SongCard />
      <GuessInput />
    </div>
  );
}
