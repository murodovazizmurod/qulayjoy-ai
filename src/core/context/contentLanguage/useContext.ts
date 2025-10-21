import React from 'react';

import context from './context';
import * as Types from './types';

const useContext = (): Types.IContext.Value => {
  const ContentLangContext = React.useContext(context);

  if (!ContentLangContext) {
    throw new Error('useContext must be used within a content-lang Provider');
  }
  return ContentLangContext;
};

export default useContext;
