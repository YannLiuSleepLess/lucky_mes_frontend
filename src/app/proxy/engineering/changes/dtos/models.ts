import type { ChangeType } from '../../../enums/change-type.enum';
import type { Priority } from '../../../enums/priority.enum';
import type { EcnStatus } from '../../../enums/ecn-status.enum';

export interface CreateEngineeringChangeRequest {
  ecnNo: string;
  title: string;
  type: ChangeType;
  description?: string;
  priority: Priority;
  affectedProductIds: string[];
  affectedBomVersionIds: string[];
  affectedProcessRouteIds: string[];
}

export interface EngineeringChangeDto {
  id?: string;
  ecnNo?: string;
  title?: string;
  type: ChangeType;
  description?: string;
  status: EcnStatus;
  priority: Priority;
  affectedProductIds: string[];
  affectedBomVersionIds: string[];
  affectedProcessRouteIds: string[];
  approvedBy?: string;
  approvedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  executedAt?: string;
}

export interface UpdateEngineeringChangeRequest {
  ecnNo: string;
  title: string;
  type: ChangeType;
  description?: string;
  priority: Priority;
  affectedProductIds: string[];
  affectedBomVersionIds: string[];
  affectedProcessRouteIds: string[];
}
