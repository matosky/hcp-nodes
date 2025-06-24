"use client";

import { useRef, useState } from "react";
import { useHCP, type HCP } from "@/context/hcp-context";
import { ProfileCard } from "../profile-card";

interface Connection {
  source: string;
  target: string;
  type: string;
  strength: number;
}

interface NetworkGraphProps {
  hcps: HCP[];
  connections: Connection[];
  showConnections: boolean;
  centerHCP: string;
}

export default function NetworkGraph({
  hcps,
  connections,
  showConnections,
  centerHCP,
}: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<Connection | null>(
    null
  );
  const { selectedHCP, setSelectedHCP } = useHCP();

  const centerX = 400;
  const centerY = 300;

  const handleNodeClick = (hcp: HCP) => {
    setSelectedHCP(hcp);
  };

  const handleNodeHover = (hcp: HCP | null) => {
    setHoveredNode(hcp?.id || null);
  };

  const getNodeSize = (hcp: HCP) => {
    // Prioritize selectedHCP for size to ensure visual consistency
    if (selectedHCP?.id === hcp.id || hcp.id === centerHCP || hcp.isCenter)
      return 40;
    if (hoveredNode === hcp.id) return 35;
    return 30;
  };

  const getConnectionOpacity = (connection: Connection) => {
    if (!showConnections) return 0;
    if (hoveredConnection === connection) return 1;
    if (
      hoveredNode &&
      (hoveredNode === connection.source || hoveredNode === connection.target)
    )
      return 0.8;
    return 0.3;
  };

  // Find the center HCP to adjust node positioning
  const centerHCPData = hcps.find((hcp) => hcp.id === centerHCP);
  const offsetX = centerHCPData ? -centerHCPData.x : 0;
  const offsetY = centerHCPData ? -centerHCPData.y : 0;

  return (
    <div className="relative p-5 gap-5 bg-white  flex flex-col-reverse md:flex-row   w-full h-full">
      {/* Selected Node Details Panel */}
      {selectedHCP && <ProfileCard />}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        className="bg-gradient-to-br flex justify-center   from-blue-50 to-purple-50"
      >
        {/* Connections */}
        {connections.map((connection, index) => {
          const sourceHCP = hcps.find((h) => h.id === connection.source);
          const targetHCP = hcps.find((h) => h.id === connection.target);

          if (!sourceHCP || !targetHCP) return null;

          const sourceX = centerX + sourceHCP.x + offsetX;
          const sourceY = centerY + sourceHCP.y + offsetY;
          const targetX = centerX + targetHCP.x + offsetX;
          const targetY = centerY + targetHCP.y + offsetY;

          return (
            <line
              key={index}
              x1={sourceX}
              y1={sourceY}
              x2={targetX}
              y2={targetY}
              stroke="#6366f1"
              strokeWidth={connection.strength}
              opacity={getConnectionOpacity(connection)}
              className="cursor-pointer transition-opacity duration-200"
              onMouseEnter={() => setHoveredConnection(connection)}
              onMouseLeave={() => setHoveredConnection(null)}
            />
          );
        })}

        {/* Nodes */}
        {hcps.map((hcp) => {
          const nodeX = centerX + hcp.x + offsetX;
          const nodeY = centerY + hcp.y + offsetY;
          const nodeSize = getNodeSize(hcp);

          return (
            <g key={hcp.id}>
              {/* Node background circle */}
              <circle
                cx={nodeX}
                cy={nodeY}
                r={nodeSize}
                fill="white"
                stroke={
                  selectedHCP?.id === hcp.id ||
                  hcp.id === centerHCP ||
                  hcp.isCenter
                    ? "#3b82f6"
                    : "#e5e7eb"
                }
                strokeWidth={
                  selectedHCP?.id === hcp.id ||
                  hcp.id === centerHCP ||
                  hcp.isCenter
                    ? 3
                    : 2
                }
                className="cursor-pointer border border-green-500 transition-all duration-200"
                onMouseEnter={() => handleNodeHover(hcp)}
                onMouseLeave={() => handleNodeHover(null)}
                onClick={() => handleNodeClick(hcp)}
              />

              {/* Profile image */}
              <image
                x={nodeX - nodeSize + 5}
                y={nodeY - nodeSize + 5}
                width={(nodeSize - 5) * 2}
                height={(nodeSize - 5) * 2}
                href={hcp.image}
                clipPath={`circle(${nodeSize - 5}px at ${nodeSize - 5}px ${
                  nodeSize - 5
                }px)`}
                className="cursor-pointer"
                onError={(e) =>
                  (e.currentTarget.href.baseVal = hcp.fallbackImage)
                }
                onMouseEnter={() => handleNodeHover(hcp)}
                onMouseLeave={() => handleNodeHover(null)}
                onClick={() => handleNodeClick(hcp)}
              />

              {/* Hover tooltip */}
              {hoveredNode === hcp.id && (
                <g>
                  <rect
                    x={nodeX + 50}
                    y={nodeY - 30}
                    width="200"
                    height="60"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    rx="8"
                    className="drop-shadow-lg"
                  />
                  <text
                    x={nodeX + 60}
                    y={nodeY - 10}
                    fontSize="14"
                    fontWeight="600"
                    fill="#1f2937"
                  >
                    {hcp.name}
                  </text>
                  <text
                    x={nodeX + 60}
                    y={nodeY + 5}
                    fontSize="12"
                    fill="#6b7280"
                  >
                    {hcp.title}
                  </text>
                  <text
                    x={nodeX + 60}
                    y={nodeY + 20}
                    fontSize="11"
                    fill="#9ca3af"
                  >
                    {hcp.peers} peers • {hcp.connectionRate}% connected
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Connection tooltip */}
        {hoveredConnection && (
          <g>
            <rect
              x="350"
              y="50"
              width="200"
              height="40"
              fill="white"
              stroke="#e5e7eb"
              strokeWidth="1"
              rx="8"
              className="drop-shadow-lg"
            />
            <text x="360" y="70" fontSize="12" fontWeight="600" fill="#1f2937">
              {hoveredConnection.type}
            </text>
            <text x="360" y="85" fontSize="11" fill="#6b7280">
              Strength: {hoveredConnection.strength}
            </text>
          </g>
        )}
      </svg>

    </div>
  );
}
