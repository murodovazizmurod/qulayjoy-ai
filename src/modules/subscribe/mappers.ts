import { get } from 'radash';

import type * as Types from './types';

export const SubsPlans = (src?: Types.IApi.SubsPlans.Response): Types.IQuery.SubsPlans => ({
  count: get(src, 'count', 0),
  next: get(src, 'next', null),
  previous: get(src, 'previous', null),
  results: (get(src, 'results', []) as any[]).map(SubsPlan)
});

export const SubsPlan = (item?: Types.IEntity.SubsPlan): Types.IEntity.SubsPlan => ({
  id: get(item, 'id', 0),
  name: get(item, 'name', ''),
  slug: get(item, 'slug', ''),
  price_cents: get(item, 'price_cents', 0),
  duration_days: get(item, 'duration_days', 0),
  description: get(item, 'description', '')
});
