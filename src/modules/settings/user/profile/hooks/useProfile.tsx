import config from '@/config';
import { useQuery } from '@tanstack/react-query';

import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

import { Context } from '@/modules/auth';
import { storage } from '@/core/services';

interface IProps {
  enabled?: boolean;
}

const useProfile = ({ enabled = true }: IProps = {}) => {
  const { state, methods } = Context.useContext();

  const { data, ...args } = useQuery<Types.IEntity.User, Error>({
    queryKey: ['user', 'profile'],
    queryFn: async () => {
      try {
        const { data } = await Api.Profile();
        return Mappers.User(data);
      } catch (err: any) {
        if (err?.response?.status === 401) {
          methods.setIsAuthenticated(false);
          storage.local.remove(config.api.accessTokenKey);
        }
        throw err;
      }
    },
    enabled: enabled && state.isAuthenticated // ⬅️ only run if logged in
  });

  return { ...args, user: data };
};

export default useProfile;
