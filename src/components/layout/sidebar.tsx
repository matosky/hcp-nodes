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
} from "lucide-react"

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

export default function Sidebar() {
  return (
    <div className="w-16 rounded-lg bg-white border-r border-gray-200 flex flex-col items-center py-4">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">G</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-2">
        {navigationItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={index}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                item.active ? "bg-blue-50 text-blue-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </button>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="mt-auto">
        <button className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          <User className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
