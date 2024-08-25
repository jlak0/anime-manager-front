import { TableRow, TableCell } from "@/components/ui/table";
import { FolderIcon, Wand } from "lucide-react";
import Dropdown from "./dropdown";
import Size from "./size";
export default function Row({ name, goTo, size, deleteAction }) {
  
  return (
    <TableRow>
      <TableCell>
        <FolderIcon className="h-5 w-5  text-yellow-400/80" />
      </TableCell>
      <TableCell className="font-medium">
        <a href={"#"} onClick={() => goTo(name)} className="hover:text-primary">
          {name}
        </a>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Size s={size}></Size>
      </TableCell>
      <TableCell>
        <Dropdown action={deleteAction}></Dropdown>
      </TableCell>
      <TableCell>
        <Wand className="h-5 w-5 hover:cursor-pointer"></Wand>
      </TableCell>
    </TableRow>
  );
}
