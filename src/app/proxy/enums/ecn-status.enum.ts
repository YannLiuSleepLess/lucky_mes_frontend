import { mapEnumToOptions } from '@abp/ng.core';

export enum EcnStatus {
  Draft = 1,
  PendingReview = 2,
  Approved = 3,
  Executed = 4,
  Cancelled = 5,
}

export const ecnStatusOptions = mapEnumToOptions(EcnStatus);
