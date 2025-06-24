"use client"

import {
  Home,
  Search,
  Users,
  Activity,
  Settings,
  User,
  BarChart3,
  Globe,
  MessageSquare,
  Calendar,
  FileText,
  HelpCircle,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigationItems = [
  { icon: Home, label: "Home", active: false },
  { icon: Search, label: "Search", active: false },
  { icon: Users, label: "Network", active: true },
  { icon: Activity, label: "Activity", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Globe, label: "Global", active: false },
  { icon: MessageSquare, label: "Messages", active: false },
  { icon: Calendar, label: "Calendar", active: false },
  { icon: FileText, label: "Documents", active: false },
  { icon: Settings, label: "Settings", active: false },
  { icon: HelpCircle, label: "Help", active: false },
]

interface SidebarProps {
  onClose?: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="w-16 lg:w-16 h-screen  bg-white border-r border-gray-200 flex flex-col">
      {/* Mobile Header */}
      {onClose && (
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="font-semibold text-gray-900">Menu</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Desktop Logo */}
      <div className="hidden lg:flex items-center justify-center py-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col lg:items-center lg:space-y-2 p-4 lg:p-0">
        {navigationItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={index}
              onClick={onClose}
              className={`w-full lg:w-10 h-12 lg:h-10 rounded-lg flex items-center lg:justify-center gap-3 lg:gap-0 px-3 lg:px-0 transition-colors ${
                item.active ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="lg:hidden text-sm font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 lg:p-0 lg:pb-4 lg:flex lg:justify-center">
        <button
          onClick={onClose}
          className="w-full lg:w-10 h-12 lg:h-10 rounded-lg bg-gray-100 flex items-center lg:justify-center gap-3 lg:gap-0 px-3 lg:px-0"
        >
          <User className="w-5 h-5 text-gray-600 flex-shrink-0" />
          <span className="lg:hidden text-sm font-medium text-gray-600">Profile</span>
        </button>
      </div>
    </div>
  )
}
