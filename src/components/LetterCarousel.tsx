import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/game";

export default function LetterCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const currentIndex = useGameStore((state) => state.queue[0]);
  const results = useGameStore((state) => state.results);

  useEffect(() => {
    if (!api) return;
    api.scrollTo(currentIndex);
  }, [api, currentIndex]);

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
        {Object.entries(results).map(([letter, status], index) => {
          const isActive = index === currentIndex;
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
                      ${
                        status === "correct"
                          ? "bg-green-400 border-green-600"
                          : status === "wrong"
                          ? "bg-red-400 border-red-600"
                          : status === "passed"
                          ? "bg-amber-300 border-amber-500"
                          : "bg-white"
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
