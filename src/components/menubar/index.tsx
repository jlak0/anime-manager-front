import useSWR from "swr";
import Size from "../table/size";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MenuBar() {
  const { data } = useSWR("/api/freespace", fetcher);
  return (
    <div className="flex items-center">
      <h1 className="font-semibold text-lg md:text-2xl">Documents</h1>
      <div className="ml-auto flex flex-row gap-2 font-bold text-black/80">
        剩余空间:{data && <Size s={data.free_space}></Size>}
      </div>
      {/* <Button className="ml-auto" size="sm">
        New Folder
      </Button> */}
    </div>
  );
}
