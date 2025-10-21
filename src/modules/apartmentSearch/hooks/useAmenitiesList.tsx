import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

interface IProps {
  enabled?: boolean;
}

const useAmenities = ({ enabled = true }: IProps = {}) => {
  const { data, ...args } = useQuery<Types.IQuery.AmenitiesList, string>({
    queryKey: ['amenties', 'list'],
    queryFn: async () => {
      const { data } = await Api.AmenitiesList();
      return Mappers.AmenitiesList(data);
    },
    enabled
  });

  return { ...args, amenities: data };
};

export default useAmenities;
