import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/game";
import { cn } from "@/lib/utils";

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
            <CarouselItem className="p-2 basis-1/5 md:basis-1/7" key={letter}>
              <div
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 cursor-default border-3",
                  isActive
                    ? "scale-110 shadow-[0_2px_0_1px_rgba(239,68,68,0.8)] bg-white dark:bg-accent border-black dark:border-white text-black dark:text-white"
                    : cn({
                        "bg-success border-success text-white":
                          status === "correct",
                        "bg-error border-error text-white": status === "wrong",
                        "bg-warning border-warning text-white":
                          status === "passed",
                        "bg-transparent border-gray-400 dark:border-gray-600":
                          status === "pending",
                      })
                )}
              >
                <span className={cn({ "font-bold": isActive })}>{letter}</span>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}
