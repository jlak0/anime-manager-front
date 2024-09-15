import {
  Table as T,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { useDirectory } from "@/store/dirStore";
import Row from "./row";
import FileRow from "./filerow";
import { CircleArrowLeft, Wand } from "lucide-react";
import { Confirm } from "./confirm";
import { toast } from "sonner";

export default function Table({
  page,
  setTotalPages,
  setPage,
}: {
  page: number;
  setPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
}) {
  const { data, goTo, path, mutate, goBack } = useDirectory();
  if (!data) return <div>loading...</div>;
  const totalPages = Math.ceil(data.length / 8);
  setTotalPages(totalPages);
  return (
    <div className="border shadow-sm rounded-lg ">
      <T>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <CircleArrowLeft
                className="h-5 w-5 hover:cursor-pointer"
                onClick={goBack}
              ></CircleArrowLeft>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Size</TableHead>

            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
            <TableHead>
              <Confirm
                action={() => {
                  magicHandler("/api/dir" + path, mutate);
                }}
              >
                <Wand className="h-5 w-5 hover:cursor-pointer hover:scale-110 transition-all hover:text-yellow-400/80"></Wand>
              </Confirm>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.slice((page - 1) * 8, page * 8).map((e, i) => {
              return e.is_dir ? (
                <Row
                  setPage={setPage}
                  key={i}
                  name={e.name}
                  goTo={goTo}
                  size={e.size}
                  deleteAction={() => {
                    deleteAction("/api/dir" + path, e.name, mutate);
                  }}
                ></Row>
              ) : (
                <FileRow
                  key={i}
                  name={e.name}
                  size={e.size}
                  deleteAction={() => {
                    deleteAction("/api/dir" + path, e.name, mutate);
                  }}
                ></FileRow>
              );
            })}
        </TableBody>
      </T>
    </div>
  );
}

async function deleteAction(dir, name, mutate) {
  const resp = await fetch(dir, {
    method: "DELETE",
    body: JSON.stringify([
      {
        Name: name,
      },
    ]),
  });
  if (resp.ok) {
    mutate();
    toast.success("成功删除");
  } else {
    toast.warning("出错");
  }
}
async function magicHandler(dir, mutate) {
  const resp = await fetch(dir, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  if (resp.status === 200) {
    mutate();
  } else {
    const j = await resp.json();
    window.alert(j);
  }
}
