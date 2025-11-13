import { useRef } from "react";

export default function PreviewPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div>
      <audio ref={audioRef} controls />
    </div>  
  );
}
