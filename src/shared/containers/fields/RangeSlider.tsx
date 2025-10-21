import { RangeSlider as MantineRangeSlider, type RangeSliderProps } from '@mantine/core';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

type IProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<RangeSliderProps, 'name' | 'value' | 'onChange' | 'error'>;

export function RangeSlider<T extends FieldValues>({ control, name, rules, defaultValue, ...rest }: IProps<T>) {
  const { field } = useController<T>({
    name,
    control,
    rules,
    defaultValue
  });

  return (
    <MantineRangeSlider
      {...rest}
      {...field}
      ref={field.ref}
      value={[field.value?.[0] ?? 0, field.value?.[1] ?? 0]} // ⚠️ RangeSlider uchun array kerak
      label={val => (Array.isArray(val) ? `${val[0]} – ${val[1]}` : val)}
      onChange={field.onChange}
    />
  );
}

export default RangeSlider;
