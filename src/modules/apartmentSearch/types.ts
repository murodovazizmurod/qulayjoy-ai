export declare namespace IApi {
  export namespace Apartments {
    export interface Response {
      count: number;
      next: string | null;
      previous: string | null;
      results: IEntity.Apartment[];
    }
  }

  export namespace Categories {
    export interface Response {
      count: number;
      next: string | null;
      previous: string | null;
      results: IEntity.Categories[];
    }
  }

  export namespace Amenities {
    export interface Response {
      count: number;
      next: string | null;
      previous: string | null;
      results: IEntity.Amenities[];
    }
  }
  export namespace Subway {
    export interface Response {
      count: number;
      next: string | null;
      previous: string | null;
      results: IEntity.SubwayResults;
    }
  }
  export namespace Regisons {
    export interface Response {
      count: number;
      next: string | null;
      previous: string | null;
      results: IEntity.RegionsResults[];
    }
  }
  export namespace ApartmentsMap {
    export interface Response {
      count: number;
      next: string | null;
      previous: string | null;
      features: IEntity.ApartmentsFeature[];
    }
  }

  export namespace AISearch {
    export interface Response {
      success: boolean;
      query: {
        original: string;
        detected_language: string;
        processed_language: string;
        extracted_criteria: {
          rooms?: string | number | null;
          price_min?: number | null;
          price_max?: number | null;
          metro_preference?: boolean;
          metro_station_name?: string | null;
          walking_distance_minutes?: number | null;
          district?: string | null;
          amenities?: string[];
          categories?: string[];
          confidence_score?: number;
          suggestions?: string[];
          search_intent?: string;
        };
      };
      results: {
        apartments: IEntity.Apartment[];
        count: number;
        filters_applied: any;
      };
      suggestions?: string[];
      metadata: {
        ai_model: string;
        confidence_score: number;
        processing_time: string;
        language_detection: string;
        features: string[];
      };
      error?: string;
      message?: string;
    }
  }
}

export declare namespace IEntity {
  export interface Apartment {
    id: number;
    title: string;
    address: string;
    price: number;
    currency: string;
    city: string;
    categories: Categories[];
    area_m2: number;
    rooms: string;
    balcony: {
      display: string;
      value: string;
    };
    floor: string | null;
    floors_total: string | null;
    finishing: {
      display: string;
      value: string;
    };
    windows_view: string[];
    bathroom: {
      display: string;
      value: string;
    };
    building_year: number;
    building_type: {
      display: string;
      value: string;
    };
    ceiling_height_m: string;
    parking: {
      display: string;
      value: string;
    };
    walls: {
      display: string;
      value: string;
    };
    elevators: string;
    has_freight_elevator: boolean;
    gas: {
      display: string;
      value: string;
    };
    heating: {
      display: string;
      value: string;
    };
    location: {
      coordinates: [number, number];
      type: string;
    };
    is_bargain: boolean;
    contact_phone: string;
    total_area_m2: number;
    amenities: Amenities[];
    extra_features: ExtraFeature[];
    images: { id: number; image: string; is_cover: boolean }[];
    nearest_metro: number;
    nearest_metro_distance_m: number;
    nearest_metro_walking_min: number;
    within_15min_metro: boolean;
    nearest_metro_info: string;
    description: string;
  }

  export interface Amenities {
    id: number;
    slug: string;
    name: string;
    icon: string;
    icon_url: string;
  }

  export interface SubwayFeature {
    id: number;
    type: string;
    geometry: {
      type: string;
      coordinates: [number, number];
    };
    properties: {
      name: string;
      city: number;
    };
  }

  export interface ApartmentsFeature {
    id: number;
    type: string;
    geometry: {
      type: string;
      coordinates: [number, number];
    };
    properties: {
      name: string;
      city: number;
    };
  }

  export interface SubwayResults {
    type: string;
    features: SubwayFeature[];
  }

  export interface RegionsResults {
    id: number;
    name: string;
    city: number;
  }

  export interface ExtraFeature {
    id: number;
    slug: string;
    name: string;
    icon: string | null;
    icon_url: string | null;
    icon_class: string;
  }

  export interface Categories {
    id: number;
    slug: string;
    name: string;
    icon: string;
  }
  export interface ApartmentsMap {
    type: string;
    features: IEntity.ApartmentsFeature[];
  }
}

export declare namespace IQuery {
  export interface ApartmentsList {
    count: number;
    next: string | null;
    previous: string | null;
    result: IEntity.Apartment[];
  }

  export interface CategoriesList {
    count: number;
    next: string | null;
    previous: string | null;
    result: IEntity.Categories[];
  }

  export interface AmenitiesList {
    count: number;
    next: string | null;
    previous: string | null;
    result: IEntity.Amenities[];
  }
  export interface Subway {
    count: number;
    next: string | null;
    previous: string | null;
    results: IEntity.SubwayResults;
  }
  export interface RegisonsList {
    count: number;
    next: string | null;
    previous: string | null;
    results: IEntity.RegionsResults[];
  }
  export interface ApartmentsMap {
    type: string;
    features: IEntity.ApartmentsFeature[];
  }
}

export declare namespace IForm {
  export interface ApartmentsFilterQuery {
    amenities?: string[] | null;
    area_max?: number | null;
    area_min?: number | null;
    balcony?: 'balcony' | 'loggia' | 'none' | 'terrace' | null;
    bathroom?: 'combined' | 'multi' | 'separate' | null;
    category?: string[] | null;
    city?: number | null;
    elevators?: '1' | '2' | '3plus' | null;
    region?: string | null;
    extra_features?: string[] | null;
    finishing?: 'cosmetic' | 'designer' | 'euro' | 'none' | 'required' | null;
    floor_max?: number | null;
    floor_min?: number | null;
    gas?: 'main' | 'none' | 'reservoir' | null;
    heating?: 'autonomous' | 'central' | 'none' | null;
    is_bargain?: boolean | null;
    near_metro?: number | null;
    nearest_metro?: number | null;
    ordering?:
      | '-price'
      | 'price'
      | '-created_at'
      | 'created_at'
      | '-area_m2'
      | 'area_m2'
      | '-nearest_metro_walking_min'
      | 'nearest_metro_walking_min'
      | null;
    page?: number | null;
    page_size?: number | null;
    parking?: 'closed' | 'garage' | 'none' | 'open' | 'underground' | null;
    price_max?: number | null;
    price_min?: number | null;
    price_range?: [number | null, number | null] | null;
    rooms?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | 'studio' | null;
    search?: string | null;
    walls?: 'brick' | 'concrete' | 'gazoblock' | 'keramoblock' | 'penoblock' | 'slagblock' | null;
    windows_view?: string[] | null;
    within_15min_metro?: boolean | null;
    year_max?: number | null;
    year_min?: number | null;
  }

  export interface ApartmentsSearchQuery {
    category?: string[] | null;
    city?: number | null;
    near_metro?: number | null;
    price_max?: number | null;
    price_min?: number | null;
  }
}
