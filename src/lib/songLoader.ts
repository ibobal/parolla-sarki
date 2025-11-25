import songsData from "@/assets/songs.json";
import { ALPHABET } from "@/store/game";

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

export const groupSongsByAlphabet = (): Map<string, Song[]> => {
  const songsByLetter = new Map<string, Song[]>();

  for (const song of songsData.songs) {
    const letter = song.letter;
    if (!songsByLetter.has(letter)) {
      songsByLetter.set(letter, []);
    }
    songsByLetter.get(letter)!.push(song);
  }

  return songsByLetter;
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};


export const getSongsForGame = (): Song[] => {
  const songsByLetter = groupSongsByAlphabet();
  const songs: Song[] = [];

  for (const letter of ALPHABET) {
    const letterSongs = songsByLetter.get(letter);
    if (letterSongs && letterSongs.length > 0) {
      songs.push(getRandomElement(letterSongs));
    }
  }

  return songs;
};

export const getSongByLetter = (letter: string): Song | undefined => {
  const songsByLetter = groupSongsByAlphabet();
  const letterSongs = songsByLetter.get(letter);
  if (letterSongs && letterSongs.length > 0) {
    return getRandomElement(letterSongs);
  }
  return undefined;
};
