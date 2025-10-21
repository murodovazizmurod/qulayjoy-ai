import { createContext } from 'react';

import config from '@/config';

import { storage } from '@/core/services';

import * as Mappers from '../mappers';
import * as Types from '../types';

export const initialState: Types.IContext.State = {
  isAuthenticated: !!storage.local.get(config.api.accessTokenKey),
  isFetched: false,
  profile: Mappers.Profile(),
  theme: storage.local.get('theme') || 'light',
  accessToken: storage.local.get(config.api.accessTokenKey) || ''
};

const context = createContext<Types.IContext.Value>({
  methods: {
    setIsAuthenticated: () => {},
    setIsFetched: () => {},
    setProfile: () => {},
    setTheme: () => {},
    setAccessToken: () => {}
  },
  state: initialState
});

export default context;
