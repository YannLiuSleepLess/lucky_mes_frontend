import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateWorkshopRequest {
  workshopCode: string;
  workshopName: string;
  location?: string;
  managerId?: string;
}

export interface UpdateWorkshopRequest {
  workshopName: string;
  location?: string;
  managerId?: string;
  isActive: boolean;
}

export interface WorkshopDto extends AuditedEntityDto<string> {
  workshopCode?: string;
  workshopName?: string;
  location?: string;
  managerId?: string;
  isActive: boolean;
}
