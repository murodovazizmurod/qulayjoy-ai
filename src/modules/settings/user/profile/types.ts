import * as ApartmentsTypes from '@/modules/apartmentSearch/types';

export declare namespace IApi {
  export namespace Single {
    export interface Response {
      data: IEntity.User;
    }
  }
  export namespace Favorites {
    export interface Response {
      ok: boolean;
    }
  }
  export namespace RemoveFavorite {
    export interface Response {
      ok: boolean;
    }
  }

  export namespace FavoriteList {
    export interface Response {
      count: number;
      next: boolean | null;
      previous: number | null;
      results: ApartmentsTypes.IEntity.Apartment[];
    }
  }
}

export declare namespace IEntity {
  export interface UserProfile {
    role: string;
    phone: string;
    avatar_url: string | null;
  }

  export interface UserStats {
    favorites: number;
    listed_apartments: number;
  }

  export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    profile: UserProfile;
    active_subscription: {
      plan: string;
      days_left: number;
      ends_at: string;
    } | null;
    stats: UserStats;
  }

  export interface FavoriteList {}
}

export declare namespace IQuery {
  export interface Favorite {
    apartment: number;
  }

  export interface FavoriteList {
    count: number;
    next: boolean | null;
    previous: number | null;
    results: ApartmentsTypes.IEntity.Apartment[];
  }
}

export declare namespace IForm {
  export interface Update {
    username?: string;
    first_name?: string;
    last_name?: string;
    role?: string;
    phone?: string;
    avatar_url?: string | null;
    active_subscription: {
      plan: string;
      days_left: number;
      ends_at: string;
    } | null;
    favorites?: number;
    listed_apartments?: number;
  }
}
