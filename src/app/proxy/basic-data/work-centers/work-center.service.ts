import type { CreateWorkCenterRequest, GetWorkCenterListRequest, UpdateWorkCenterRequest, WorkCenterDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkCenterService {
  apiName = 'Default';
  

  create = (input: CreateWorkCenterRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, WorkCenterDto>({
      method: 'POST',
      url: '/api/app/work-center',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/work-center/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteMany = (ids: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/work-center/many',
      params: { ids },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, WorkCenterDto>({
      method: 'GET',
      url: `/api/app/work-center/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: GetWorkCenterListRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<WorkCenterDto>>({
      method: 'GET',
      url: '/api/app/work-center',
      params: { workshopId: input.workshopId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdateWorkCenterRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, WorkCenterDto>({
      method: 'PUT',
      url: `/api/app/work-center/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
