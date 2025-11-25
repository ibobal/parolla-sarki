import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useGameStore, ALPHABET } from "@/store/game";

export default function LetterCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const passQuestion = useGameStore((state) => state.passQuestion);
  const currentLetterIndex = useGameStore((state) => state.currentLetterIndex);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        passQuestion();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [passQuestion]);

  useEffect(() => {
    if (!api) return;
    api.scrollTo(currentLetterIndex);
    console.log("Scrolling to letter index:", currentLetterIndex);
  }, [api, currentLetterIndex]);

  return (
    <Carousel
      opts={{
        watchDrag: false,
        align: "center",
        loop: false,
        containScroll: false,
      }}
      setApi={setApi}
    >
      <CarouselContent>
        {ALPHABET.map((letter, index) => {
          const isActive = index === currentLetterIndex;
          return (
            <CarouselItem className="p-6 basis-1/5 md:basis-1/7" key={letter}>
              <div
                className={`
                      w-20 h-20 rounded-full flex items-center justify-center
                      transition-all duration-300 cursor-default border-2
                      ${
                        isActive
                          ? "scale-110 shadow-[0_1.75px_0_1px_rgba(239,68,68,0.8)] border-black"
                          : "border-gray-200"
                      }
                    `}
              >
                <span
                  className={`
                        ${isActive ? "font-bold" : "text-gray-600"}
                      `}
                >
                  {letter}
                </span>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
