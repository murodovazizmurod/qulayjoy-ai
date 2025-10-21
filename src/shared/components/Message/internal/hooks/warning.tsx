import { notifications } from '@mantine/notifications';
import cx from 'clsx';

import * as Types from '../types';
import styles from '../../Notification.module.scss';
import { IconExclamationMark } from '@tabler/icons-react';

// overload
function warning(message: Types.IUse.SingleProps): string;
function warning(props: Types.IUse.INotification): string;

function warning(arg: Types.IUse.SingleProps | Types.IUse.INotification) {
  const values: Types.IUse.INotification = typeof arg === 'string' ? { message: arg } : arg;

  return notifications.show({
    id: values.id,
    title: values.title,
    message: values.message,
    position: values.position || 'top-center',
    autoClose: values.autoClose || 5000,
    icon: <IconExclamationMark className={styles.notify_icon} />,
    withCloseButton: values.withCloseButton ?? false,
    classNames: {
      title: styles.notify_title,
      icon: styles.notify_icon_wrapper,
      description: styles.notify_description,
      root: cx(styles.notify_root, styles.warning_root)
    }
  });
}

export default warning;
