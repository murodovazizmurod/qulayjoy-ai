import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';
import useAuth from '@/modules/auth/hooks/useAuth';

const useFavoriteList = () => {
  const { isAuthenticated } = useAuth();
  const { data, ...args } = useQuery<Types.IQuery.FavoriteList, string>({
    queryKey: ['favorite', 'list'],
    queryFn: async () => {
      const { data } = await Api.FavoriteList();
      return Mappers.FavoriteList(data);
    },
    enabled: isAuthenticated
  });

  return { ...args, items: data };
};

export default useFavoriteList;
