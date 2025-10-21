import { useQuery } from '@tanstack/react-query';
import * as Api from '../api';
import * as Types from '../types';

interface IProps {
  enabled?: boolean;
  values?: Types.IForm.ApartmentsFilterQuery; // filter qiymatlarini olish
}

const useApartmentsListMap = ({ enabled = true }: IProps = {}) => {
  const { data, ...args } = useQuery<Types.IApi.ApartmentsMap.Response, string>({
    queryKey: ['apartments', 'map'],
    queryFn: async () => {
      const { data } = await Api.ApartmentsMap({});
      return data;
    },
    enabled
  });

  return { ...args, apartments: data?.features };
};

export default useApartmentsListMap;
