import type { AuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateWorkCenterRequest {
  workCenterCode: string;
  workCenterName: string;
  workshopId: string;
  capacity: number;
  shiftCount: number;
}

export interface GetWorkCenterListRequest extends PagedAndSortedResultRequestDto {
  workshopId?: string;
}

export interface UpdateWorkCenterRequest {
  workCenterName: string;
  workshopId: string;
  capacity: number;
  shiftCount: number;
  isActive: boolean;
}

export interface WorkCenterDto extends AuditedEntityDto<string> {
  workCenterCode?: string;
  workCenterName?: string;
  workshopId?: string;
  workshopName?: string;
  capacity: number;
  shiftCount: number;
  isActive: boolean;
}
