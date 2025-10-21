import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

interface IProps {
  enabled?: boolean;
}

const useSubway = ({ enabled = true }: IProps = {}) => {
  const { data, ...args } = useQuery<Types.IQuery.Subway, string>({
    queryKey: ['subway', 'list'],
    queryFn: async () => {
      const { data } = await Api.Subway();
      return Mappers.Subways(data);
    },
    enabled
  });

  return { ...args, subways: data };
};

export default useSubway;
