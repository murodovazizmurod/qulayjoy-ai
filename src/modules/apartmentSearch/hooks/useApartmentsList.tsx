import { useQuery } from '@tanstack/react-query';
import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

interface IProps {
  enabled?: boolean;
  values?: Types.IForm.ApartmentsFilterQuery; // filter qiymatlarini olish
}

const useApartmentsList = ({ enabled = true, values }: IProps = {}) => {
  const { data, ...args } = useQuery<Types.IQuery.ApartmentsList, string>({
    queryKey: ['apartments', 'list', values],
    queryFn: async () => {
      const { data } = await Api.Apartments({ values });
      return Mappers.ApartmentsList(data);
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { ...args, apartments: data ?? { count: 0, next: null, previous: null, result: [] } };
};

export default useApartmentsList;
