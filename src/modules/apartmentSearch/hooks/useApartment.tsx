import { useQuery } from '@tanstack/react-query';
import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

interface IProps {
  id: number;
  enabled?: boolean;
}

const useApartment = ({ id, enabled = true }: IProps) => {
  const { data, ...args } = useQuery<Types.IEntity.Apartment, string>({
    queryKey: ['apartment', id],
    queryFn: async () => {
      const { data } = await Api.Apartment({ id });
      return Mappers.ApartmentMapper(data);
    },
    enabled: !!id && enabled
  });

  return { ...args, apartment: data };
};

export default useApartment;
