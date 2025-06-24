import React from "react";
import Sidebar from "./sidebar";
import { Header } from "./header";
import { HCPProvider } from "@/context/hcp-context";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <HCPProvider>
      <div className="flex gap-5 pr-5 pt-5 w-screen h-screen overflow-hidden bg-gray-200">
        <Sidebar />
        <main className="flex-1 gap-5 pb-10  flex flex-col">
          <Header />
          {children}
        </main>
      </div>
    </HCPProvider>
  );
};

export default Layout;
