import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

import { keepOptions } from '@/helpers';
import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';

interface FormValues extends Types.IForm.Update {}

interface IChildren extends UseFormReturn<FormValues> {
  isLoading?: boolean;
}

interface IProps {
  children: (props: IChildren) => React.ReactNode;
  className?: string;
  values: Types.IEntity.User;
  onError?: (error: string) => void;
  onSettled?: () => void;
  onSuccess?: (value: Types.IEntity.User) => void;
  initialData?: Types.IEntity.User;
}

const Update: React.FC<IProps> = ({ children, onError, onSettled, onSuccess, className, initialData, values }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    Types.IEntity.User, // success type
    unknown, // error type (string emas!)
    FormValues // variables type
  >({
    mutationFn: async values => {
      const { data } = await Api.Update({ ...values });
      return Mappers.User(data);
    },
    onSuccess: data => {
      onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
    },
    onError: err => {
      const message = err instanceof Error ? err.message : 'Nomaʼlum xatolik yuz berdi';
      onError?.(message);
    },
    onSettled: () => {
      onSettled?.();
    }
  });

  const validationSchema: yup.ObjectSchema<FormValues> = yup.object({
    username: yup.string().optional(),
    first_name: yup.string().optional(),
    last_name: yup.string().optional(),
    role: yup.string().optional(),
    phone: yup.string().optional(),
    avatar_url: yup.string().nullable().optional(),
    active_subscription: yup
      .object({
        plan: yup.string().required(),
        days_left: yup.number().required(),
        ends_at: yup.string().required()
      })
      .nullable(),
    favorites: yup.number().optional(),
    listed_apartments: yup.number().optional()
  });

  const form = useForm<FormValues>({
    defaultValues: {
      username: values.username ?? '',
      first_name: values.first_name ?? '',
      last_name: values.last_name ?? '',
      role: values.profile?.role ?? '',
      phone: values.profile?.phone ?? '',
      avatar_url: values.profile?.avatar_url ?? '',
      active_subscription: values.active_subscription ?? null,
      favorites: values.stats?.favorites ?? 0,
      listed_apartments: values.stats?.listed_apartments ?? 0
    },
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData as unknown as FormValues, keepOptions);
    }
  }, [initialData, form]);

  const onSubmit = form.handleSubmit(values => {
    mutation.mutate(values, {
      onSettled: () => form.reset({ ...form.getValues() }, keepOptions)
    });
  });

  return (
    <FormProvider {...form}>
      <form className={className} onSubmit={onSubmit}>
        {children({ ...form, isLoading: mutation.isPending })}
      </form>
    </FormProvider>
  );
};

export default Update;
