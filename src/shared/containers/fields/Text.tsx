import { TextInput, type TextInputProps } from '@mantine/core';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

type IProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextInputProps, 'name' | 'value' | 'onChange' | 'error'> & {
    asArray?: boolean;
  };

export function Text<T extends FieldValues>({
  control,
  name,
  rules,
  defaultValue, // optional qoldiramiz
  asArray = false,
  ...rest
}: IProps<T>) {
  const {
    field,
    fieldState: { error }
  } = useController<T>({
    name,
    control,
    rules,
    ...(defaultValue !== undefined ? { defaultValue } : {})
  });

  return (
    <TextInput
      value={field.value == null ? '' : asArray && Array.isArray(field.value) ? field.value.join(', ') : field.value}
      onChange={e => {
        const value = e.currentTarget.value;
        if (asArray) {
          field.onChange(value ? value.split(',').map(s => s.trim()) : []);
        } else {
          field.onChange(value);
        }
      }}
      error={error?.message}
      {...rest}
    />
  );
}

export default Text;
