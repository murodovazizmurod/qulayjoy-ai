export declare namespace IContext {
  export interface Props {}
  export interface Value {
    methods?: {
      setIsSubscribedUser: (value: boolean) => void;
      setSubscribedProfile: (profile: IEntity.Profile) => {};
    };
    state: State;
  }

  export interface State {
    isAuthenticated: boolean;
    isFetched: boolean;
    accessToken: string;
  }
}

export declare namespace IApi {
  export namespace Profile {
    export interface Request {}

    export interface Response {}
  }

  export namespace SubsPlans {
    export interface Response {
      count: number;
      next: string | null;
      previous: string | null;
      results: IEntity.SubsPlan[];
    }
  }

  export namespace SelectedPlan {
    export interface Response {
      count: number;
      next: string | null;
      previous: string | null;
      results: IEntity.Subscription[];
    }
  }
}

export declare namespace IEntity {
  export interface Profile {}

  export interface CreateSubs {
    id: string;
    name: string;
  }

  export interface SubsPlan {
    id: number;
    slug: string;
    name: string;
    price_cents: number;
    duration_days: number;
    description: string;
  }

  export interface Subscription {
    id: number;
    plan: SubsPlan;
    start: string;
    end: string;
    is_active: boolean;
  }
}

export declare namespace IQuery {
  export interface SubsPlansQuery {
    ordering?: string;
    search?: string;
    page?: number;
    page_size?: number;
  }

  export interface SubsPlans {
    count: number;
    next: null;
    previous: null;
    results: IEntity.SubsPlan[];
  }

  export interface SelectedPlan {
    count: number;
    next: string | null;
    previous: string | null;
    results: IEntity.Subscription[];
  }
}

export declare namespace IForm {
  export interface Create {
    plan_id: number;
  }
}
