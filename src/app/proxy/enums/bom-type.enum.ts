import { mapEnumToOptions } from '@abp/ng.core';

export enum BomType {
  EBOM = 1,
  MBOM = 2,
  PBOM = 3,
}

export const bomTypeOptions = mapEnumToOptions(BomType);
