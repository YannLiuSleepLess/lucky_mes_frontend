import { mapEnumToOptions } from '@abp/ng.core';

export enum ProcessRouteStatus {
  Draft = 1,
  Published = 2,
  Archived = 3,
}

export const processRouteStatusOptions = mapEnumToOptions(ProcessRouteStatus);
