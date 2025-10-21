import type { ButtonProps } from '@mantine/core';

export declare namespace IBase {
  type ExtendedVariant = NonNullable<ButtonProps['variant']> | 'primary' | 'secondary' | 'primary-outline' | 'text';

  interface IProps extends ButtonProps {
    className?: string;
    variant?: ExtendedVariant;
    full?: boolean;
    htmlType?: 'button' | 'submit' | 'reset';
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  }
}

export declare namespace IUse {}
