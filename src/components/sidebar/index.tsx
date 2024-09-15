import {
  HomeIcon,
  FolderIcon,
  ImageIcon,
  Music2Icon,
  VideoIcon,
  DownloadIcon,
} from "lucide-react";
import Navbar from "../navbar";
import { useDirectory } from "@/store/dirStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRef } from "react";
import { toast } from "sonner";

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
        <Navbar></Navbar>
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
        <UploadFile></UploadFile>
      </nav>
    </div>
  );
}

function UploadFile() {
  const { mutate, path } = useDirectory();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const filesFormData = new FormData();

    // 将文件添加到新的 FormData 对象中，使用 "files" 作为键名
    const files = formData.getAll("files");
    files.forEach((file) => {
      filesFormData.append("files", file);
    });

    filesFormData.append("uploadPath", path);

    const resp = await fetch("/api/upload", {
      method: "POST",
      body: filesFormData,
    });
    if (resp.ok) {
      mutate();
      inputRef.current.value = "";
      toast("上传成功");
    } else {
      toast("上传失败");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2">
      <Input
        placeholder="上传字幕文件"
        type="file"
        name="files"
        multiple
        accept=".srt,.ass,.ssa"
        ref={inputRef}
      />
      <Button className="w-full" type="submit">
        上传
      </Button>
    </form>
  );
}
