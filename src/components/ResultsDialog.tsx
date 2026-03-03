import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useGameStore } from "@/store/gameStore";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { X, Check, CircleArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function Results() {
  const results = useGameStore((state) => state.results);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (gameStatus === "finished") setIsOpen(true);
  }, [gameStatus]);

  const stats = useMemo(() => {
    return Object.values(results).reduce(
      (acc, { status }) => {
        if (status === "correct") acc.correct++;
        if (status === "wrong") acc.wrong++;
        if (status === "passed") acc.passed++;
        return acc;
      },
      { correct: 0, wrong: 0, passed: 0 },
    );
  }, [results]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-155">
        <DialogHeader>
          <DialogTitle className="text-center">Sonuçlar</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="scoreboard">
          <TabsList
            variant="line"
            className="flex items-center justify-between w-full"
          >
            <TabsTrigger value="scoreboard">Skor Dağılımı</TabsTrigger>
            <TabsTrigger value="answerkey">Cevap Anahtarı</TabsTrigger>
          </TabsList>

          <TabsContent value="scoreboard" className="py-4">
            <div className="flex flex-col gap-2">
              <div>{`🟩 ${stats.correct} Doğru`}</div>
              <div>{`🟥 ${stats.wrong} Yanlış`}</div>
              <div>{`🟨 ${stats.passed} Pas`}</div>
            </div>
          </TabsContent>

          <TabsContent
            value="answerkey"
            className="py-4 flex items-center justify-center"
          >
            <ScrollArea className="h-80 pr-2 rounded-md border min-w-full">
              <Accordion type="single" collapsible>
                {Object.entries(results ?? {}).map(([letter, answer]) => (
                  <AccordionItem key={letter} value={letter} className="px-2">
                    <AccordionTrigger>
                      <div className="flex flex-1 justify-between">
                        <div className="flex flex-row items-center">
                          {answer.status === "correct" ? (
                            <Check
                              className="h-4 w-4 text-success"
                              aria-label="Doğru"
                            />
                          ) : answer.status === "passed" ? (
                            <CircleArrowRight
                              className="h-4 w-4 text-warning"
                              aria-label="Pas geçildi"
                            />
                          ) : (
                            <X
                              className="h-4 w-4 text-error"
                              aria-label="Yanlış"
                            />
                          )}
                          <span className="ml-2">{answer.correctAnswer}</span>
                        </div>
                        <span>{letter}</span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div>
                        <span className="font-bold">Sanatçı: </span>
                        {answer.artistName}
                      </div>
                      <div>
                        <span className="font-bold">Senin Cevabın: </span>
                        {answer.userAnswer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-center items-center w-full">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              KAPAT
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
