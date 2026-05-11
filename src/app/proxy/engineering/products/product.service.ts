import type { CreateBomItemRequest, CreateProductRequest, ProductDto, ProductVersionDto, ReplaceBomItemsRequest, UpdateBomItemRequest, UpdateProductRequest, UpdateProductVersionRequest } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiName = 'Default';
  

  addBomItem = (productId: string, input: CreateBomItemRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/product/bom-item/${productId}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  create = (input: CreateProductRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductDto>({
      method: 'POST',
      url: '/api/app/product',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  createNewBomVersion = (productId: string, reason: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/product/new-bom-version/${productId}`,
      params: { reason },
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/product/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteBomItem = (productId: string, bomItemId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/product/bom-item',
      params: { productId, bomItemId },
    },
    { apiName: this.apiName,...config });
  

  deleteBomVersion = (productId: string, versionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: '/api/app/product/bom-version',
      params: { productId, versionId },
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductDto>({
      method: 'GET',
      url: `/api/app/product/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ProductDto>>({
      method: 'GET',
      url: '/api/app/product',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getVersionWithBomItems = (productId: string, versionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductVersionDto>({
      method: 'GET',
      url: '/api/app/product/version-with-bom-items',
      params: { productId, versionId },
    },
    { apiName: this.apiName,...config });
  

  replaceBomItems = (productId: string, versionId: string, input: ReplaceBomItemsRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/product/replace-bom-items',
      params: { productId, versionId },
      body: input,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: UpdateProductRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ProductDto>({
      method: 'PUT',
      url: `/api/app/product/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateBomItem = (productId: string, versionId: string, bomItemId: string, input: UpdateBomItemRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/product/bom-item',
      params: { productId, versionId, bomItemId },
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateBomVersion = (productId: string, versionId: string, input: UpdateProductVersionRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/product/bom-version',
      params: { productId, versionId },
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
