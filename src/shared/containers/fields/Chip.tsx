import { Chip as MantineChip, type ChipProps } from '@mantine/core';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

type IProps<T extends FieldValues> = UseControllerProps<T> & Omit<ChipProps, 'name' | 'value' | 'onChange' | 'error'>;

export function Chip<T extends FieldValues>({ control, name, rules, defaultValue, ...rest }: IProps<T>) {
  const { field } = useController<T>({
    name,
    control,
    rules,
    defaultValue
  });

  return <MantineChip {...field} {...rest} value={field.value} />;
}

export default Chip;
