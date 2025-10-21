import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import type { UseFormReturn } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { get } from 'radash';

import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';
import * as Context from '../context';

import { keepOptions } from '@/helpers';
import { message } from '@/shared/components/Message';
import { storage } from '@/core/services';
import config from '@/config';
import { useTranslation } from 'react-i18next';

interface FormValues extends Types.IForm.Register {}

interface IChildren extends UseFormReturn<FormValues> {
  isLoading?: boolean;
}

interface IProps {
  children: (props: IChildren) => React.ReactNode;
  className?: string;
  onError?: (error: string) => void;
  onSettled?: () => void;
  onSuccess?: (value: Types.IApi.Token.Response) => void;
}

const Register: React.FC<IProps> = ({ children, onError, onSettled, onSuccess, className }) => {
  const { methods } = Context.useContext();
  const { t } = useTranslation('messages');

  const mutation = useMutation<Types.IApi.Token.Response, string, FormValues>({
    mutationFn: async values => {
      const { data } = await Api.Register({ values });
      return Mappers.Token(data);
    }
  });

  const loginMutation = useMutation<Types.IApi.Token.Response, string, Types.IForm.Login>({
    mutationFn: async values => {
      const { data } = await Api.Login({ values });
      return Mappers.Token(data);
    }
  });

  const validationSchema = yup
    .object({
      userName: yup.string().trim().required(t('required')),
      phone: yup.string().required(t('required')),
      password: yup.string().required(t('required')),
      confirmPassword: yup
        .string()
        .required(t('required'))
        .oneOf([yup.ref('password')], t('passwords_not_match'))
    })
    .required();

  const form = useForm<FormValues>({
    defaultValues: {
      userName: '',
      password: '',
      phone: '',
      confirmPassword: ''
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = form.handleSubmit(values => {
    mutation.mutate(values, {
      onSuccess: () => {
        loginMutation.mutate(
          {
            userName: values.userName,
            password: values.password
          },
          {
            onSuccess: data => {
              storage.local.set(config.api.accessTokenKey, data.access);

              methods.setIsAuthenticated(true);
              methods.setAccessToken(data.access);

              message.success(t('register_success'));

              onSuccess?.(data);
            }
          }
        );
      },
      onError: error => {
        const takenUserNameError = get(error, 'response.data.username[0]');
        if (takenUserNameError === 'Пользователь с таким именем уже существует.') {
          message.error(t('username_taken'));
        } else {
          message.error(t('error_occurred'));
        }

        onError?.(String(error));
      },
      onSettled: () => {
        form.reset({ ...form.getValues() }, { ...keepOptions });
        onSettled?.();
      }
    });
  });

  return (
    <FormProvider {...form}>
      <form className={className} onSubmit={onSubmit} id="save">
        {children({ ...form, isLoading: mutation.isPending || loginMutation.isPending })}
      </form>
    </FormProvider>
  );
};

export default Register;
