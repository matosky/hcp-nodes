// export type Hcp  = {
//     id: string;
//     name: string;
//     education: string[];
//     workExperience: string[];
//     publications: string[];
//   }
  
//   export type Connection  = {
//     id: string;
//     sourceId: string;
//     targetId: string;
//     type: 'co-authorship' | 'shared-workplace';
//     details: string; // e.g., "Co-authored 3 publications"
//   }
  
//   export type GraphData =  {
//     nodes: { id: string; label: string; data: Hcp }[];
//     edges: { id: string; source: string; target: string; label: string; data: Connection }[];
//   }