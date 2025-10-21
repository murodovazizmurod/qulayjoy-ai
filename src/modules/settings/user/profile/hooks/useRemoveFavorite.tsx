import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as Api from '../api.ts';
import * as Types from '../types.ts';
import * as Mappers from '../mappers.ts';

const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ apartment }: Types.IQuery.Favorite): Promise<Types.IApi.Favorites.Response> => {
      const { data } = await Api.RemoveFavorite({ apartmentId: apartment });
      return Mappers.Favorite(data && data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorite', 'list']
      });
    }
  });
};

export default useRemoveFavorite;
