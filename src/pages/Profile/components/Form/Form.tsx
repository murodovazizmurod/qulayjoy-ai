import { Group } from '@mantine/core';

import * as Fields from '@/shared/containers/fields';

import styles from '../../Profile.module.scss';
import { useTranslation } from 'react-i18next';

const Form = () => {
  const { t } = useTranslation('profile');
  return (
    <Group gap={12}>
      <Group className={styles.form_group}>
        <Fields.Text label={t('name')} name="first_name" classNames={{ wrapper: styles.form_group_input }} />
        <Fields.Text label={t('surname')} name="last_name" classNames={{ wrapper: styles.form_group_input }} />
      </Group>

      <Group className={styles.form_group}>
        <Fields.Text name="username" label={t('username')} />
        <Fields.Text name="phone" label={t('phone_number')} />
        <Fields.Select
          name="role"
          label={t('role')}
          data={[
            { label: 'Renter', value: 'renter' },
            { label: 'Landlord', value: 'landlord' }
          ]}
        />
      </Group>
    </Group>
  );
};

export default Form;
