import { type ButtonProps } from '@mantine/core';
import MantineButton from '@/shared/components/Button';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

type IProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<ButtonProps, 'name' | 'value' | 'onClick' | 'error'> & {
    value: string;
    full?: boolean;
    multiSelectable?: boolean;
    onClick?: () => void;
  };

export function Button<T extends FieldValues>({
  control,
  name,
  rules,
  full,
  defaultValue,
  multiSelectable,
  value,
  onClick,
  ...rest
}: IProps<T>) {
  const { field } = useController<T>({
    name,
    control,
    rules,
    defaultValue
  });

  const isSelected = multiSelectable ? field.value?.includes?.(value) : field.value === value;

  const handleClick = () => {
    if (multiSelectable) {
      let newValue: string[] = Array.isArray(field.value) ? [...field.value] : [];
      if (isSelected) {
        newValue = newValue.filter(v => v !== value);
      } else {
        newValue.push(value);
      }
      field.onChange(newValue);
    } else {
      field.onChange(value);
    }

    onClick?.();
  };

  return (
    <MantineButton {...rest} full={full} onClick={handleClick} variant={isSelected ? 'filled' : 'outline'}>
      {rest.children}
    </MantineButton>
  );
}

export default Button;
