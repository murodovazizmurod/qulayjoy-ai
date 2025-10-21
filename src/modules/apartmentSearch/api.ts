import { http } from '@/core/services';
import type { AxiosPromise } from 'axios';

import * as Types from './types';

export const Apartments = ({
  values
}: {
  values?: Types.IForm.ApartmentsFilterQuery;
}): AxiosPromise<Types.IApi.Apartments.Response> => {
  const params: Record<string, any> = {};

  if (!values) return http.request.get('/api/apartments/');

  Object.entries(values).forEach(([key, val]) => {
    if (val === null || val === undefined || val === '') return;

    // array fieldlarni vergul bilan qo'shib yuboramiz
    if (Array.isArray(val)) {
      params[key] = val.join(',');
    }
    // booleanlarni string ko'rinishda
    else if (typeof val === 'boolean') {
      params[key] = val ? 'true' : 'false';
    }
    // boshqa qiymatlar
    else {
      params[key] = val;
    }
  });

  // aliaslarni to'g'rilash
  if (values.category) {
    params.categories = values.category.join(',');
    delete params.category;
  }
  if (values.region) {
    params.district = values.region;
    delete params.region;
  }

  return http.request.get('/api/apartments/', { params });
};

export const Categories = (): AxiosPromise<Types.IApi.Categories.Response> => http.pureRequest.get('/api/categories/');

export const AmenitiesList = (): AxiosPromise<Types.IApi.Amenities.Response> =>
  http.pureRequest.get(`/api/amenities/`, { params: { page_size: 100 } });

export const Subway = (): AxiosPromise<Types.IApi.Subway.Response> => http.pureRequest.get(`/api/metros/`);

export const RegionsList = (): AxiosPromise<Types.IApi.Regisons.Response> => http.pureRequest.get(`/api/districts/`);

export const ApartmentsMap = ({
  values
}: {
  values?: Types.IForm.ApartmentsFilterQuery;
}): AxiosPromise<Types.IApi.ApartmentsMap.Response> => {
  const params: Record<string, any> = {};

  if (!values) return http.pureRequest.get('/api/apartments/map/');

  Object.entries(values).forEach(([key, val]) => {
    if (val === null || val === undefined || val === '') return;

    // array fieldlarni vergul bilan qo‘shib yuboramiz
    if (Array.isArray(val)) {
      params[key] = val.join(',');
    }
    // booleanlarni string ko‘rinishda
    else if (typeof val === 'boolean') {
      params[key] = val ? 'true' : 'false';
    }
    // boshqa qiymatlar
    else {
      params[key] = val;
    }
  });

  // aliaslarni to‘g‘rilash
  if (values.category) {
    params.categories = values.category.join(',');
    delete params.category;
  }
  if (values.region) {
    params.district = values.region;
    delete params.region;
  }

  return http.pureRequest.get('/api/apartments/map/', { params });
};

export const Apartment = ({ id }: { id: number }): AxiosPromise<Types.IEntity.Apartment> =>
  http.request.get(`/api/apartments/${id}/`);

export const AISearch = ({
  query,
  language = 'auto'
}: {
  query: string;
  language?: string;
}): AxiosPromise<Types.IApi.AISearch.Response> => {
  return http.request.get('/api/apartments/ai_search/', {
    params: {
      query,
      language
    }
  });
};
