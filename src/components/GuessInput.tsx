import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useGameStore } from "@/store/game";
import { Input } from "./ui/input";

export default function GuessInput() {
  const [guess, setGuess] = useState("");
  const checkAnswer = useGameStore((state) => state.submitAnswer);
  const passTurn = useGameStore((state) => state.passTurn);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        passTurn();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [passTurn]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (guess === "pas") {
      passTurn();
      setGuess("");
      return;
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
      />
      {guess.length === 0 ? (
        <button
          onClick={passTurn}
          className="absolute right-1 flex items-center gap-1 bg-warning px-3 hover:bg-amber-400 py-2 rounded-sm text-md font-medium text-white"
        >
          <ChevronRight className="w-6 h-6" />
          <span>PAS</span>
        </button>
      ) : (
        <button className="absolute right-1 flex items-center gap-1 bg-error hover:bg-red-400 px-3 py-2 rounded-sm text-md font-medium text-white">
          <ChevronRight className="w-6 h-6" />
          <span>GÖNDER</span>
        </button>
      )}
    </form>
  );
}
