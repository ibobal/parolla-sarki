import { create } from "zustand";
import { getSongsForGame, type Song } from "@/lib/songLoader";
import { audioManager } from "@/lib/audioManager";
import { normalizeText } from "@/lib/utils";
import { checkAnswer } from "@/lib/answerChecker";

type LetterStatus = "pending" | "correct" | "wrong" | "passed";

type Answers = {
  status: LetterStatus;
  correctAnswer: string;
  userAnswer: string | null;
  artistName: string;
};

type GameStatus = "not_started" | "playing" | "finished";

interface GameState {
  songs: Song[];
  gameStatus: GameStatus;
  isLoading: boolean;
  queue: number[];
  results: Record<string, Answers>;

  startGame: () => void;
  getCurrentSong: () => Song | null;
  submitAnswer: (answer: string) => void;
  passTurn: () => void;
  finishGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  songs: [],
  gameStatus: "not_started",
  isLoading: false,
  queue: [],
  results: {},

  startGame: async () => {
    set({ isLoading: true });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const songs = getSongsForGame();
      const initialQueue = songs.map((_, i) => i);

      const initialResults: Record<string, Answers> = {};
      songs.forEach((s) => {
        initialResults[s.letter] = {
          status: "pending",
          correctAnswer: s.track_name,
          userAnswer: null,
          artistName: s.artist_name,
        };
      });

      set({
        songs,
        isLoading: false,
        queue: initialQueue,
        results: initialResults,
        gameStatus: "playing",
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
    const { queue, songs } = get();
    if (queue.length === 0) return;

    const currentIndex = queue[0];
    const currentSong = songs[currentIndex];

    const normalizedAnswer = normalizeText(answer);
    const normalizedCorrect = normalizeText(currentSong.track_name);

    const songLetterNormalized = normalizeText(currentSong.letter);
    if (!normalizedAnswer.startsWith(songLetterNormalized)) return;

    const answerCheck = checkAnswer(normalizedAnswer, normalizedCorrect, 75);
    const isCorrect = answerCheck.isCorrect || answerCheck.isSimilar;

    audioManager.playSfx(isCorrect ? "correct" : "wrong");

    set((state) => {
      const newQueue = state.queue.slice(1);
      const nextStatus: LetterStatus = isCorrect ? "correct" : "wrong";

      return {
        queue: newQueue,
        results: {
          ...state.results,
          [currentSong.letter]: {
            ...state.results[currentSong.letter],
            status: nextStatus,
            userAnswer: answer,
          },
        },
        gameStatus: newQueue.length === 0 ? "finished" : "playing",
      };
    });
  },

  passTurn: () => {
    const { queue, songs } = get();
    if (queue.length === 0) return;

    const currentIndex = queue[0];
    const currentSong = songs[currentIndex];

    audioManager.playSfx("pass");

    set((state) => {
      const newQueue = [...state.queue.slice(1), currentIndex];

      return {
        queue: newQueue,
        results: {
          ...state.results,
          [currentSong.letter]: {
            ...state.results[currentSong.letter],
            status: "passed",
            userAnswer: null,
          },
        },
      };
    });
  },

  finishGame: () => {
    audioManager.stopSong();
    set({ gameStatus: "finished" });
  },

  resetGame: () => {
    audioManager.stopSong();
    set({
      songs: [],
      gameStatus: "not_started",
      isLoading: false,
      queue: [],
      results: {},
    });
  },
}));
