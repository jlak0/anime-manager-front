import { Input } from "../ui/input";
export default function Navbar() {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
      <div className="w-full flex-1">
        <Input
          type="search"
          placeholder="Search files..."
          className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
        />
      </div>
    </header>
  );
}
