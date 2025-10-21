const config = {
  api: {
    accessTokenKey: 'accessToken',
    refreshTokenKey: 'refreshToken'
  },
  app: {
    confirmTime: 60000
  },
  language: {
    key: 'language',
    initial: 'uz',
    list: ['uz', 'ru']
  },
  list: {
    perPage: 30
  },
  services: {
    user: 'api/user/v1'
  } as const,
  
  support: {
    phone: '+998906185500',
    secondaryPhone: '+998 '
  }
};

type Keys = keyof typeof config.services;
export type ServiceType = (typeof config.services)[Keys];

export default config;
