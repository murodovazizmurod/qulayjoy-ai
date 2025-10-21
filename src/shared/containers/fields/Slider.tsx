import { Slider as MantineSlider, type SliderProps } from '@mantine/core';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

type IProps<T extends FieldValues> = UseControllerProps<T> & Omit<SliderProps, 'name' | 'value' | 'onChange' | 'error'>;

export function Slider<T extends FieldValues>({ control, name, rules, defaultValue, ...rest }: IProps<T>) {
  const { field } = useController<T>({
    name,
    control,
    rules,
    defaultValue
  });

  return (
    <MantineSlider
      {...rest}
      {...field}
      ref={field.ref}
      value={field.value ?? 0}
      label={field.value ?? 0}
      onChange={field.onChange}
    />
  );
}

export default Slider;
