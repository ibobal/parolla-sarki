import { Music, ArrowLeftIcon, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-2 px-4 border-b">
      <ArrowLeftIcon size={24} />
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">parolla-şarkı</h1>
        <Music size={24} />
      </div>
      <UserCircle size={24} />
    </header>
  );
}
