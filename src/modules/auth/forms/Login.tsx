import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import type { UseFormReturn } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { message } from '@/shared/components/Message';
import * as yup from 'yup';

import config from '@/config';
import { storage } from '@/core/services';

import * as Api from '../api';
import * as Types from '../types';
import * as Context from '../context';
import * as Mappers from '../mappers';

import { keepOptions } from '@/helpers';
import { useTranslation } from 'react-i18next';

interface FormValues extends Types.IForm.Login {}

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

const CreateForm: React.FC<IProps> = ({ children, onError, onSettled, onSuccess, className }) => {
  const { state, methods } = Context.useContext();
  const { t } = useTranslation('messages');

  const mutation = useMutation<Types.IApi.Token.Response, string, FormValues>({
    mutationFn: async values => {
      const { data } = await Api.Login({ values });
      return Mappers.Token(data);
    }
  });

  const validationSchema = yup
    .object({
      userName: yup.string().trim().required(t('required')),
      password: yup.string().required(t('required'))
    })
    .required();

  const form = useForm<FormValues>({
    defaultValues: {
      userName: '',
      password: ''
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = form.handleSubmit(values => {
    mutation.mutate(values, {
      onSuccess: data => {
        storage.local.set(config.api.accessTokenKey, data.access);

        methods.setIsAuthenticated(true);
        methods.setAccessToken(data.access);

        message.success(t('login_success'));

        onSuccess?.(data);
      },
      onError: error => {
        message.error(t('incorrect_credentials'));
        console.error(error);
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
        {children({ ...form, isLoading: mutation.isPending })}
      </form>
    </FormProvider>
  );
};

export default CreateForm;
