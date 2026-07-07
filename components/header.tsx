import { Gamepad2, LogOut, Search } from "lucide-react";
import { logout } from "@/actions/users";
import { Input } from "@/components/ui/input";
import AddCollectionDialog from "./add-collection-dialog";
import { Button } from "./ui/button";

export default function Header({
  userId,
  searchState,
  setSearchState,
}: {
  userId: string;
  searchState: string;
  setSearchState: (value: string) => void;
}) {
  const handleLogOut = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-40 border-border border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-primary to-accent">
              <Gamepad2 className="text-white" size={18} />
            </div>
            <div>
              <h1 className="font-bold font-display text-foreground text-xl tracking-tight">
                GameVault
              </h1>
              <p className="hidden text-muted-foreground text-xs sm:block">
                Manage your game collection
              </p>
            </div>
            <Button className="ml-auto sm:hidden" onClick={handleLogOut}>
              <LogOut />
            </Button>
          </div>

          <div className="flex flex-1 items-center gap-3">
            <div className="relative max-w-md flex-1">
              <Search
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                size={16}
              />
              <Input
                className="flex h-9 border-border bg-secondary pl-9 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onChange={(e) => setSearchState(e.target.value)}
                placeholder="Search games..."
                value={searchState}
              />
            </div>

            <AddCollectionDialog userId={userId} />
          </div>
          <Button className="max-sm:hidden" onClick={handleLogOut}>
            <LogOut />
          </Button>
        </div>
      </div>
    </header>
  );
}
