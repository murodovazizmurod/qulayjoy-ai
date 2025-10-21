import { type AxiosPromise } from 'axios';

import { http } from '@/core/services';

import * as Types from './types';

export const Create = ({ plan_id }: Types.IForm.Create): AxiosPromise<Types.IApi.SelectedPlan.Response> =>
  http.request.post(`/api/auth/subscribe/`, {
    plan_id: plan_id
  });

export const SubsPlans = ({
  values
}: {
  values?: Types.IQuery.SubsPlansQuery;
}): AxiosPromise<Types.IApi.SubsPlans.Response> => http.pureRequest.get(`/api/auth/plans/`, { params: values });

export const SelectedPlan = ({
  values
}: {
  values?: Types.IQuery.SelectedPlan;
}): AxiosPromise<Types.IApi.SelectedPlan.Response> =>
  http.request.get(`/api/auth/my-subscriptions/`, { params: values });
