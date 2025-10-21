export declare namespace IContext {
  export interface Props {}
  export interface Value {
    methods: {
      setIsAuthenticated: (value: boolean) => void;
      setIsFetched: (value: boolean) => void;
      setProfile: (profile: IEntity.Profile) => void;
      setTheme: (theme: 'dark' | 'light') => void;
      setAccessToken: (accessToken: string) => void;
    };
    state: State;
  }

  export interface State {
    isAuthenticated: boolean;
    isFetched: boolean;
    profile: IEntity.Profile;
    theme: IEntity.Theme;
    accessToken: string;
  }
}

export declare namespace IApi {
  export namespace Profile {
    export interface Request {}

    export interface Response {}
  }
  
  export namespace Token {
    export interface Response {
      access: string;
      refresh: string;
    }
  }

  export namespace Single {
    export interface Response {
      data: Login;
    }
  }

  export interface Login {}

  export namespace ClientInfo {
    export interface Request {
      redirectUrl: string;
    }

    export interface Response {
      url: string;
    }
  }
}

export declare namespace IEntity {
  export interface Profile {}

  export interface Role {
    id: string;
    name: string;
  }

  export interface Department {
    id: string;
    name: string;
  }

  export interface Position {
    id: string;
    name: string;
  }

  export interface Login {
    userName: string;
    token?: string;
  }

  export interface Account {
    token: {
      token: string;
    };
    userName: string;
  }

  // drop
  export type Theme = 'dark' | 'light';

  export interface Token {
    id: number;
    userId: number;
    createdAt: number;
    updatedAt: number | null;
    lastUsedAt: number;
    expires: number;
    userAgent: string | null;
    token: string;
    data: any;
    status: number;
    type: string | null;
    phone: string | null;
    positionId: number | null;
  }

  export interface ClientInfo {
    url: string;
  }

  export interface Select {
    code: string;
    name: string;
  }

  export interface AdditionalRole {
    code: string;
    name: string;
    roleGroup: string;
  }
}

export declare namespace IQuery {
  export interface Login {
    item: IEntity.Login;
  }

  export interface CanActions {
    items: {
      [key: string]: IEntity.Select;
    };
  }

  export interface CheckExecutor {
    isMainExecutor: boolean;
    isAdditionalExecutor: boolean;
  }
}

export declare namespace IMutation {
  export interface ClientInfo {}
}

export declare namespace IForm {
  export interface Login {
    userName: string;
    password: string;
  }

  export interface Register {
    userName: string;
    password: string;
    phone: string;
    confirmPassword: string;
  }
}
