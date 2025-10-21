import { get } from 'radash';

import type * as Types from './types';

export const Profile = (_?: Types.IApi.Profile.Response): Types.IEntity.Profile => ({});

export const Token = (item?: any): Types.IApi.Token.Response => ({
  access: get(item, 'access'),
  refresh: get(item, 'refresh')
});

export const Login = (item?: Types.IApi.Token.Response): Types.IEntity.Token => ({
  id: get(item, 'id') || 0,
  userId: get(item, 'user_id') || 0,
  createdAt: get(item, 'created_at') || 0,
  updatedAt: get(item, 'updated_at') ?? null,
  lastUsedAt: get(item, 'last_used_at') || 0,
  expires: get(item, 'expires') || 0,
  userAgent: get(item, 'user_agent') ?? null,
  token: get(item, 'token') || '',
  data: get(item, 'data'),
  status: get(item, 'status') || 0,
  type: get(item, 'type') ?? null,
  phone: get(item, 'phone') ?? null,
  positionId: get(item, 'position_id') ?? null
});
