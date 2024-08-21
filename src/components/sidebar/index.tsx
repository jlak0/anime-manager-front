import {
  HomeIcon,
  FolderIcon,
  ImageIcon,
  Music2Icon,
  VideoIcon,
  DownloadIcon,
} from "lucide-react";
export default function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <FolderIcon className="h-6 w-6" />
            <span className="">File Explorer</span>
          </a>
        </div>
        <SidebarItems></SidebarItems>
      </div>
    </div>
  );
}

function SidebarItems() {
  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start px-4 text-sm font-medium">
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <HomeIcon className="h-4 w-4" />
          Home
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <FolderIcon className="h-4 w-4" />
          Documents
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <ImageIcon className="h-4 w-4" />
          Images
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Music2Icon className="h-4 w-4" />
          Music
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <VideoIcon className="h-4 w-4" />
          Videos
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <DownloadIcon className="h-4 w-4" />
          Downloads
        </a>
      </nav>
    </div>
  );
}
