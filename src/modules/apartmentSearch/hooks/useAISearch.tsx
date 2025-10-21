import { useQuery } from '@tanstack/react-query';

import { AISearch } from '../api';
import * as Types from '../types';

export const useAISearch = ({
  query,
  language = 'auto',
  enabled = false
}: {
  query: string;
  language?: string;
  enabled?: boolean;
}) => {
  return useQuery<Types.IApi.AISearch.Response>({
    queryKey: ['ai-search', query, language],
    queryFn: async () => {
      const response = await AISearch({ query, language });
      return response.data; // React Query automatically unwraps Axios responses
    },
    enabled: enabled && query.trim().length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
