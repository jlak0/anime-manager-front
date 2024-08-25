/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const directoryStore = create((set) => ({
  path: "",
  goTo: (name) =>
    set((state) => ({
      path: `${state.path}/${name}`,
    })),
  goBack: () =>
    set((state) => {
      if (state.path === "") {
        // 如果在根目录，不执行任何操作，返回当前状态
        return state;
      } else {
        // 否则，去掉路径中的最后一部分
        const newPath = state.path.substring(0, state.path.lastIndexOf("/"));
        return { path: newPath };
      }
    }),
}));

export const useDirectory = () => {
  const path = directoryStore((state: any) => state.path);
  const goTo = directoryStore((state: any) => state.goTo);
  const goBack = directoryStore((state: any) => state.goBack);

  const { data, mutate } = useSWR("/api/dir" + path, fetcher);
  return { data, mutate, goTo, path, goBack };
};
