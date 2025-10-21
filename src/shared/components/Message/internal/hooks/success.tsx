import * as Types from '../types';
import { notifications } from '@mantine/notifications';

import cx from 'clsx';
import styles from '../../Notification.module.scss';
import { IconCheck } from '@tabler/icons-react';

function success(message: Types.IUse.SingleProps): string;
function success(props: Types.IUse.INotification): string;

function success(arg: Types.IUse.SingleProps | Types.IUse.INotification) {
  const values: Types.IUse.INotification = typeof arg === 'string' ? { message: arg } : arg;

  return notifications.show({
    id: values.id,
    title: values.title,
    message: values.message,
    position: values.position || 'top-center',
    autoClose: values.autoClose || 5000,
    icon: <IconCheck className={styles.notify_icon} />,
    withCloseButton: values.withCloseButton ?? false,
    classNames: {
      title: styles.notify_title,
      icon: styles.notify_icon_wrapper,
      description: styles.notify_description,
      root: cx(styles.notify_root, styles.success_root)
    }
  });
}

export default success;
