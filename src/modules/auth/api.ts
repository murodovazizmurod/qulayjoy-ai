import { type AxiosPromise } from 'axios';

import { http } from '@/core/services';

import * as Types from './types';

export const Login = ({ values }: { values: Types.IForm.Login }): AxiosPromise<Types.IApi.Single.Response> =>
  http.pureRequest.post(`/api/auth/token/`, {
    username: values.userName,
    password: values.password
  });

export const Register = ({ values }: { values: Types.IForm.Register }): AxiosPromise<Types.IApi.Single.Response> =>
  http.pureRequest.post(`/api/auth/register/`, {
    username: values.userName,
    password: values.password,
    phone: values.phone
  });
