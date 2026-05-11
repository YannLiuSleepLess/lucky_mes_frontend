import type { CreateEngineeringChangeRequest, EngineeringChangeDto, UpdateEngineeringChangeRequest } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EngineeringChangeService {
  apiName = 'Default';
  

  approve = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/engineering-change/${id}/approve`,
    },
    { apiName: this.apiName,...config });
  

  create = (input: CreateEngineeringChangeRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EngineeringChangeDto>({
      method: 'POST',
      url: '/api/app/engineering-change',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/engineering-change/${id}`,
    },
    { apiName: this.apiName,...config });
  

  execute = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/engineering-change/${id}/execute`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EngineeringChangeDto>({
      method: 'GET',
      url: `/api/app/engineering-change/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<EngineeringChangeDto>>({
      method: 'GET',
      url: '/api/app/engineering-change',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  submitForReview = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/engineering-change/${id}/submit-for-review`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdateEngineeringChangeRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EngineeringChangeDto>({
      method: 'PUT',
      url: `/api/app/engineering-change/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
