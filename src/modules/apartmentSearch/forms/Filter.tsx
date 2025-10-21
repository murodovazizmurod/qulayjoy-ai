import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';

import { keepOptions } from '@/helpers';

import * as yup from 'yup';
import * as Api from '../api';
import * as Types from '../types';
import * as Mappers from '../mappers';
import { scroller } from 'react-scroll';

interface FormValues extends Types.IForm.ApartmentsFilterQuery {}

interface IChildren extends UseFormReturn<FormValues> {
  isLoading?: boolean;
}

interface IProps {
  children: (props: IChildren) => React.ReactNode;
  className?: string;
  onError?: (error: string) => void;
  onSettled?: () => void;
  onSuccess?: (value: Types.IQuery.ApartmentsList, variables?: FormValues) => void;
}

const Filter: React.FC<IProps> = ({ children, onError, onSettled, onSuccess, className }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Types.IQuery.ApartmentsList, string, FormValues, any>({
    mutationFn: async (values: FormValues) => {
      const { data } = await Api.Apartments({ values });
      return Mappers.ApartmentsList(data);
    },
    onSuccess: (data: Types.IQuery.ApartmentsList, variables) => {
      onSuccess && onSuccess(data, variables);

      queryClient.setQueryData(['apartments', 'list'], data);
    },
    onError,
    onSettled
  });

  const validationSchema: yup.ObjectSchema<Types.IForm.ApartmentsFilterQuery> = yup.object({
    amenities: yup.array().of(yup.string().required()).notRequired(),
    area_max: yup.number().notRequired(),
    area_min: yup.number().notRequired(),
    balcony: yup.string().oneOf(['balcony', 'loggia', 'none', 'terrace'], 'Invalid value').notRequired(),
    bathroom: yup.string().oneOf(['combined', 'multi', 'separate'], 'Invalid value').notRequired(),
    category: yup.array().of(yup.string().required()).notRequired(),
    city: yup.number().notRequired(),
    elevators: yup.string().oneOf(['1', '2', '3plus'], 'Invalid value').notRequired(),
    region: yup.string().notRequired(),
    extra_features: yup.array().of(yup.string().required()),
    finishing: yup.string().oneOf(['cosmetic', 'designer', 'euro', 'none', 'required'], 'Invalid value').notRequired(),
    floor_max: yup.number().notRequired(),
    floor_min: yup.number().notRequired(),
    gas: yup.string().oneOf(['main', 'none', 'reservoir'], 'Invalid value').notRequired(),
    heating: yup.string().oneOf(['autonomous', 'central', 'none'], 'Invalid value').notRequired(),
    is_bargain: yup.boolean().notRequired(),
    near_metro: yup.number().notRequired(),
    nearest_metro: yup.number().notRequired(),
    ordering: yup
      .string()
      .oneOf(
        [
          'price',
          '-created_at',
          'created_at',
          '-area_m2',
          'area_m2',
          '-nearest_metro_walking_min',
          'nearest_metro_walking_min'
        ],
        'Invalid value'
      )
      .notRequired(),
    page: yup.number().notRequired(),
    page_size: yup.number().notRequired(),
    parking: yup.string().oneOf(['closed', 'garage', 'none', 'open', 'underground'], 'Invalid value').notRequired(),
    rooms: yup.string().oneOf(['1', '2', '3', '4', '5', '6', '7', 'studio'], 'Invalid value').notRequired(),
    search: yup.string().notRequired(),
    walls: yup
      .string()
      .oneOf(['brick', 'concrete', 'gazoblock', 'keramoblock', 'penoblock', 'slagblock'], 'Invalid value')
      .notRequired(),
    windows_view: yup.array().of(yup.string().required()).notRequired(),
    within_15min_metro: yup.boolean().notRequired(),
    year_max: yup.number().notRequired(),
    year_min: yup.number().notRequired(),
    price_min: yup
      .number()
      .transform((v, o) => (o === '' ? null : v))
      .nullable()
      .notRequired(),

    price_max: yup
      .number()
      .transform((v, o) => (o === '' ? null : v))
      .nullable()
      .notRequired(),

    price_range: yup
      .tuple([yup.number().nullable().defined(), yup.number().nullable().defined()])
      .nullable()
      .notRequired()
  });

  const form = useForm<FormValues>({
    defaultValues: {
      amenities: null,
      area_max: null,
      area_min: null,
      balcony: null,
      bathroom: null,
      category: null,
      city: null,
      elevators: null,
      region: null,
      finishing: null,
      floor_max: null,
      floor_min: null,
      gas: null,
      heating: null,
      is_bargain: null,
      near_metro: null,
      nearest_metro: null,
      ordering: null,
      page: null,
      page_size: null,
      price_max: null,
      price_min: null,
      price_range: [null, null],
      rooms: null,
      search: null,
      windows_view: null,
      within_15min_metro: null,
      year_max: null,
      year_min: null
    },
    resolver: yupResolver<Types.IForm.ApartmentsFilterQuery, any, Types.IForm.ApartmentsFilterQuery>(validationSchema)
  });

  const onSubmit = form.handleSubmit(values => {
    scroller.scrollTo('list-section', {
      duration: 800,
      smooth: 'easeInOutQuart',
      delay: 500
    });

    mutation.mutate(values, {
      onSettled: () => form.reset({ ...form.getValues() }, { ...keepOptions })
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

export default Filter;
