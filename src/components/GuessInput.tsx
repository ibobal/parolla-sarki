import { Send } from "lucide-react";
import { useState } from "react";

export default function GuessInput() {
  const [guess, setGuess] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Cevabı yaz"
        className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400 transition"
        value={guess}
        onChange={handleChange}
      />
      <button className="absolute right-1 flex items-center gap-2 bg-red-400 hover:bg-red-500 px-3 py-2 rounded-md transition-colors text-white text-sm font-medium">
        <Send className="w-4 h-4" />
        <span>GÖNDER</span>
      </button>
    </div>
  );
}
