// "use client";

// import { useRef, useState } from "react";
// import { useHCP, type HCP } from "@/context/hcp-context";
// import { ProfileCard } from "../profile-card";

// interface Connection {
//   source: string;
//   target: string;
//   type: string;
//   strength: number;
// }

// interface NetworkGraphProps {
//   hcps: HCP[];
//   connections: Connection[];
//   showConnections: boolean;
//   centerHCP: string;
// }

// export default function NetworkGraph({
//   hcps,
//   connections,
//   showConnections,
//   centerHCP,
// }: NetworkGraphProps) {
//   const svgRef = useRef<SVGSVGElement>(null);
//   const [hoveredNode, setHoveredNode] = useState<string | null>(null);
//   const [hoveredConnection, setHoveredConnection] = useState<Connection | null>(
//     null
//   );
//   const { selectedHCP, setSelectedHCP } = useHCP();

//   const centerX = 400;
//   const centerY = 300;

//   const handleNodeClick = (hcp: HCP) => {
//     setSelectedHCP(hcp);
//   };

//   const handleNodeHover = (hcp: HCP | null) => {
//     setHoveredNode(hcp?.id || null);
//   };

//   const getNodeSize = (hcp: HCP) => {
//     // Prioritize selectedHCP for size to ensure visual consistency
//     if (selectedHCP?.id === hcp.id || hcp.id === centerHCP || hcp.isCenter)
//       return 40;
//     if (hoveredNode === hcp.id) return 35;
//     return 30;
//   };

//   const getConnectionOpacity = (connection: Connection) => {
//     if (!showConnections) return 0;
//     if (hoveredConnection === connection) return 1;
//     if (
//       hoveredNode &&
//       (hoveredNode === connection.source || hoveredNode === connection.target)
//     )
//       return 0.8;
//     return 0.3;
//   };

//   // Find the center HCP to adjust node positioning
//   const centerHCPData = hcps.find((hcp) => hcp.id === centerHCP);
//   const offsetX = centerHCPData ? -centerHCPData.x : 0;
//   const offsetY = centerHCPData ? -centerHCPData.y : 0;

//   return (
//     <div className="">
     
//       <svg
//         ref={svgRef}
//         width="100%"
//         height="100%"
//         viewBox="0 0 800 600"
//         className="bg-gradient-to-br flex justify-center   from-blue-50 to-purple-50"
//       >
//         {/* Connections */}
//         {connections.map((connection, index) => {
//           const sourceHCP = hcps.find((h) => h.id === connection.source);
//           const targetHCP = hcps.find((h) => h.id === connection.target);

//           if (!sourceHCP || !targetHCP) return null;

//           const sourceX = centerX + sourceHCP.x + offsetX;
//           const sourceY = centerY + sourceHCP.y + offsetY;
//           const targetX = centerX + targetHCP.x + offsetX;
//           const targetY = centerY + targetHCP.y + offsetY;

//           return (
//             <line
//               key={index}
//               x1={sourceX}
//               y1={sourceY}
//               x2={targetX}
//               y2={targetY}
//               stroke="#6366f1"
//               strokeWidth={connection.strength}
//               opacity={getConnectionOpacity(connection)}
//               className="cursor-pointer transition-opacity duration-200"
//               onMouseEnter={() => setHoveredConnection(connection)}
//               onMouseLeave={() => setHoveredConnection(null)}
//             />
//           );
//         })}

//         {/* Nodes */}
//         {hcps.map((hcp) => {
//           const nodeX = centerX + hcp.x + offsetX;
//           const nodeY = centerY + hcp.y + offsetY;
//           const nodeSize = getNodeSize(hcp);

//           return (
//             <g key={hcp.id}>
//               {/* Node background circle */}
//               <circle
//                 cx={nodeX}
//                 cy={nodeY}
//                 r={nodeSize}
//                 fill="white"
//                 stroke={
//                   selectedHCP?.id === hcp.id ||
//                   hcp.id === centerHCP ||
//                   hcp.isCenter
//                     ? "#3b82f6"
//                     : "#e5e7eb"
//                 }
//                 strokeWidth={
//                   selectedHCP?.id === hcp.id ||
//                   hcp.id === centerHCP ||
//                   hcp.isCenter
//                     ? 3
//                     : 2
//                 }
//                 className="cursor-pointer border border-green-500 transition-all duration-200"
//                 onMouseEnter={() => handleNodeHover(hcp)}
//                 onMouseLeave={() => handleNodeHover(null)}
//                 onClick={() => handleNodeClick(hcp)}
//               />

