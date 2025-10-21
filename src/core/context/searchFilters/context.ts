import { createContext } from 'react';
import * as Types from '@/modules/apartmentSearch/types';

interface SearchFiltersContextType {
  filters: Types.IForm.ApartmentsFilterQuery | undefined;
  setFilters: (filters: Types.IForm.ApartmentsFilterQuery | undefined) => void;
}

export const SearchFiltersContext = createContext<SearchFiltersContextType>({
  filters: undefined,
  setFilters: () => {},
});
