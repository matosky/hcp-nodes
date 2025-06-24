"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useHCP, type HCP } from "@/context/hcp-context";

interface HCPSearchProps {
  hcps: HCP[];
  onSelectHCP: (hcp: HCP | null) => void;
}

export function HCPSearch({ hcps, onSelectHCP }: HCPSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<HCP[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { setSelectedHCP } = useHCP();

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSelectedHCP(null);
      onSelectHCP(null);
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const matches = hcps.filter(
      (hcp) =>
        hcp.name.toLowerCase().includes(query.toLowerCase()) ||
        hcp.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(matches);
    setShowSearchDropdown(true);

    const newSelectedHCP = matches.length > 0 ? matches[0] : null;
    setSelectedHCP(newSelectedHCP);
    onSelectHCP(newSelectedHCP);
  };

  return (
    <div className="relative w-full flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setShowSearchDropdown(true)}
        onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
        className="pl-10 w-full"
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
                    console.log("Selected HCP in HCPSearch:", hcp);
                    setSelectedHCP(hcp);
                    onSelectHCP(hcp);
                    setSearchQuery(hcp.name);
                    setShowSearchDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                >
                  <img
                    src={hcp.image}
                    alt={hcp.name}
                    className="w-8 h-8 rounded-full"
                    onError={(e) => (e.currentTarget.src = hcp.fallbackImage)}
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
            onSelectHCP(null);
            setSearchResults([]);
            setShowSearchDropdown(false);
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      )}
    </div>
  );
}