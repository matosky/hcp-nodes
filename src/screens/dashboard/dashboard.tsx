"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import NetworkGraph from "@/components/common/graph/network-graph";
import Layout from "@/components/layout/layout";
import { useHCP, type HCP } from "@/context/hcp-context";
import { mockConnections, mockHCPs } from "./data";



export default function HealthcareNetworkApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showConnections, setShowConnections] = useState(true);
  const [showMyConnections, setShowMyConnections] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof mockHCPs>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false); // Added missing state
  const { selectedHCP, setSelectedHCP } = useHCP();

  // Initialize centerHCP based on selectedHCP or default to "emily-carter"
  const [centerHCP, setCenterHCP] = useState(selectedHCP?.id || "emily-carter");

  // Derive hcps with updated isCenter based on selectedHCP
  const updatedHCPs = mockHCPs.map((hcp) => ({
    ...hcp,
    isCenter: selectedHCP
      ? hcp.id === selectedHCP.id
      : hcp.id === "emily-carter",
  }));

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSelectedHCP(null);
      setSearchResults([]);
      setCenterHCP("emily-carter");
      setShowSearchDropdown(false); // Hide dropdown on empty query
      return;
    }

    const matches = mockHCPs.filter(
      (hcp) =>
        hcp.name.toLowerCase().includes(query.toLowerCase()) ||
        hcp.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(matches);
    setShowSearchDropdown(true); // Show dropdown when search results exist

    if (matches.length > 0) {
      setSelectedHCP(matches[0]);
      setCenterHCP(matches[0].id);
    } else {
      setSelectedHCP(null);
      setCenterHCP("emily-carter");
    }
  };

  return (
    <Layout>
      <div className="flex-1">
        <div className="mb-6">
          <div className="flex p-4 rounded-lg  bg-white  w-full items-center justify-between mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search healthcare professionals..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() =>
                  setTimeout(() => setShowSearchDropdown(false), 200)
                }
                className="pl-10"
              />

              {showSearchDropdown && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="px-3 py-2 text-xs text-gray-500 border-b">
                        {searchResults.length} result
                        {searchResults.length !== 1 ? "s" : ""} found
                      </div>
                      {searchResults.map((hcp) => (
                        <button
                          key={hcp.id}
                          onClick={() => {
                            setSelectedHCP(hcp);
                            setCenterHCP(hcp.id);
                            setSearchQuery(hcp.name);
                            setShowSearchDropdown(false);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                        >
                          <img
                            src={hcp.image}
                            alt={hcp.name}
                            className="w-8 h-8 rounded-full"
                            onError={(e) =>
                              (e.currentTarget.src = hcp.fallbackImage)
                            }
                          />
                          <div>
                            <p className="font-medium text-sm">{hcp.name}</p>
                            <p className="text-xs text-gray-500">{hcp.title}</p>
                          </div>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="px-3 py-4 text-sm text-gray-500 text-center">
                      No healthcare professionals found
                    </div>
                  )}
                </div>
              )}

              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedHCP(null);
                    setSearchResults([]);
                    setCenterHCP("emily-carter");
                    setShowSearchDropdown(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Filter</span>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-2xl font-bold text-gray-900">PeerSpace</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px]">
          <NetworkGraph
            hcps={updatedHCPs}
            connections={mockConnections}
            centerHCP={centerHCP}
            showConnections={showConnections}
          />
        </div>
      </div>
    </Layout>
  );
}
