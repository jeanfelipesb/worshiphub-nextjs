"use client";

import { useSidebarStore } from '@/store/useSidebarStore';
import { LogOut, Menu, X } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Tooltip from '@mui/material/Tooltip';

export default function Header() {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleSidebar}
            className="text-purple-950 focus:outline-none focus:text-purple-950"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-semibold text-zinc-700"></h1>
          <Tooltip title="Sair">
            <button
              className="p-2 rounded-full bg-gradient-to-r from-orange-400 to-purple-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              onClick={() => {

                signOut({ redirect: true, callbackUrl: '/' });

              }}
            >
              <LogOut size={20} />
            </button>
          </Tooltip>
        </div>
      </header>
    </>
  );
}