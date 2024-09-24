'use client';

import { SessionProvider } from 'next-auth/react';
import Header from "@/components/layouts/admin/Header";
import Sidebar from "@/components/layouts/admin/Siderbar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <html>
      <body>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-200 p-6">
              <SessionProvider>
                {children}
              </SessionProvider>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

export default AdminLayout;
