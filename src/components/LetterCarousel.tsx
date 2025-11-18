import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function LetterCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!api) return;
      if (e.key === "ArrowRight") {
        api.scrollNext();
      } else if (e.key === "ArrowLeft") {
        api.scrollPrev();
      }
    };

    addEventListener("keydown", handleKeyDown);

    return () => {
      removeEventListener("keydown", handleKeyDown);
    };
  }, [api]);

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
          const isActive = index === current;
          return (
            <CarouselItem className="p-6 basis-1/5 md:basis-1/6" key={letter}>
              <div
                className={`
                      w-20 h-20 rounded-full flex items-center justify-center
                      transition-all duration-300 cursor-default border-2
                      ${
                        isActive
                          ? "scale-125 shadow-[0_3px_0_1px_rgba(239,68,68,0.8)] border-black"
                          : "border-gray-200"
                      }
                    `}
              >
                <span
                  className={`
                        transition-all duration-300
                        ${
                          isActive
                            ? "text-3xl font-bold"
                            : "text-xl text-gray-600"
                        }
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
