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

export const getSongByLetter = (letter: string): Song | undefined => {
  const key = letter;
  const letterSongs = songsByLetter.get(key);
  return letterSongs?.length ? getRandomElement(letterSongs) : undefined;
};

export const getSongCountsByLetter = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const letter of ALPHABET) {
    counts[letter] = songsByLetter.get(letter)?.length ?? 0;
  }
  return counts;
};
