import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { ProductService } from '../../../proxy/engineering/products/product.service';
import { ProductDto } from '../../../proxy/engineering/products/dtos/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { Router } from '@angular/router';
import { ProductType, productTypeOptions } from '../../../proxy/enums';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ListService],
})
export class ProductListComponent implements OnInit {
  data: PagedResultDto<ProductDto> = { items: [], totalCount: 0 };

  readonly Math = Math;

  productTypeOptions = productTypeOptions;

  constructor(
    public readonly list: ListService,
    private productService: ProductService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    const productStreamCreator = (query) => this.productService.getList(query);
    this.list.hookToQuery(productStreamCreator).subscribe((response) => {
      this.data = response;
    });
  }

  viewProduct(id: string) {
    this.router.navigate(['/engineering/products', id]);
  }

  createProduct() {
    const modalRef = this.modalService.open(ProductModalComponent, { size: 'lg' });
    modalRef.componentInstance.isEditing = false;
    modalRef.result.then(() => this.list.get(), () => {});
  }

  editProduct(id: string) {
    const modalRef = this.modalService.open(ProductModalComponent, { size: 'lg' });
    modalRef.componentInstance.isEditing = true;
    modalRef.componentInstance.productId = id;
    modalRef.result.then(() => this.list.get(), () => {});
  }

  deleteProduct(id: string, productCode: string) {
    if (confirm(`确定要删除产品 ${productCode} 吗？`)) {
      this.productService.delete(id).subscribe(() => this.list.get());
    }
  }

  onPageChange(page: number): void {
    this.list.page = page - 1;
  }

  trackByProductId(index: number, product: ProductDto): string {
    return product.id ? `product-${product.id}` : `index-${index}`;
  }

  trackByOptionValue(index: number, option: any): string {
    if (!option) return `opt-undefined-${index}`;
    
    const value = option.value;
    const key = option.key;
    
    if (value === null || value === undefined) {
      return key !== null && key !== undefined 
        ? `opt-key-${key}` 
        : `opt-${index}`;
    }
    
    if (typeof value === 'object') {
      const valueStr = JSON.stringify(value);
      return key !== null && key !== undefined 
        ? `opt-obj-${key}-${valueStr}` 
        : `opt-obj-${index}-${valueStr}`;
    }
    
    return key !== null && key !== undefined 
      ? `opt-${key}` 
      : `opt-${value}`;
  }
}
