import {
  Table as T,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import Row from "./row";
import useSWR from "swr";
import FileRow from "./filerow";
import { useState } from "react";
import { CircleArrowLeft, Wand } from "lucide-react";
import { Confirm } from "./confirm";

const defaultDir = "/api/dir";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Table() {
  const [dir, setDir] = useState(defaultDir);
  const { data, mutate } = useSWR(dir, fetcher);
  return (
    <div className="border shadow-sm rounded-lg">
      <T>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <CircleArrowLeft
                className="h-5 w-5 hover:cursor-pointer"
                onClick={() =>
                  setDir((e) => {
                    // 查找最后一个斜杠的位置
                    if (e === defaultDir) return e;
                    const lastSlashIndex = e.lastIndexOf("/");

                    // 提取最后一个斜杠之前的部分
                    return e.slice(0, lastSlashIndex);
                  })
                }
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
                  magicHandler(dir, mutate);
                }}
              >
                <Wand className="h-5 w-5 hover:cursor-pointer hover:scale-110 transition-all hover:text-yellow-400/80"></Wand>
              </Confirm>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((e, i) => {
              return e.is_dir ? (
                <Row
                  key={i}
                  name={e.name}
                  setDir={setDir}
                  size={e.size}
                  deleteAction={() => {
                    deleteAction(dir, e.name, mutate);
                  }}
                ></Row>
              ) : (
                <FileRow
                  key={i}
                  name={e.name}
                  size={e.size}
                  deleteAction={() => {
                    deleteAction(dir, e.name, mutate);
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
  if (resp.ok) mutate();
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
