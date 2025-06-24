// import { useMemo } from 'react';
// import { Hcp, Connection, GraphData } from '../types';
// import { buildGraph } from '../utils/graphUtils';

// export const useGraphData = (
//   hcps: Hcp[],
//   connections: Connection[],
//   centralHcpId: string | null
// ): GraphData => {
//   return useMemo(() => {
//     if (!centralHcpId) return { nodes: [], edges: [] };
//     return buildGraph(hcps, connections, centralHcpId);
//   }, [hcps, connections, centralHcpId]);
// };