import { create } from 'zustand';

type PaginationState = {
  currentPage: number;
  setCurrentPage: (newCurrentPage: number) => void;
};

export const usePaginationStore = create<PaginationState>(set => ({
  currentPage: 1,
  setCurrentPage: (newCurrentPage) => set({ currentPage: newCurrentPage }),
}));
