import { Send } from "lucide-react";
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
    checkAnswer(guess);
    setGuess("");
  };

  return (
    <form className="relative flex items-center" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Cevabı yaz"
        className="w-full px-4 py-6 pr-20 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 transition"
        value={guess}
        onChange={handleChange}
      />
      <button className="absolute right-1 flex items-center gap-2 bg-red-400 hover:bg-red-500 px-3 py-2 rounded-md transition-colors text-white text-sm font-medium">
        <Send className="w-4 h-4" />
        <span>GÖNDER</span>
      </button>
    </form>
  );
}
