import Navbar from "@/components/navbar";
import MenuBar from "./components/menubar";
import Table from "@/components/table";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";

export function Home() {
  return (
    <div className="grid h-screen  w-full lg:grid-cols-[280px_1fr]">
      <Sidebar></Sidebar>
      <div className="flex flex-col">
        <Navbar></Navbar>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <MenuBar></MenuBar>
          <Table></Table>
          <Toaster />
        </main>
      </div>
    </div>
  );
}