//               {/* Profile image */}
//               <image
//                 x={nodeX - nodeSize + 5}
//                 y={nodeY - nodeSize + 5}
//                 width={(nodeSize - 5) * 2}
//                 height={(nodeSize - 5) * 2}
//                 href={hcp.image}
//                 clipPath={`circle(${nodeSize - 5}px at ${nodeSize - 5}px ${
//                   nodeSize - 5
//                 }px)`}
//                 className="cursor-pointer"
//                 onError={(e) =>
//                   (e.currentTarget.href.baseVal = hcp.fallbackImage)
//                 }
//                 onMouseEnter={() => handleNodeHover(hcp)}
//                 onMouseLeave={() => handleNodeHover(null)}
//                 onClick={() => handleNodeClick(hcp)}
//               />

//               {/* Hover tooltip */}
//               {hoveredNode === hcp.id && (
//                 <g>
//                   <rect
//                     x={nodeX + 50}
//                     y={nodeY - 30}
//                     width="200"
//                     height="60"
//                     fill="white"
//                     stroke="#e5e7eb"
//                     strokeWidth="1"
//                     rx="8"
//                     className="drop-shadow-lg"
//                   />
//                   <text
//                     x={nodeX + 60}
//                     y={nodeY - 10}
//                     fontSize="14"
//                     fontWeight="600"
//                     fill="#1f2937"
//                   >
//                     {hcp.name}
//                   </text>
//                   <text
//                     x={nodeX + 60}
//                     y={nodeY + 5}
//                     fontSize="12"
//                     fill="#6b7280"
//                   >
//                     {hcp.title}
//                   </text>
//                   <text
//                     x={nodeX + 60}
//                     y={nodeY + 20}
//                     fontSize="11"
//                     fill="#9ca3af"
//                   >
//                     {hcp.peers} peers • {hcp.connectionRate}% connected
//                   </text>
//                 </g>
//               )}
//             </g>
//           );
//         })}

//         {/* Connection tooltip */}
//         {hoveredConnection && (
//           <g>
//             <rect
//               x="350"
//               y="50"
//               width="200"
//               height="40"
//               fill="white"
//               stroke="#e5e7eb"
//               strokeWidth="1"
//               rx="8"
//               className="drop-shadow-lg"
//             />
//             <text x="360" y="70" fontSize="12" fontWeight="600" fill="#1f2937">
//               {hoveredConnection.type}
//             </text>
//             <text x="360" y="85" fontSize="11" fill="#6b7280">
//               Strength: {hoveredConnection.strength}
//             </text>
//           </g>
//         )}
//       </svg>

//     </div>
//   );
// }

"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useHCP, type HCP } from "@/context/hcp-context";

interface Connection {
  source: string;
  target: string;
  type: string;
  strength: number;
  details?: string;
}

interface NetworkGraphProps {
  hcps: HCP[]; // All available HCPs
  connections: Connection[]; // All available connections
  showConnections: boolean;
}

