"use client"

import type React from "react"
import { useState } from "react"
import { HCPProvider } from "@/context/hcp-context"
import Sidebar from "./sidebar"
import { Header } from "./header"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <HCPProvider>
      <div className="flex gap-5 md:pr-5 pr-auto p-2 pt-5 w-screen h-screen overflow-hidden bg-gray-200">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar Drawer */}
        <div
          className={`lg:hidden fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out w-64 bg-white ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        <main className="flex-1 bg gap-5 flex flex-col">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
          {children}
        </main>
      </div>
    </HCPProvider>
  )
}

export default Layout