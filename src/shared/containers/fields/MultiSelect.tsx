import { MultiSelect as MantineMultiSelect, type MultiSelectProps } from '@mantine/core';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

type IProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<MultiSelectProps, 'name' | 'value' | 'onChange' | 'error'>;

export function MultiSelect<T extends FieldValues>({ control, name, rules, ...rest }: IProps<T>) {
  const {
    field,
    fieldState: { error }
  } = useController<T>({
    name,
    rules,
    control
  });

  return (
    <MantineMultiSelect
      {...rest}
      value={field.value ?? []}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={field.name}
      error={error?.message}
    />
  );
}

export default MultiSelect;
