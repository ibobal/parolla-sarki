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

  loadSongs: () => void;
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

  loadSongs: () => {
    set({ isLoading: true });
    try {
      const songs = getSongsForGame();
      set({ songs, isLoading: false });
    } catch (error) {
      console.error("Şarkılar yüklenirken hata oluştu:", error);
      set({ isLoading: false });
    }
  },

  startGame: () => {
    const { loadSongs, songs } = get();

    loadSongs();

    const initialQueue = songs.map((_, index) => index);

    const initialResults: Record<string, LetterStatus> = {};
    songs.forEach((s) => (initialResults[s.letter] = "pending"));
    set({
      queue: initialQueue,
      results: initialResults,
      gameStatus: "playing",
      score: 0,
    });
  },

  getCurrentSong: () => {
    const { queue, songs } = get();
    if (queue.length === 0) return null;
    return songs[queue[0]];
  },

  submitAnswer: (answer: string) => {
    const { queue, songs, results, score } = get();

    if (queue.length === 0) return;

    const currentIndex = queue[0]; // Şu anki şarkının indexi
    const currentSong = songs[currentIndex];

    if (!answer.startsWith(currentSong.letter)) return;

    const isCorrect = answer === currentSong.track_name;

    // 1. Skoru ve Durumu Güncelle
    const newStatus: LetterStatus = isCorrect ? "correct" : "wrong";
    const newScore = isCorrect ? score + 1 : score;

    // 2. Kuyruktan Çıkar (Listenin başını kes)
    const newQueue = queue.slice(1);

    set({
      score: newScore,
      queue: newQueue,
      results: {
        ...results,
        [currentSong.letter]: newStatus,
      },
      // Kuyruk bittiyse oyun biter
      gameStatus: newQueue.length === 0 ? "finished" : "playing",
    });
  },

  passTurn: () => {
    const { queue, songs, results } = get();
    if (queue.length === 0) return;

    const currentIndex = queue[0]; // Şu anki şarkı
    const currentSong = songs[currentIndex];

    // 1. Kuyruğu Döndür: Baştakini al, sona ekle.
    // [0, 1, 2] -> [1, 2, 0]
    const newQueue = [...queue.slice(1), currentIndex];

    set({
      queue: newQueue,
      results: {
        ...results,
        [currentSong.letter]: "passed", // UI'da sarı renk vs göstermek için
      },
    });
  },
}));
