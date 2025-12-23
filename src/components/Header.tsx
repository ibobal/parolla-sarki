import { Music, ArrowLeft, UserCircle, Globe } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className="flex justify-between items-center py-2 px-4 border-b">
      {isHomePage ? (
        <Button variant="ghost" className="cursor-pointer">
          <Globe className="scale-150" />
        </Button>
      ) : (
        <Button variant="ghost" asChild>
          <Link to="/">
            <ArrowLeft className="scale-150" />
          </Link>
        </Button>
      )}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">parolla-şarkı</h1>
        <Music />
      </div>
      <div>
        <ModeToggle />
        <Button variant="ghost" className="cursor-pointer">
          <UserCircle className="scale-150" />
        </Button>
      </div>
    </header>
  );
}
