import { create } from 'zustand';

type SidebarState = {
  sidebarOpen: boolean;
  loadingPage: boolean;
  activeSubmenu: number | null;
  setSidebarOpen: (isOpen: boolean) => void;
  setLoadingPage: (isLoading: boolean) => void;
  setActiveSubmenu: (submenu: number | null) => void;
};

export const useSidebarStore = create<SidebarState>(set => ({
  sidebarOpen: true,
  activeSubmenu: null,
  loadingPage: false,
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  setLoadingPage: (isLoading) => set({ loadingPage: isLoading }),
  setActiveSubmenu: (submenu) => set({ activeSubmenu: submenu }),
}));
