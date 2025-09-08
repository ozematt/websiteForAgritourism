import { create } from "zustand";
import { createSelectors } from "./create-selectors";

export interface FileT {
  name: string;
  size: number;
  type: string;
}

interface FileDataState {
  files: FileT[];
  selected: boolean;
  addFilesData: (filesData: FileT[]) => void;
  removeFilesData: () => void;
}

const useFileStoreBase = create<FileDataState>()((set) => ({
  files: [],
  selected: false,
  addFilesData: (filesData: FileT[]) =>
    set((state) => ({
      files: (state.files = filesData),
      selected: filesData.length > 0,
    })),
  removeFilesData: () =>
    set({
      files: [],
      selected: false,
    }),
}));

export const useFileStore = createSelectors(useFileStoreBase);