export default function NetworkGraph({
  hcps,
  connections,
  showConnections,
}: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<Connection | null>(null);
  const [clickedConnection, setClickedConnection] = useState<Connection | null>(null);
  const { selectedHCP, setSelectedHCP } = useHCP();

  const viewBoxWidth = 1000;
  const viewBoxHeight = 750;

  const graphCenterX = viewBoxWidth / 2;
  const graphCenterY = viewBoxHeight / 2;

  const handleNodeClick = (hcp: HCP) => {
    setSelectedHCP(hcp); // Set this HCP as the actively selected one in context
    setClickedConnection(null); // Clear connection details when a node is clicked
  };

  const handleNodeHover = (hcp: HCP | null) => {
    setHoveredNode(hcp?.id || null);
  };

  const handleConnectionClick = (connection: Connection) => {
    setClickedConnection((prev) => (prev?.source === connection.source && prev?.target === connection.target ? null : connection));
    setSelectedHCP(null); // Clear selected HCP context if a connection is clicked
  };

  const getNodeSize = (hcp: HCP) => {
    if (selectedHCP?.id === hcp.id)
      return 50; // Largest for the active selected HCP
    if (hoveredNode === hcp.id)
      return 40; // Slightly larger on hover
    return 35; // Default size
  };

  const getConnectionOpacity = (connection: Connection) => {
    if (!showConnections) return 0;
    if (clickedConnection === connection) return 1;
    if (hoveredConnection === connection) return 1;
    if (
      selectedHCP &&
      (selectedHCP.id === connection.source || selectedHCP.id === connection.target)
    )
      return 0.7; // Slightly more opaque for connections to selected HCP
    if (
      hoveredNode &&
      (hoveredNode === connection.source || hoveredNode === connection.target)
    )
      return 0.8;
    return 0.3;
  };

  const getConnectionStrokeWidth = (connection: Connection) => {
    if (clickedConnection === connection) return connection.strength * 1.5;
    if (hoveredConnection === connection) return connection.strength + 0.5;
    if (selectedHCP && (selectedHCP.id === connection.source || selectedHCP.id === connection.target))
      return connection.strength + 1;
    return connection.strength;
  };

  // Determine the HCP to center the graph around
  const hcpToCenter = useMemo(() => {
    return selectedHCP || hcps.find(h => h.id === "emily-carter") || hcps[0];
  }, [selectedHCP, hcps]);

  // Calculate global offsets based on the hcpToCenter
  const offsetX = hcpToCenter ? (graphCenterX - hcpToCenter.x) : 0;
  const offsetY = hcpToCenter ? (graphCenterY - hcpToCenter.y) : 0;


  // Filter nodes and connections to show only those directly related to the selected HCP
  const { filteredHCPs, filteredConnections } = useMemo(() => {
    if (!hcpToCenter) {
      return { filteredHCPs: [], filteredConnections: [] };
    }

    const connectedNodeIds = new Set<string>();
    connectedNodeIds.add(hcpToCenter.id); // Always include the center HCP

    // Find all directly connected nodes
    connections.forEach(conn => {
      if (conn.source === hcpToCenter.id) {
        connectedNodeIds.add(conn.target);
      } else if (conn.target === hcpToCenter.id) {
        connectedNodeIds.add(conn.source);
      }
    });

    const currentFilteredHCPs = hcps.filter(hcp => connectedNodeIds.has(hcp.id));

    const currentFilteredConnections = connections.filter(conn =>
      connectedNodeIds.has(conn.source) && connectedNodeIds.has(conn.target)
    );

    return { filteredHCPs: currentFilteredHCPs, filteredConnections: currentFilteredConnections };
  }, [hcpToCenter, hcps, connections]);


  return (
    <div className="w-full h-full md:min-h-[600px] flex md:items-center md:justify-center relative overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-inner"
      >
        {/* Connections (now using filteredConnections) */}
        {filteredConnections.map((connection, index) => {
          const sourceHCP = hcps.find((h) => h.id === connection.source);
          const targetHCP = hcps.find((h) => h.id === connection.target);

          if (!sourceHCP || !targetHCP) return null;

          // Apply global offsets to actual positions
          const sourceX = sourceHCP.x + offsetX;
          const sourceY = sourceHCP.y + offsetY;
          const targetX = targetHCP.x + offsetX;
          const targetY = targetHCP.y + offsetY;

          // Calculate midpoint for connection label
          const midX = (sourceX + targetX) / 2;
          const midY = (sourceY + targetY) / 2;

          // Calculate angle for text rotation
          const angleRad = Math.atan2(targetY - sourceY, targetX - sourceX);
          const angleDeg = angleRad * (180 / Math.PI);

          return (
            <g key={index}>
              <line
                x1={sourceX}
                y1={sourceY}
                x2={targetX}
                y2={targetY}
                stroke="#6366f1"
                strokeWidth={getConnectionStrokeWidth(connection)}
                opacity={getConnectionOpacity(connection)}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredConnection(connection)}
                onMouseLeave={() => setHoveredConnection(null)}
                onClick={() => handleConnectionClick(connection)}
              />
              {/* Connection Label */}
              {showConnections && (
                <text
                  x={midX}
                  y={midY}
                  fontSize="10"
                  fill="#4f46e5"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(${angleDeg}, ${midX}, ${midY})`}
                  className={`pointer-events-none transition-opacity duration-200 ${
                    getConnectionOpacity(connection) > 0.3 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {connection.type}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes (now using filteredHCPs) */}
        {filteredHCPs.map((hcp) => {
          // Apply global offsets
          const nodeX = hcp.x + offsetX;
          const nodeY = hcp.y + offsetY;
          const nodeSize = getNodeSize(hcp);

          // Determine stroke color based on design requirements (matches screenshot colors)
          let nodeStrokeColor = "#e5e7eb"; // Default light gray
          if (selectedHCP?.id === hcp.id) {
            nodeStrokeColor = "#3b82f6"; // Blue for the actively selected HCP
          } else {
            const colors = ['#f97316', '#a855f7', '#22c55e', '#ef4444', '#0ea5e9'];
            const colorIndex = hcp.id.charCodeAt(0) % colors.length;
            nodeStrokeColor = colors[colorIndex];
          }

          return (
            <g key={hcp.id}>
              {/* Node background circle */}
              <circle
                cx={nodeX}
                cy={nodeY}
                r={nodeSize}
                fill="white"
                stroke={nodeStrokeColor}
                strokeWidth={
                  selectedHCP?.id === hcp.id
                    ? 4
                    : 2.5
                }
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => handleNodeHover(hcp)}
                onMouseLeave={() => handleNodeHover(null)}
                onClick={() => handleNodeClick(hcp)}
              />

              {/* Profile image */}
              <image
                x={nodeX - nodeSize + (nodeSize * 0.1)}
                y={nodeY - nodeSize + (nodeSize * 0.1)}
                width={(nodeSize - (nodeSize * 0.1)) * 2}
                height={(nodeSize - (nodeSize * 0.1)) * 2}
                href={hcp.image}
                clipPath={`circle(${nodeSize - (nodeSize * 0.1)}px at ${nodeSize - (nodeSize * 0.1)}px ${
                    nodeSize - (nodeSize * 0.1)
                }px)`}
                className="cursor-pointer"
                onError={(e) =>
                  (e.currentTarget.href.baseVal = hcp.fallbackImage || "/fallback-hcp.png")
                }
                onMouseEnter={() => handleNodeHover(hcp)}
                onMouseLeave={() => handleNodeHover(null)}
                onClick={() => handleNodeClick(hcp)}
              />

              {/* Hover tooltip */}
              {hoveredNode === hcp.id && (
                <g>
                  <rect
                    x={nodeX + nodeSize + 10}
                    y={nodeY - nodeSize / 2}
                    width="200"
                    height="60"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    rx="8"
                    className="drop-shadow-lg"
                  />
                  <text
                    x={nodeX + nodeSize + 20}
                    y={nodeY - nodeSize / 2 + 20}
                    fontSize="14"
                    fontWeight="600"
                    fill="#1f2937"
                  >
                    {hcp.name}
                  </text>
                  <text
                    x={nodeX + nodeSize + 20}
                    y={nodeY - nodeSize / 2 + 35}
                    fontSize="12"
                    fill="#6b7280"
                  >
                    {hcp.title}
                  </text>
                  <text
                    x={nodeX + nodeSize + 20}
                    y={nodeY - nodeSize / 2 + 50}
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

        {/* Connection hover tooltip */}
        {hoveredConnection && (
            <g>
                <rect
                    x={graphCenterX + 150}
                    y={graphCenterY - viewBoxHeight / 2 + 50}
                    width="250"
                    height="50"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    rx="8"
                    className="drop-shadow-lg"
                />
                <text x={graphCenterX + 160} y={graphCenterY - viewBoxHeight / 2 + 70} fontSize="14" fontWeight="600" fill="#1f2937">
                    {hoveredConnection.type}
                </text>
                <text x={graphCenterX + 160} y={graphCenterY - viewBoxHeight / 2 + 85} fontSize="12" fill="#6b7280">
                    Strength: {hoveredConnection.strength}
                </text>
            </g>
        )}

        {/* Clicked Connection detailed tooltip */}
        {clickedConnection && (
            <g>
                <rect
                    x={graphCenterX - 125}
                    y={graphCenterY - viewBoxHeight / 2 + 50}
                    width="250"
                    height="80"
                    fill="white"
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    rx="8"
                    className="drop-shadow-lg"
                />
                <text x={graphCenterX - 115} y={graphCenterY - viewBoxHeight / 2 + 70} fontSize="14" fontWeight="bold" fill="#1f2937">
                    Connection Details
                </text>
                <text x={graphCenterX - 115} y={graphCenterY - viewBoxHeight / 2 + 88} fontSize="12" fill="#374151">
                    Type: {clickedConnection.type}
                </text>
                <text x={graphCenterX - 115} y={graphCenterY - viewBoxHeight / 2 + 103} fontSize="11" fill="#6b7280">
                    Strength: {clickedConnection.strength}
                </text>
                {clickedConnection.details && (
                    <text x={graphCenterX - 115} y={graphCenterY - viewBoxHeight / 2 + 118} fontSize="10" fill="#9ca3af">
                        {clickedConnection.details}
                    </text>
                )}
                {/* Corrected X button positioning */}
                <circle
                    cx={graphCenterX + 115}
                    cy={graphCenterY - viewBoxHeight / 2 + 60}
                    r="10"
                    fill="#ef4444"
                    className="cursor-pointer"
                    onClick={() => setClickedConnection(null)}
                />
                <text
                    x={graphCenterX + 115}
                    y={graphCenterY - viewBoxHeight / 2 + 64}
                    fontSize="10"
                    fill="white"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="cursor-pointer"
                    onClick={() => setClickedConnection(null)}
                >
                    X
                </text>
            </g>
        )}
      </svg>
    </div>
  );
}