import React, { useCallback, useState } from 'react';

import * as Types from '../types';

import Context, { initialState } from './context';

export interface IChildren extends Types.IContext.Props {
  children: React.ReactNode;
}

const Provider: React.FC<IChildren> = ({ children }) => {
  const [state, setState] = useState<Types.IContext.State>({ ...initialState });

  const setIsAuthenticated = useCallback(
    (isAuthenticated: boolean) => setState(state => ({ ...state, isAuthenticated })),
    [setState]
  );

  const setProfile = useCallback(
    (profile: Types.IEntity.Profile) => setState(state => ({ ...state, profile })),
    [setState]
  );

  const setAccessToken = useCallback(
    (accessToken: string) => setState(state => ({ ...state, accessToken })),
    [setState]
  );

  const setIsFetched = useCallback((isFetched: boolean) => setState(state => ({ ...state, isFetched })), [setState]);

  const setTheme = useCallback((theme: Types.IEntity.Theme) => setState(state => ({ ...state, theme })), [setState]);

  return (
    <Context.Provider
      value={{
        methods: {
          setIsAuthenticated,
          setIsFetched,
          setProfile,
          setTheme,
          setAccessToken
        },
        state
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
