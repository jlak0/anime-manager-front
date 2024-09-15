import Table from "@/components/table";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import P from "./components/pagination";
import { useState } from "react";
export function Home() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  return (
    <div className="grid h-screen  w-full lg:grid-cols-[280px_1fr]">
      <Sidebar></Sidebar>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <Table
            page={page}
            setPage={setPage}
            setTotalPages={setTotalPages}
          ></Table>
          <P page={page} setPage={setPage} totalPages={totalPages}></P>
          <Toaster />
        </main>
      </div>
    </div>
  );
}
