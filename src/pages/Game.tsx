import GuessInput from "@/components/GuessInput";
import LetterCarousel from "@/components/LetterCarousel";
import PreviewPlayer from "@/components/PreviewPlayer";
import SongCard from "@/components/SongCard";

export default function Game() {
  return (
    <div className="flex flex-col justify-between flex-1 p-4">
      <LetterCarousel />
      <SongCard />
      <PreviewPlayer />
      <GuessInput />
    </div>
  );
}
