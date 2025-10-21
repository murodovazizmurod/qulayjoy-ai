import { get } from 'radash';
import * as Types from './types';

import * as ApartmentsMapper from '@/modules/apartmentSearch/mappers';

export const User = (src?: any): Types.IEntity.User => ({
  id: get(src, 'id', 0),
  username: get(src, 'username', ''),
  first_name: get(src, 'first_name', ''),
  last_name: get(src, 'last_name', ''),
  profile: UserProfile(get(src, 'profile', {})),
  active_subscription: src.active_subscription
    ? {
        plan: get(src, 'active_subscription.plan', ''),
        days_left: get(src, 'active_subscription.days_left', 0),
        ends_at: get(src, 'active_subscription.ends_at', '')
      }
    : null,
  stats: UserStats(get(src, 'stats', {}))
});

export const UserProfile = (src?: any): Types.IEntity.UserProfile => ({
  role: get(src, 'role', ''),
  phone: get(src, 'phone', ''),
  avatar_url: get(src, 'avatar_url', null)
});

export const UserStats = (src?: any): Types.IEntity.UserStats => ({
  favorites: get(src, 'favorites', 0),
  listed_apartments: get(src, 'listed_apartments', 0)
});

export const Favorite = (src?: any): Types.IApi.Favorites.Response => ({
  ok: get(src, 'ok', false)
});

export const FavoriteList = (src?: any): Types.IApi.FavoriteList.Response => ({
  count: get(src, 'count', 0),
  next: get(src, 'next', null),
  previous: get(src, 'previous', null),
  results: (get(src, 'results', []) as any[]).map(ApartmentsMapper.ApartmentMapper)
});

export const Update = (src?: any): Types.IEntity.User => ({
  id: get(src, 'id', 0),
  username: get(src, 'username', ''),
  first_name: get(src, 'first_name', ''),
  last_name: get(src, 'last_name', ''),
  profile: UserProfile(get(src, 'profile', {})),
  active_subscription: get(src, 'active_subscription', null),
  stats: UserStats(get(src, 'stats', {}))
});
