import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { normalizeText } from "@/lib/utils";
import { Button } from "./ui/button";

export default function GuessInput() {
  const [guess, setGuess] = useState("");
  const checkAnswer = useGameStore((state) => state.submitAnswer);
  const passTurn = useGameStore((state) => state.passTurn);
  const finishGame = useGameStore((state) => state.finishGame);
  const currentSong = useGameStore((state) => state.getCurrentSong());
  const gameStatus = useGameStore((state) => state.gameStatus);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        passTurn();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameStatus, passTurn]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (guess === "pas") {
      passTurn();
      setGuess("");
      return;
    } else if (guess === "bitir") {
      finishGame();
      setGuess("");
    }

    if (currentSong) {
      const normalizedAnswer = normalizeText(guess);
      const songLetterNormalized = normalizeText(currentSong.letter);

      if (!normalizedAnswer.startsWith(songLetterNormalized) && normalizedAnswer !== "pas" && normalizedAnswer !== "bitir") {
        toast.warning(`Cevap "${currentSong.letter}" harfi ile başlamalı`);
        setGuess("");
        return;
      }
    }

    checkAnswer(guess);
    setGuess("");
  };

  return (
    <form
      className="relative flex items-center"
      onSubmit={handleSubmit}
      id="user-answer"
    >
      <Input
        type="text"
        placeholder="Cevabı yaz"
        className="w-full px-4 py-6 pr-20 rounded-lg"
        value={guess}
        onChange={handleChange}
        autoComplete="off"
        disabled={gameStatus !== "playing"}
      />
      {guess.length === 0 ? (
        <Button
          onClick={passTurn}
          className="absolute right-1.5 flex items-center bg-warning hover:bg-amber-400 rounded-sm text-md font-medium text-white"
          disabled={gameStatus !== "playing"}
        >
          <ChevronRight className="w-6 h-6" />
          <span>PAS</span>
        </Button>
      ) : (
        <Button
          className="absolute right-1.5 flex items-center bg-error hover:bg-red-400 rounded-sm text-md font-medium text-white"
          disabled={gameStatus !== "playing"}
        >
          <ChevronRight className="w-6 h-6" />
          <span>GÖNDER</span>
        </Button>
      )}
    </form>
  );
}
