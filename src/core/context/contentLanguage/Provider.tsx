import React, { useEffect, useMemo } from 'react';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';

import Context from './context.ts';

const getContentLangSearchParam = () => {
  return new URLSearchParams(window.location.href).get('contentLang') || '';
};

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [query, setQuery] = useQueryParams({
    contentLang: withDefault(StringParam, getContentLangSearchParam())
  });

  useEffect(() => {
    if (query.contentLang && !['uz', 'ru'].includes(query.contentLang)) {
      setQuery({ ...query, contentLang: 'uz' }, 'replace');
    }
  }, [query, query.contentLang, setQuery]);

  const contextValue = useMemo(
    () => ({
      contentLang: query.contentLang || '',
      setQuery
    }),
    [query.contentLang, setQuery]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default Provider;
