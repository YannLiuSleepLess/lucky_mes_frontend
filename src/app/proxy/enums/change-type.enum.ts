import { mapEnumToOptions } from '@abp/ng.core';

export enum ChangeType {
  BomChange = 1,
  ProcessChange = 2,
  Both = 3,
}

export const changeTypeOptions = mapEnumToOptions(ChangeType);
