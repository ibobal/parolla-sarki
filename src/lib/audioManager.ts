// lib/AudioManager.ts
import { Howl, Howler } from "howler";

class AudioManager {
  private static instance: AudioManager;
  private sfxCache: Record<string, Howl> = {};
  private currentSong: Howl | null = null;
  private onSongEnd: (() => void) | null = null;

  private constructor() {}

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public loadSong(url: string, onEnd?: () => void): void {
    if (this.currentSong) {
      this.currentSong.stop();
      this.currentSong.unload();
    }

    this.onSongEnd = onEnd || null;

    this.currentSong = new Howl({
      src: [url],
      html5: true,
      onend: () => {
        this.onSongEnd?.();
      },
      onload: () => {
        this.currentSong?.play();
      }
    });
  }

  public togglePlay(): void {
    if (!this.currentSong) return;

    if (this.currentSong.playing()) {
      this.currentSong.pause();
    } else {
      this.currentSong.play();
    }
  }

  public isPlaying(): boolean {
    return this.currentSong?.playing() ?? false;
  }

  public stopSong(): void {
    if (this.currentSong) {
      this.currentSong.stop();
      this.currentSong.unload();
      this.currentSong = null;
    }
  }

  public playSfx(type: "correct" | "wrong" | "pass") {
    const sfxMap = {
      correct: "/src/assets/sfx/correct.wav",
      wrong: "/src/assets/sfx/wrong.wav",
      pass: "/src/assets/sfx/pass.wav",
    };

    if (!this.sfxCache[type]) {
      this.sfxCache[type] = new Howl({
        src: [sfxMap[type]],
      });
    }

    this.sfxCache[type].play();
  }

  public updateVolume(vol: number) {
    Howler.volume(vol);
  }
}

export const audioManager = AudioManager.getInstance();
