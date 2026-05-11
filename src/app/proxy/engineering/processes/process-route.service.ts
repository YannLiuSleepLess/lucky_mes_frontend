import type { CreateProcessRouteRequest, ProcessRouteDto, UpdateProcessRouteRequest } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProcessRouteService {
  apiName = 'Default';
  

  create = (input: CreateProcessRouteRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProcessRouteDto>({
      method: 'POST',
      url: '/api/app/process-route',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/process-route/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProcessRouteDto>({
      method: 'GET',
      url: `/api/app/process-route/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ProcessRouteDto>>({
      method: 'GET',
      url: '/api/app/process-route',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  publish = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/process-route/${id}/publish`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdateProcessRouteRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProcessRouteDto>({
      method: 'PUT',
      url: `/api/app/process-route/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
