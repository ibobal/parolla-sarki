import { create } from "zustand";
import { getSongsForGame, type Song } from "@/lib/songLoader";

type LetterStatus = "pending" | "correct" | "wrong" | "passed";

type GameStatus = "not_started" | "playing" | "finished";

interface GameState {
  songs: Song[];
  gameStatus: GameStatus;
  isLoading: boolean;
  queue: number[];
  results: Record<string, LetterStatus>;
  score: number;

  startGame: () => void;
  getCurrentSong: () => Song | null;
  submitAnswer: (answer: string) => void;
  passTurn: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  songs: [],
  gameStatus: "not_started",
  isLoading: false,
  queue: [],
  results: {},
  score: 0,

  startGame: async () => {
    set({ isLoading: true });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const songs = getSongsForGame();
      const initialQueue = songs.map((_, i) => i);

      const initialResults: Record<string, LetterStatus> = {};
      songs.forEach((s) => (initialResults[s.letter] = "pending"));

      set({
        songs,
        isLoading: false,
        queue: initialQueue,
        results: initialResults,
        gameStatus: "playing",
        score: 0,
      });
    } catch (e) {
      console.error("Şarkılar yüklenirken hata oluştu:", e);
      set({ isLoading: false });
    }
  },

  getCurrentSong: () => {
    const { queue, songs } = get();
    if (queue.length === 0) return null;
    return songs[queue[0]];
  },

  submitAnswer: (answer: string) => {
    const { queue, songs, results, score } = get();

    if (queue.length === 0) return;

    const currentIndex = queue[0];
    const currentSong = songs[currentIndex];

    if (!answer.startsWith(currentSong.letter)) return;

    const isCorrect = answer === currentSong.track_name;

    const newStatus: LetterStatus = isCorrect ? "correct" : "wrong";
    const newScore = isCorrect ? score + 1 : score;

    const newQueue = queue.slice(1);

    set({
      score: newScore,
      queue: newQueue,
      results: {
        ...results,
        [currentSong.letter]: newStatus,
      },
      gameStatus: newQueue.length === 0 ? "finished" : "playing",
    });
  },

  passTurn: () => {
    const { queue, songs, results } = get();
    if (queue.length === 0) return;

    const currentIndex = queue[0];
    const currentSong = songs[currentIndex];

    const newQueue = [...queue.slice(1), currentIndex];

    set({
      queue: newQueue,
      results: {
        ...results,
        [currentSong.letter]: "passed",
      },
    });
  },
}));
