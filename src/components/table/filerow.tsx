import { TableRow, TableCell } from "@/components/ui/table";
import { FileIcon } from "lucide-react";
import Size from "./size";
import Dropdown from "./dropdown";
export default function FileRow({ name, size, deleteAction }) {
  return (
    <TableRow>
      <TableCell>
        <FileIcon className="h-5 w-5" />
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>
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
