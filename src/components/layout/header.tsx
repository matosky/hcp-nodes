"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useHCP } from "@/context/hcp-context"
import { useState } from "react"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

export const Header = ({ onMenuClick, sidebarOpen }: HeaderProps) => {
  const [showConnections, setShowConnections] = useState(true)
  const [showMyConnections, setShowMyConnections] = useState(false)
  const { selectedHCP, setSelectedHCP } = useHCP()

  return (
    <header className="flex flex-col lg:flex-row h-[80px] rounded-lg gap-5 w-full">
      {/* Mobile Header */}
      <div className="lg:hidden  flex items-center justify-between bg-white rounded-lg px-4 py-3">
        {/* Hamburger Menu Button */}
        <Button variant="ghost" size="sm" onClick={onMenuClick} className="p-2">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <div className="flex items-center gap-3">
          <div className="relative w-6 h-6">
          {(selectedHCP && selectedHCP?.image !== null) ? 
            <img
              src={selectedHCP?.image}
              alt={selectedHCP?.name}
              width={20}
              height={20}
              className="rounded-full object-cover border border-gray-200"
            />: 
            <div
              className="rounded-full w-[20px] bg-orange-400 h-[20px] border border-gray-200"
            />
            }
          </div>
          <div className="flex flex-col">
            <h2 className="md:text-lg text-xs font-semibold text-gray-900 leading-tight">{selectedHCP?.name}</h2>
            <p className="text-xs text-gray-400 max-w-sm text-ellipsis leading-tight">{selectedHCP?.specialization}</p>
          </div>
        </div>

        {/* Mobile Stats & Controls */}
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-400 text-right">
            <div>{selectedHCP?.peers} peers</div>
            <div>{selectedHCP?.connectionRate} following</div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex flex-1 h-full items-center rounded-lg justify-between bg-white px-5">
        {/* Left section - Profile info */}
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14">
            {(selectedHCP && selectedHCP?.image !== null) ? 
            <img
              src={selectedHCP?.image}
              alt={selectedHCP?.name}
              width={56}
              height={56}
              className="rounded-full object-cover border border-gray-200"
            />: 
            <div
              className="rounded-full w-[56px] bg-orange-400 h-[56px] border border-gray-200"
            />
            }
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xl font-semibold text-gray-900 leading-tight">{selectedHCP?.name}</h2>
            <p className="text-sm text-gray-400 leading-tight">{selectedHCP?.specialization}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col flex-nowrap items-center gap-2">
          <div className="flex gap-4 items-center">
            <div className="text-sm text-gray-400">
              My Peers <span className="font-medium text-gray-600">{selectedHCP?.peers}</span>
            </div>
            <div className="text-sm text-gray-400">
              Following <span className="font-medium text-gray-600">{selectedHCP?.connectionRate}</span>
            </div>
          </div>
          {/* Create web button */}
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm shadow-sm">
            Create web
          </Button>
        </div>
      </div>

      {/* Right section - Desktop toggles */}
      <div className="hidden lg:flex h-full bg-white rounded-lg items-center px-5 gap-8">
        {/* Toggle switches - stacked vertically */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Switch
              checked={showConnections}
              onCheckedChange={setShowConnections}
              className="data-[state=checked]:bg-blue-600 scale-90"
            />
            <span className="text-sm text-gray-400 whitespace-nowrap">Show connections</span>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={showMyConnections}
              onCheckedChange={setShowMyConnections}
              className="data-[state=checked]:bg-blue-600 scale-90"
            />
            <span className="text-sm text-gray-400 whitespace-nowrap">Show my connections on map</span>
          </div>
        </div>
      </div>
    </header>
  )
}
