import { useQuery } from '@tanstack/react-query';
import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

interface IProps {
  enabled?: boolean;
}

const useCategory = ({ enabled = true }: IProps = {}) => {
  const { data, ...args } = useQuery<Types.IQuery.CategoriesList, string>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await Api.Categories();
      return Mappers.CategoriesList(data);
    },
    enabled,
    staleTime: 30 * 60 * 1000, // 30 minutes - categories don't change often
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { ...args, categories: data };
};

export default useCategory;
