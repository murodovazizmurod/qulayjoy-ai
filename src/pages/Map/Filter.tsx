import * as Components from '@mantine/core';
import * as Forms from '@/modules/apartmentSearch/forms';

import Form from './Form/Form';
import Button from '@/shared/components/Button';
import Spacer from '@/shared/components/Spacer';
import GridForm from '../Home/List/components/Form/Form';

// styles
import styles from './Map.module.scss';
import { useViewportSize } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { IconX, IconSearch } from '@tabler/icons-react';

const Filter = () => {
  const { width } = useViewportSize();
  const { t } = useTranslation();
  return (
    <div className={styles.filterbar}>
      <Forms.MapFilterForm>
        {({ isLoading, reset }) => {
          return (
            <>
              <Components.Group align="center" justify="space-between" gap={8} wrap="nowrap">
                <Components.Text className={styles.filterbar_title}>
                  {t('extra_filters', { ns: 'common' })}
                </Components.Text>
                <Button
                  size="xs"
                  variant="text"
                  onClick={() => reset()}
                  leftSection={<IconX size={16} />}
                  className={styles.filterbar_clear_btn}
                >
                  {t('common_clear', { ns: 'common' })}
                </Button>
              </Components.Group>

              <Spacer size="md" />

              {width > 992 ? <Form /> : <GridForm />}
              <Button
                htmlType="submit"
                variant="filled"
                mt="xl"
                loading={isLoading}
                disabled={isLoading}
                full
                leftSection={<IconSearch size={16} />}
              >
                {t('common_search', { ns: 'common' })}
              </Button>
            </>
          );
        }}
      </Forms.MapFilterForm>
    </div>
  );
};

export default Filter;
