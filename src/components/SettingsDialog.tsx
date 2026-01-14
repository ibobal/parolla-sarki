import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useAudioStore } from "@/store/audioStore";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export function SettingsDialog() {
  const { volume, setVolume } = useAudioStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className=" cursor-pointer">
          <Settings className="scale-150" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80">
        <DialogHeader>
          <DialogTitle className="text-xl">Ayarlar</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <label className="text-sm font-medium block">Tema</label>
          <ModeToggle />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <span>Ses Düzeyi</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {Math.round(volume * 100)}%
              </span>
            </label>
            <Slider
              value={[volume * 100]}
              max={100}
              step={1}
              onValueChange={(value) => {
                setVolume(value[0] / 100);
              }}
              className="w-full"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
