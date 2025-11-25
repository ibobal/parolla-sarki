import { create } from "zustand";
import { getSongsForGame, type Song } from "@/lib/songLoader";

export const ALPHABET = [
  "A",
  "B",
  "C",
  "Ç",
  "D",
  "E",
  "F",
  "G",
  "H",
  "İ",
  "K",
  "L",
  "M",
  "N",
  "O",
  "Ö",
  "P",
  "R",
  "S",
  "Ş",
  "T",
  "U",
  "Ü",
  "V",
  "Y",
  "Z",
];

type LetterStatus = "idle" | "current" | "correct" | "wrong" | "passed";

type GameStatus = "not_started" | "playing" | "finished";

interface GameState {
  songs: Song[];
  currentLetterIndex: number;
  score: number;
  gameStatus: GameStatus;
  isLoading: boolean;
  timeLeft: number;

  startGame: () => void;
  passQuestion: () => void;
  tickTimer: () => void;
  loadSongs: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  songs: [],
  currentLetterIndex: 0,
  score: 0,
  gameStatus: "not_started",
  isLoading: false,
  timeLeft: 180,

  loadSongs: () => {
    try {
      const songs = getSongsForGame();
      set({ songs, isLoading: false });
    } catch (error) {
      console.error("Şarkılar yüklenirken hata oluştu:", error);
      set({ isLoading: false });
    }
  },

  startGame: () => set({ gameStatus: "playing" }),

  passQuestion: () => {
    const { currentLetterIndex } = get();
    if (currentLetterIndex == ALPHABET.length - 1) {
      set({
        currentLetterIndex: 0,
      });
    } else {
      set({
        currentLetterIndex: currentLetterIndex + 1,
      });
    }
  },

  tickTimer: () => set((state) => ({ timeLeft: state.timeLeft - 1 })),
}));
