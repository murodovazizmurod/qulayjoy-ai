import React, { useCallback, useState } from 'react';

import * as Types from '../types';

import Context, { initialState } from './context';
import { set } from 'radash';

export interface IChildren extends Types.IContext.Props {
  children: React.ReactNode;
}

const Provider: React.FC<IChildren> = ({ children }) => {
  const [state, setState] = useState<Types.IContext.State>({ ...initialState });

  const setIsSubscribedUser = useCallback(
    (isAuthenticated: boolean) => setState(state => ({ ...state, isAuthenticated })),
    [setState]
  );

  const setSubscribedProfile = useCallback((profile: Types.IEntity.Profile): {} => setState, [setState]);

  return (
    <Context.Provider
      value={{
        methods: {
          setIsSubscribedUser,
          setSubscribedProfile
        },
        state
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
