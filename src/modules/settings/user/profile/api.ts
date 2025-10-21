import { http } from '@/core/services';

import type { AxiosPromise } from 'axios';

import * as Types from './types';

export const Profile = (): AxiosPromise<Types.IApi.Single.Response> => http.request.get(`/api/auth/user/me/`);

export const Update = (values: Types.IForm.Update): AxiosPromise<Types.IApi.Single.Response> =>
  http.request.put('/api/auth/user/me/update/', {
    ...values
  });

export const Favorite = ({ apartment }: { apartment: number }): AxiosPromise<Types.IApi.Favorites.Response> =>
  http.request.post('/api/favorites/', {
    apartment
  });

export const FavoriteList = (): AxiosPromise<Types.IApi.FavoriteList.Response> => http.request.get('/api/favorites/');

export const RemoveFavorite = ({
  apartmentId
}: {
  apartmentId: number;
}): AxiosPromise<Types.IApi.RemoveFavorite.Response> => http.request.delete(`/api/favorites/${apartmentId}/`);
