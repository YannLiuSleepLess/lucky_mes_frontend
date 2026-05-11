import { mapEnumToOptions } from '@abp/ng.core';

export enum ProductType {
  RawMaterial = 1,
  Component = 2,
  FinishedGood = 3,
  Auxiliary = 4,
}

export const productTypeOptions = mapEnumToOptions(ProductType);
