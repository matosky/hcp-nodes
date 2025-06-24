"use client";

import { useState, useEffect } from "react";
import NetworkGraph from "@/components/common/graph/network-graph";
import Layout from "@/components/layout/layout";
import { useHCP, type HCP } from "@/context/hcp-context";
import { mockConnections, mockHCPs } from "./data";
import { HCPSearch } from "@/components/common/hcp-search/hcp-search";
import { ProfileCard } from "@/components/common/profile-card";

interface Connection {
  source: string;
  target: string;
  type: string;
  strength: number;
  details?: string;
}

export default function HealthcareNetworkApp() {
  const [showConnections, setShowConnections] = useState(true);
  const { selectedHCP, setSelectedHCP } = useHCP();

  // When an HCP is selected via search, update the global context.
  const handleSelectHCP = (hcp: HCP | null) => {
    setSelectedHCP(hcp);
  };

  const updatedHCPs = mockHCPs;


  return (
    <Layout>
      <div className="flex-1 rounded-lg pb-10 overflow-y-auto h-full">
        <div className="mb-6">
          <div className="flex p-4 rounded-lg bg-white w-full items-center justify-start mb-4">
            <HCPSearch hcps={mockHCPs} onSelectHCP={handleSelectHCP} />
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-2xl font-bold text-gray-900">PeerSpace</h1>
        </div>

        <div className="relative gap-5 h-fit flex flex-col-reverse md:flex-row w-full">
          {/* Profile Card should ALWAYS be mounted to receive context updates */}
          <div className="bg-white rounded-lg p-2">
            <ProfileCard />
          </div>
          <div className="bg-white flex-1 rounded-lg p-2">
            <NetworkGraph
              hcps={updatedHCPs}
              connections={mockConnections as Connection[]}
              showConnections={showConnections}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}