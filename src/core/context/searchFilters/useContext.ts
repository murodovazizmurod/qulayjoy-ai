import { useContext } from 'react';
import { SearchFiltersContext } from './context';

export const useSearchFilters = () => {
  const context = useContext(SearchFiltersContext);
  if (!context) {
    throw new Error('useSearchFilters must be used within a SearchFiltersProvider');
  }
  return context;
};
