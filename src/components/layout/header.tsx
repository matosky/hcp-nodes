"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useHCP } from "@/context/hcp-context"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export const Header = () => {
  const [showConnections, setShowConnections] = useState(true)
  const [showMyConnections, setShowMyConnections] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { selectedHCP, setSelectedHCP } = useHCP()

  return (
    <header className="flex flex-col lg:flex-row lg:h-[150px] rounded-lg gap-5 w-full">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-white rounded-lg px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <img
              src={selectedHCP?.image || "/placeholder.svg"}
              alt={selectedHCP?.name}
              width={40}
              height={40}
              className="rounded-full object-cover border border-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">{selectedHCP?.name}</h2>
            <p className="text-xs text-gray-400 leading-tight">{selectedHCP?.specialization}</p>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white rounded-lg px-4 py-4 space-y-4">
          {/* Stats */}
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{selectedHCP?.peers}</div>
              <div className="text-xs text-gray-400">My Peers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">{selectedHCP?.connectionRate}</div>
              <div className="text-xs text-gray-400">Following</div>
            </div>
          </div>

          {/* Create web button */}
          <div className="flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium text-sm shadow-sm">
              Create web
            </Button>
          </div>

          {/* Toggle switches */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Show connections</span>
              <Switch
                checked={showConnections}
                onCheckedChange={setShowConnections}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Show my connections on map</span>
              <Switch
                checked={showMyConnections}
                onCheckedChange={setShowMyConnections}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden lg:flex flex-1 h-full items-center rounded-lg justify-between bg-white px-5 py-2">
        {/* Left section - Profile info */}
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14">
            <img
              src={selectedHCP?.image || "/placeholder.svg"}
              alt={selectedHCP?.name}
              width={56}
              height={56}
              className="rounded-full object-cover border border-gray-200"
            />
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
