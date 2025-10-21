import { FileInput as MantineFileInput, type FileInputProps } from '@mantine/core';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

type IProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<FileInputProps, 'name' | 'value' | 'onChange' | 'error'>;

export function File<T extends FieldValues>({ control, name, rules, defaultValue, ...rest }: IProps<T>) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error }
  } = useController<T>({
    name,
    control,
    rules,
    defaultValue
  });

  return (
    <MantineFileInput
      {...rest}
      value={value}
      onChange={file => {
        onChange(file);
      }}
      onBlur={onBlur}
      error={error?.message}
      ref={ref}
    />
  );
}

export default File;
