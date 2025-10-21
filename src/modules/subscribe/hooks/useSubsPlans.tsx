import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

interface IProps {
  enabled?: boolean;
}

const useSubsPlans = ({ enabled = true }: IProps = {}) => {
  const { data, ...args } = useQuery<Types.IQuery.SubsPlans, string>({
    queryKey: ['subscribePlans', 'list'],
    queryFn: async () => {
      const { data } = await Api.SubsPlans({});
      return Mappers.SubsPlans(data);
    },
    enabled
  });

  return { ...args, plans: data };
};

export default useSubsPlans;
