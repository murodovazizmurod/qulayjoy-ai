import { Select as MantineSelect, type SelectProps } from '@mantine/core';

// styles
import styles from './Select.module.scss';

export const Select = ({ children, className, size = 'md', ...props }: SelectProps) => (
  <MantineSelect
    classNames={{
      input: styles.select
    }}
    {...props}
  />
);

export default Select;
