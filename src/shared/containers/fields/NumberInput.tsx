import { NumberInput as MantineNumberInput, type NumberInputProps } from '@mantine/core';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

type IProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<NumberInputProps, 'name' | 'value' | 'onChange' | 'error'>;

export function NumberInput<T extends FieldValues>({ control, name, rules, defaultValue, ...rest }: IProps<T>) {
  const {
    field,
    fieldState: { error }
  } = useController<T>({
    name,
    rules,
    control,
    defaultValue
  });

  return <MantineNumberInput {...rest} {...field} error={error?.message} />;
}

export default NumberInput;
