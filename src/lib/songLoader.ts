// src/lib/songLoader.ts
import songsData from "@/assets/songs.json";
import { ALPHABET } from "@/constants/alphabet";

export interface Song {
  id: number;
  letter: string;
  track_name: string;
  artist_name: string;
  preview_url: string;
  artwork_url: string;
  track_view_url: string;
  genre: string;
  created_at: string;
}

const songsByLetter: Map<string, Song[]> = (() => {
  const map = new Map<string, Song[]>();

  for (const rawSong of songsData.songs as Song[]) {
    const letter = rawSong.letter;

    const song: Song = {
      ...rawSong,
      letter,
    };

    const arr = map.get(letter);
    if (arr) arr.push(song);
    else map.set(letter, [song]);
  }

  return map;
})();

const getRandomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

/**
 * Her harf için (varsa) 1 tane rastgele şarkı döndürür.
 * Bazı harflerde şarkı yoksa o harf atlanır.
 */
export const getSongsForGame = (): Song[] => {
  const songs: Song[] = [];

  for (const letter of ALPHABET) {
    const letterSongs = songsByLetter.get(letter);
    if (letterSongs?.length) {
      songs.push(getRandomElement(letterSongs));
    }
  }

  return songs;
};

/**
 * Verilen harf için rastgele bir şarkı döndürür.
 */
export const getSongByLetter = (letter: string): Song | undefined => {
  const key = letter;
  const letterSongs = songsByLetter.get(key);
  return letterSongs?.length ? getRandomElement(letterSongs) : undefined;
};

/**
 * (Opsiyonel) Gerekirse debug/istatistik için:
 * Her harf kaç şarkı var bilgisini döndürür.
 */
export const getSongCountsByLetter = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const letter of ALPHABET) {
    counts[letter] = songsByLetter.get(letter)?.length ?? 0;
  }
  return counts;
};
