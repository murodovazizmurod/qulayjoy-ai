import { createContext } from 'react';

import * as Types from './types';

const context = createContext<Types.IContext.Value>({
  contentLang: '',
  setQuery: () => undefined
});

export default context;
