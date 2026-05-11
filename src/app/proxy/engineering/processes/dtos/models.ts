import type { ProcessRouteStatus } from '../../../enums/process-route-status.enum';

export interface CreateProcessRouteRequest {
  routeCode: string;
  routeName: string;
  productId: string;
  steps: CreateProcessStepRequest[];
}

export interface CreateProcessStepRequest {
  stepNo: string;
  stepName: string;
  standardTime: number;
  isKeyProcess: boolean;
  description?: string;
}

export interface ProcessRouteDto {
  id?: string;
  routeCode?: string;
  routeName?: string;
  productId?: string;
  version?: string;
  status: ProcessRouteStatus;
  steps: ProcessStepDto[];
}

export interface ProcessStepDto {
  id?: string;
  stepNo?: string;
  stepName?: string;
  standardTime: number;
  isKeyProcess: boolean;
  description?: string;
}

export interface UpdateProcessRouteRequest {
  routeCode: string;
  routeName: string;
  productId: string;
  steps: UpdateProcessStepRequest[];
}

export interface UpdateProcessStepRequest {
  stepNo: string;
  stepName: string;
  standardTime: number;
  isKeyProcess: boolean;
  description?: string;
}
