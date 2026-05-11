import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'AbpDemo',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44383/',
    redirectUri: baseUrl,
    clientId: 'AbpDemo_App',
    responseType: 'code',
    scope: 'offline_access AbpDemo',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44383',
      rootNamespace: 'AbpDemo',
    },
  },
} as Environment;
