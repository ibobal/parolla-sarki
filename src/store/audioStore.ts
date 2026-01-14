import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { audioManager } from "@/lib/audioManager";

interface AudioState {
  volume: number;
  isMuted: boolean;
  isPlaying: boolean;

  setVolume: (val: number) => void;
  toggleMute: () => void;
  setIsPlaying: (playing: boolean) => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      volume: 0.1,
      isMuted: false,
      isPlaying: false,

      setVolume: (val) => {
        set({ volume: val });
        const { isMuted } = get();
        if (!isMuted) {
          audioManager.updateVolume(val);
        }
      },

      toggleMute: () => {
        const newMuteStatus = !get().isMuted;
        set({ isMuted: newMuteStatus });
        const currentVolume = get().volume;
        audioManager.updateVolume(newMuteStatus ? 0 : currentVolume);
      },

      setIsPlaying: (playing) => {
        set({ isPlaying: playing });
      },
    }),
    {
      name: "game-audio-settings",
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        if (state) {
          const effectiveVolume = state.isMuted ? 0 : state.volume;
          audioManager.updateVolume(effectiveVolume);
        }
      },
    }
  )
);
