import type { ProductType } from '../../../enums/product-type.enum';
import type { AuditedEntityDto } from '@abp/ng.core';
import type { BomType } from '../../../enums/bom-type.enum';

export interface BomItemDto {
  id?: string;
  parentItemId?: string;
  componentProductId?: string;
  componentProductName?: string;
  quantity: number;
  scrapRate: number;
  unit?: string;
  sequence: number;
  level: number;
}

export interface CreateBomItemRequest {
  parentItemId?: string;
  componentProductId?: string;
  quantity: number;
  scrapRate: number;
  unit?: string;
  sequence: number;
}

export interface CreateProductRequest {
  productCode: string;
  productName: string;
  type: ProductType;
  specification: ProductSpecificationDto;
  material?: string;
  unit?: string;
}

export interface ProductDto extends AuditedEntityDto<string> {
  productCode?: string;
  productName?: string;
  type: ProductType;
  specification: ProductSpecificationDto;
  material?: string;
  unit?: string;
  isActive: boolean;
  bomItems: BomItemDto[];
  versions: ProductVersionDto[];
}

export interface ProductSpecificationDto {
  length?: number;
  width?: number;
  height?: number;
  thickness?: number;
  weight?: number;
  customSpecs?: string;
}

export interface ProductVersionDto {
  id?: string;
  productId?: string;
  versionNo?: string;
  bomType: BomType;
  changeReason?: string;
  isActive: boolean;
  changedAt?: string;
  bomItems: BomItemDto[];
}

export interface ReplaceBomItemsRequest {
  items: CreateBomItemRequest[];
}

export interface UpdateBomItemRequest {
  componentProductId?: string;
  quantity: number;
  scrapRate: number;
  unit?: string;
  sequence: number;
  parentItemId?: string;
}

export interface UpdateProductRequest {
  productName: string;
  type: ProductType;
  specification: ProductSpecificationDto;
  material?: string;
  unit?: string;
  isActive: boolean;
}

export interface UpdateProductVersionRequest {
  versionNo?: string;
  bomType: BomType;
  changeReason?: string;
  isActive: boolean;
}
