import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import { useEffect, useState } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function SongCard() {
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
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>00:00</CardAction>
      </CardHeader>
      <Carousel
        opts={{
          watchDrag: false,
          align: "center",
          loop: false,
          containScroll: false,
          duration: 21,
        }}
        setApi={setApi}
        className="w-sm mx-auto"
      >
        <CarouselContent>
          {ALPHABET.map((letter, index) => {
            const isActive = index === current;
            return (
              <CarouselItem key={letter}>
                <CardContent className="flex flex-col items-center">
                  <img
                    src="src/assets/background.png"
                    alt="Song Artwork"
                    className="rounded h-64 w-64"
                  />
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold">Song Name {letter}</h2>
                    <CardDescription>Artist Name</CardDescription>
                  </div>
                </CardContent>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
