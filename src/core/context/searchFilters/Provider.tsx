import { useState } from 'react';
import { SearchFiltersContext } from './context';

interface SearchFiltersProviderProps {
  children: React.ReactNode;
}

export const SearchFiltersProvider = ({ children }: SearchFiltersProviderProps) => {
  const [filters, setFilters] = useState<any>(undefined);

  return (
    <SearchFiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </SearchFiltersContext.Provider>
  );
};
