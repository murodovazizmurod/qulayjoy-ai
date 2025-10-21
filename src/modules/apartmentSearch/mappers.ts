import { get } from 'radash';
import * as Types from './types';

export const ExtraFeature = (src?: any): Types.IEntity.ExtraFeature => ({
  id: get(src, 'id', 0),
  slug: get(src, 'slug', ''),
  name: get(src, 'name', ''),
  icon: get(src, 'icon', null),
  icon_url: get(src, 'icon_url', null),
  icon_class: get(src, 'icon_class', '')
});

export const Category = (src?: any): Types.IEntity.Categories => ({
  id: get(src, 'id', 0),
  slug: get(src, 'slug', ''),
  name: get(src, 'name', ''),
  icon: get(src, 'icon_class', '')
});

// === Apartment Mapper ===
export const ApartmentMapper = (src?: Types.IApi.Apartments.Response['results'][number]): Types.IEntity.Apartment => ({
  id: get(src, 'id', 0),
  title: get(src, 'title', ''),
  address: get(src, 'address', ''),
  price: get(src, 'price', 0),
  currency: get(src, 'currency', ''),
  city: get(src, 'city', ''),
  categories: (get(src, 'categories', []) as any[]).map(Category),
  description: get(src, 'description', ''),
  area_m2: get(src, 'area_m2', 0),
  total_area_m2: get(src, 'total_area_m2', 0),
  rooms: get(src, 'rooms', ''),
  balcony: {
    display: get(src, 'balcony_display', ''),
    value: get(src, 'balcony', '')
  },
  floor: get(src, 'floor', null),
  floors_total: get(src, 'floors_total', null),
  finishing: {
    display: get(src, 'finishing_display', ''),
    value: get(src, 'finishing', '')
  },
  windows_view: get(src, 'windows_view', []),
  bathroom: {
    display: get(src, 'bathroom_display', ''),
    value: get(src, 'bathroom', '')
  },
  building_year: get(src, 'building_year', 0),
  building_type: {
    display: get(src, 'building_type_display', ''),
    value: get(src, 'building_type', '')
  },
  ceiling_height_m: get(src, 'ceiling_height_m', ''),
  parking: {
    display: get(src, 'parking_display', ''),
    value: get(src, 'parking', '')
  },
  walls: {
    display: get(src, 'walls_display', ''),
    value: get(src, 'walls', '')
  },
  elevators: get(src, 'elevators', ''),
  has_freight_elevator: get(src, 'has_freight_elevator', false),
  gas: {
    display: get(src, 'gas_display', ''),
    value: get(src, 'gas', '')
  },
  heating: {
    display: get(src, 'heating_display', ''),
    value: get(src, 'heating', '')
  },
  location: get(src, 'location', { coordinates: [0, 0], type: 'Point' }),
  is_bargain: get(src, 'is_bargain', false),
  contact_phone: get(src, 'contact_phone', ''),
  amenities: (get(src, 'amenities', []) as any[]).map(Amenities),
  extra_features: (get(src, 'extra_features', []) as any[]).map(ExtraFeature),
  images: (get(src, 'images', []) as any[]).map((item: any) => ({
    id: get(item, 'id', 0),
    image: get(item, 'image', ''),
    is_cover: get(item, 'is_cover', false)
  })),
  nearest_metro: get(src, 'nearest_metro', 0),
  nearest_metro_distance_m: get(src, 'nearest_metro_distance_m', 0),
  nearest_metro_walking_min: get(src, 'nearest_metro_walking_min', 0),
  within_15min_metro: get(src, 'within_15min_metro', false),
  nearest_metro_info: get(src, 'nearest_metro_info', '')
});

// === Lists ===
export const ApartmentsList = (src?: Types.IApi.Apartments.Response): Types.IQuery.ApartmentsList => ({
  count: get(src, 'count', 0),
  next: get(src, 'next', null),
  previous: get(src, 'previous', null),
  result: (get(src, 'results', []) as any[]).map(ApartmentMapper)
});

export const CategoriesList = (src?: Types.IApi.Categories.Response): Types.IQuery.CategoriesList => ({
  count: get(src, 'count', 0),
  next: get(src, 'next', null),
  previous: get(src, 'previous', null),
  result: (get(src, 'results', []) as any[]).map(Category)
});

// === Amenities ===
export const Amenities = (src?: Types.IApi.Amenities.Response): Types.IEntity.Amenities => ({
  id: get(src, 'id', 0),
  slug: get(src, 'slug', ''),
  name: get(src, 'name', ''),
  icon: get(src, 'icon_class', ''),
  icon_url: get(src, 'icon_url', '')
});

export const AmenitiesList = (src?: Types.IApi.Categories.Response): Types.IQuery.AmenitiesList => ({
  count: get(src, 'count', 0),
  next: get(src, 'next', null),
  previous: get(src, 'previous', null),
  result: (get(src, 'results', []) as any[]).map(Amenities)
});

// === Subway ===
export const SubwayFeatures = (src?: Types.IApi.Subway.Response): Types.IEntity.SubwayFeature => ({
  id: get(src, 'id', 0),
  type: get(src, 'type', ''),
  geometry: {
    type: get(src, 'geometry.type', ''),
    coordinates: get(src, 'geometry.coordinates', [0, 0])
  },
  properties: {
    name: get(src, 'properties.name', ''),
    city: get(src, 'properties.city', 0)
  }
});

export const Subway = (src?: Types.IApi.Subway.Response): Types.IEntity.SubwayResults => ({
  type: get(src, 'results.type', ''),
  features: (get(src, 'results.features', []) as any[]).map(SubwayFeatures)
});

export const Subways = (src?: Types.IApi.Subway.Response): Types.IQuery.Subway => ({
  count: get(src, 'count', 0),
  next: get(src, 'next', null),
  previous: get(src, 'previous', null),
  results: Subway(src)
});

export const Region = (src?: Types.IApi.Regisons.Response): Types.IEntity.RegionsResults => ({
  id: get(src, 'id', 0),
  name: get(src, 'name', ''),
  city: get(src, 'city', 0)
});

export const RegionsList = (src?: Types.IApi.Regisons.Response): Types.IQuery.RegisonsList => ({
  count: get(src, 'count', 0),
  next: get(src, 'next', null),
  previous: get(src, 'previous', null),
  results: (get(src, 'results', []) as any[]).map(Region)
});
