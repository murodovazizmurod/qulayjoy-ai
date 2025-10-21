import { createContext } from 'react';

import config from '@/config';

import { storage } from '@/core/services';

import * as Mappers from '../mappers';
import * as Types from '../types';

export const initialState: Types.IContext.State = {
  isAuthenticated: !!storage.local.get(config.api.accessTokenKey),
  isFetched: false,
  accessToken: storage.local.get(config.api.accessTokenKey) || ''
};

const context = createContext<Types.IContext.Value>({
  //   methods: {
  //     setIsSubscribedUser: () => {},
  //     setSubscribedProfile: () => {}
  //   },
  state: initialState
});

export default context;
