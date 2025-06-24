import { useState } from 'react';
import type { Hcp } from '@/types/hcp';

export const useSearch = () => {
  const [selectedHcp, setSelectedHcp] = useState<Hcp | null>(null);

  const handleSearch = (hcp: Hcp | null) => {
    setSelectedHcp(hcp);
  };

  return { selectedHcp, handleSearch };
};