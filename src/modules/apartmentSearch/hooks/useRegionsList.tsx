import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

interface IProps {
  enabled?: boolean;
}

const useRegionsList = ({ enabled = true }: IProps = {}) => {
  const { data, ...args } = useQuery<Types.IQuery.RegisonsList, string>({
    queryKey: ['regions', 'list'],
    queryFn: async () => {
      const { data } = await Api.RegionsList();
      return Mappers.RegionsList(data);
    },
    enabled
  });

  return { ...args, regions: data };
};

export default useRegionsList;
