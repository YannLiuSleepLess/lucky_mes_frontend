import type { CreateWorkshopRequest, UpdateWorkshopRequest, WorkshopDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  apiName = 'Default';
  

  create = (input: CreateWorkshopRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, WorkshopDto>({
      method: 'POST',
      url: '/api/app/workshop',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/workshop/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteMany = (ids: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/workshop/many',
      params: { ids },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, WorkshopDto>({
      method: 'GET',
      url: `/api/app/workshop/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<WorkshopDto>>({
      method: 'GET',
      url: '/api/app/workshop',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdateWorkshopRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, WorkshopDto>({
      method: 'PUT',
      url: `/api/app/workshop/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
