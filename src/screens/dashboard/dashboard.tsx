"use client";

import { useState, useEffect } from "react";
import NetworkGraph from "@/components/common/graph/network-graph";
import Layout from "@/components/layout/layout";
import { useHCP, type HCP } from "@/context/hcp-context";
import { mockConnections, mockHCPs } from "./data";
import { HCPSearch } from "@/components/common/hcp-search/hcp-search";

export default function HealthcareNetworkApp() {
  const [showConnections, setShowConnections] = useState(true);
  const { selectedHCP } = useHCP();
  const [centerHCP, setCenterHCP] = useState(selectedHCP?.id || "emily-carter");

  // Log selectedHCP to verify context updates
  console.log("Current selectedHCP:", selectedHCP);

  // Sync centerHCP with selectedHCP
  useEffect(() => {
    setCenterHCP(selectedHCP?.id || "emily-carter");
  }, [selectedHCP]);

  const updatedHCPs = mockHCPs.map((hcp) => ({
    ...hcp,
    isCenter: selectedHCP ? hcp.id === selectedHCP.id : hcp.id === "emily-carter",
  }));

  const handleSelectHCP = (hcp: HCP | null) => {
    console.log("HCP selected in parent:", hcp);
    setCenterHCP(hcp?.id || "emily-carter");
  };

  return (
    <Layout>
      <div className="flex-1 overflow-y-auto h-full">
        <div className="mb-6">
          <div className="flex p-4 rounded-lg bg-white w-full items-center justify-start mb-4">
            <HCPSearch hcps={mockHCPs} onSelectHCP={handleSelectHCP} />
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