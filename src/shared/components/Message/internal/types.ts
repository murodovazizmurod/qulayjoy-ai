import type { NotificationData, NotificationsProps } from '@mantine/notifications';

export declare namespace IBase {}

export declare namespace IUse {
  type Id = NonNullable<NotificationData['id']>;
  type Message = NonNullable<NotificationData['message']>;

  export interface INotification extends NotificationsProps {
    id?: Id;
    icon?: boolean;
    message?: Message;
    className?: string;
    withCloseButton?: boolean;
    containerWidth?: string | number;
    classNames?: Partial<NotificationData['classNames']>;
  }

  export type SingleProps = string;
  export type IProps = { values: INotification };
}
