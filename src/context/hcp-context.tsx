"use client";

import { createContext, useContext, useState } from "react";

export interface HCP {
  id: string;
  name: string;
  title: string;
  image: string;
  fallbackImage: string;
  education: string;
  specialization: string;
  peers: number;
  connectionRate: number;
  isCenter: boolean;
  x: number;
  y: number;
  yearsOfExperience: number;
  headline: string;
  bio: string;
  patientServed: {
    noOfPatients: number;
    addition: number;
  };
  successRate: {
    rate: number;
    addition: number;
  }
}

interface HCPContextType {
  selectedHCP: HCP | null;
  setSelectedHCP: (hcp: HCP | null) => void;
}

const HCPContext = createContext<HCPContextType>({
  selectedHCP: null,
  setSelectedHCP: () => {},
});

export function HCPProvider({ children }: { children: React.ReactNode }) {
  const [selectedHCP, setSelectedHCP] = useState<HCP | null>(null);

  return (
    <HCPContext.Provider value={{ selectedHCP, setSelectedHCP }}>
      {children}
    </HCPContext.Provider>
  );
}

export function useHCP() {
  return useContext(HCPContext);
}