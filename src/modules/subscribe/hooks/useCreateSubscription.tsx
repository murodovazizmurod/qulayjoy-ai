import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Create } from '../api';

export function useCreateSubscription() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (planId: number) => Create({ plan_id: planId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    }
  });

  return mutation;
}
