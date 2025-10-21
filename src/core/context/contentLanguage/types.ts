import type { QueryParamConfig, SetQuery } from 'use-query-params';

export declare namespace IContext {
  export interface Value {
    contentLang: string;
    setQuery: SetQuery<{
      contentLang: QueryParamConfig<string | null | undefined, string | undefined>;
    }>;
  }
}
