import { useSubsPlans } from '@/modules/subscribe/hooks';

import * as Components from '@mantine/core';
import Button from '@/shared/components/Button';

import styles from './Subscribe.module.scss';
import { useProfile } from '@/modules/settings/user/profile/hooks';
import { useCreateSubscription } from '@/modules/subscribe/hooks/useCreateSubscription';
import { IconCheck, IconCrown } from '@tabler/icons-react';

export const Subscribe = () => {
  const { plans } = useSubsPlans();
  const { user } = useProfile();
  const { mutate: createSubscription, isPending } = useCreateSubscription();

  const handleClick = async (planId: number) => {
    createSubscription(planId);
  };

  return (
    <div className={styles.container}>
      {plans?.results.map(plan => {
        const { id, name, price_cents, slug, duration_days, description } = plan;

        const isActive = user?.active_subscription?.plan === name?.toLowerCase();

        return (
          <Components.Card key={id} shadow="md" radius="lg" withBorder className={styles.planCard}>
            <Components.Stack gap="xs">
              <Components.Group justify="space-between" align="center">
                <Components.Group gap="xs">
                  <IconCrown size={22} stroke={1.6} color="#ffca57ff" />
                  <Components.Text fw={600} size="lg">
                    {name}
                  </Components.Text>
                </Components.Group>
                <Components.Badge color="cyan" size="sm" radius="sm">
                  {duration_days} days
                </Components.Badge>
              </Components.Group>

              <Components.Text size="xl" fw={700} c="blue">
                ${(price_cents / 100).toFixed(2)}
              </Components.Text>

              <Components.Text size="sm" c="dimmed">
                {description}
              </Components.Text>

              <Components.Group gap="xs" mt="xs">
                <IconCheck size={18} stroke={1.6} />
                <Components.Text size="sm">{slug}</Components.Text>
              </Components.Group>

              <Button full mt="md" onClick={() => handleClick(plan.id)} disabled={isActive || isPending}>
                {isActive ? 'Active' : 'Activate'}
              </Button>
            </Components.Stack>
          </Components.Card>
        );
      })}
    </div>
  );
};
