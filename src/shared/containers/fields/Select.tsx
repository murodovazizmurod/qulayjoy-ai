import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';
import MantineSelect from '@/shared/components/Select';
import type { SelectProps } from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';

type IProps<T extends FieldValues> = UseControllerProps<T> & Omit<SelectProps, 'name' | 'value' | 'onChange' | 'error'>;

export function Select<T extends FieldValues>({ control, name, rules, defaultValue, ...rest }: IProps<T>) {
  const {
    field,
    fieldState: { error }
  } = useController<T>({
    name,
    rules,
    control,
    defaultValue
  });

  return (
    <MantineSelect
      {...rest}
      {...field}
      error={error?.message}
      radius={8}
      clearable
      rightSection={<IconSelector size={16} />}
    />
  );
}

export default Select;
