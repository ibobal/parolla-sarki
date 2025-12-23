import { Link } from "react-router";
import {
  CalendarDays,
  InfinityIcon,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4 gap-8">
      <div className="grid grid-cols-1 gap-6 w-1/2">
        <Link to="/game" className="group">
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CalendarDays className="w-24 h-24 -mr-8 -mt-8 rotate-12" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CalendarDays className="w-5 h-5" />
                Günlük
              </CardTitle>
              <CardDescription>Günlük</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm font-medium transition-colors">
                Oyna
                <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/game" className="group">
          <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <InfinityIcon className="w-24 h-24 -mr-8 -mt-8 rotate-12" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <InfinityIcon className="w-5 h-5" />
                Limitsiz
              </CardTitle>
              <CardDescription>Limitsiz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm font-medium transition-colors">
                Oyna
                <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Button variant="ghost" size="sm" className="text-zinc-500">
        <Headphones className="w-4 h-4 mr-2" />
        Nasıl Oynanır?
      </Button>
    </div>
  );
}
