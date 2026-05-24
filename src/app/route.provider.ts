import { RoutesService, eLayoutType } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const APP_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routesService: RoutesService) {
  return () => {
    routesService.add([
      {
        path: '/',
        name: 'AbpDemo::Menu:Home',
        iconClass: 'fas fa-home',
        order: 1,
        layout: eLayoutType.application,
      },
      {
        path: '/engineering',
        name: 'AbpDemo::Menu:Engineering',
        iconClass: 'fas fa-cog',
        order: 2,
        layout: eLayoutType.application,
      },
      {
        path: '/engineering/products',
        name: 'AbpDemo::Menu:Products',
        parentName: 'AbpDemo::Menu:Engineering',
        layout: eLayoutType.application,
      },
      {
        path: '/engineering/processes',
        name: 'AbpDemo::Menu:Processes',
        parentName: 'AbpDemo::Menu:Engineering',
        layout: eLayoutType.application,
      },
      {
        path: '/engineering/changes',
        name: 'AbpDemo::Menu:Changes',
        parentName: 'AbpDemo::Menu:Engineering',
        layout: eLayoutType.application,
      },
      {
        path: '/basicdata',
        name: 'AbpDemo::Menu:BasicData',
        iconClass: 'fas fa-database',
        order: 3,
        layout: eLayoutType.application,
      },
      {
        path: '/basicdata/workshops',
        name: 'AbpDemo::Menu:Workshops',
        parentName: 'AbpDemo::Menu:BasicData',
        layout: eLayoutType.application,
      },
      {
        path: '/basicdata/work-centers',
        name: 'AbpDemo::Menu:WorkCenters',
        parentName: 'AbpDemo::Menu:BasicData',
        layout: eLayoutType.application,
      },
    ]);
  };
}