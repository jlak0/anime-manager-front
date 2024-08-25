import { TableRow, TableCell } from "@/components/ui/table";
import { FileIcon } from "lucide-react";
import Size from "./size";
import Dropdown from "./dropdown";
import { Input } from "../ui/input";
import { useState, useRef, useEffect } from "react";
import { useDirectory } from "@/store/dirStore";
import { toast } from "sonner";

export default function FileRow({ name, size, deleteAction }) {
  const [value, setValue] = useState("");

  return (
    <TableRow>
      <TableCell>
        <FileIcon className="h-5 w-5" />
      </TableCell>
      <TableCell className="font-medium">
        {value ? (
          <AutoFocusInput value={value} setValue={setValue}></AutoFocusInput>
        ) : (
          <p
            onClick={() => {
              setValue(name);
            }}
          >
            {name}
          </p>
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Size s={size}></Size>
      </TableCell>
      <TableCell>
        <Dropdown action={deleteAction}></Dropdown>
      </TableCell>
      <TableCell>
        {/* <Wand className="h-5 w-5 hover:cursor-pointer"></Wand> */}
      </TableCell>
    </TableRow>
  );
}

const AutoFocusInput = ({ value, setValue }) => {
  const inputRef = useRef(null);
  const oldValueRef = useRef(value);
  const { path, mutate } = useDirectory();

  useEffect(() => {
    // 在组件挂载时让输入框自动获得焦点
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <Input
      ref={inputRef}
      value={value}
      onBlur={() => {
        reNameHandler(path, value, oldValueRef.current, mutate);
        setValue("");
      }}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

async function reNameHandler(url, newPath, oldPath, mutate) {
  // if (newPath === oldPath) return;
  console.log(newPath);
  console.log(oldPath);
  console.log(url);
  const resp = await fetch("/api/rename", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      newPath: url + "/" + newPath,
      oldPath: url + "/" + oldPath,
    }),
  });
  if (resp.status === 200) {
    mutate();
    toast("成功命名");
  }
}
