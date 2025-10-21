import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as Api from '../api.ts';
import * as Types from '../types.ts';
import * as Mappers from '../mappers.ts';

const useFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ apartment }: Types.IQuery.Favorite): Promise<Types.IApi.Favorites.Response> => {
      const { data } = await Api.Favorite({ apartment });
      return Mappers.Favorite(data && data);
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ['favorite', 'single', 'apartments'],
          exact: false
        });
      }, 1000);
    }
  });
};

export default useFavorite;
