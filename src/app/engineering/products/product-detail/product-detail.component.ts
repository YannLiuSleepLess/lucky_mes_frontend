import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../proxy/engineering/products/product.service';
import { ProductDto, BomItemDto, ProductVersionDto } from '../../../proxy/engineering/products/dtos/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BomVersionModalComponent } from '../bom-version-modal/bom-version-modal.component';
import { BomItemModalComponent } from '../bom-item-modal/bom-item-modal.component';
import { ProductType, BomType, productTypeOptions, bomTypeOptions } from '../../../proxy/enums';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: ProductDto;
  selectedVersion: ProductVersionDto;
  activeTab = 'basic';
  isSavingBom = false;

  productTypeOptions = productTypeOptions;
  bomTypeOptions = bomTypeOptions;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
    }
  }

  loadProduct(id: string) {
    this.productService.get(id).subscribe((product) => {
      this.product = product;
      if (product.versions.length > 0) {
        this.loadVersionWithBom(product.versions[0].id, id);
      }
    });
  }

  loadVersionWithBom(versionId: string, productId: string) {
    this.productService.getVersionWithBomItems(productId, versionId).subscribe((version) => {
      this.selectedVersion = version;
    });
  }

  onVersionChange(version: ProductVersionDto) {
    if (version?.id) {
      this.loadVersionWithBom(version.id, this.product.id);
    }
  }

  goBack() {
    this.router.navigate(['/engineering/products']);
  }

  createVersion() {
    const modalRef = this.modalService.open(BomVersionModalComponent, { size: 'lg' });
    modalRef.componentInstance.productId = this.product.id;
    modalRef.result.then(
      () => this.loadProduct(this.product.id),
      () => {}
    );
  }

  editVersion(version: ProductVersionDto) {
    const modalRef = this.modalService.open(BomVersionModalComponent, { size: 'lg' });
    modalRef.componentInstance.productId = this.product.id;
    modalRef.componentInstance.versionId = version.id;
    modalRef.componentInstance.version = version;
    modalRef.result.then(
      () => this.loadProduct(this.product.id),
      () => {}
    );
  }

  deleteVersion(versionId: string) {
    if (confirm('确定要删除此BOM版本吗？')) {
      this.productService.deleteBomVersion(this.product.id, versionId).subscribe(
        () => this.loadProduct(this.product.id)
      );
    }
  }

  addBomItem() {
    const modalRef = this.modalService.open(BomItemModalComponent, { size: 'lg' });
    modalRef.componentInstance.productId = this.product.id;
    modalRef.componentInstance.versionId = this.selectedVersion.id;
    modalRef.result.then(
      () => this.loadVersionWithBom(this.selectedVersion.id, this.product.id),
      () => {}
    );
  }

  editBomItem(item: BomItemDto) {
    const modalRef = this.modalService.open(BomItemModalComponent, { size: 'lg' });
    modalRef.componentInstance.productId = this.product.id;
    modalRef.componentInstance.versionId = this.selectedVersion.id;
    modalRef.componentInstance.item = item;
    modalRef.result.then(
      () => this.loadVersionWithBom(this.selectedVersion.id, this.product.id),
      () => {}
    );
  }

  deleteBomItem(itemId: string) {
    if (confirm('确定要删除此BOM项吗？')) {
      this.productService.deleteBomItem(this.product.id, itemId).subscribe(
        () => this.loadVersionWithBom(this.selectedVersion.id, this.product.id)
      );
    }
  }

  saveBomItems() {
    if (!this.selectedVersion?.bomItems?.length) return;

    this.isSavingBom = true;
    const request = {
      items: this.selectedVersion.bomItems.map(item => ({
        parentItemId: item.parentItemId,
        componentProductId: item.componentProductId,
        quantity: item.quantity,
        scrapRate: item.scrapRate,
        unit: item.unit,
        sequence: item.sequence,
      })),
    };

    this.productService.replaceBomItems(this.product.id, this.selectedVersion.id, request).subscribe({
      next: () => {
        this.isSavingBom = false;
        this.loadVersionWithBom(this.selectedVersion.id, this.product.id);
      },
      error: () => {
        this.isSavingBom = false;
      },
    });
  }

  getRootBomItems(): BomItemDto[] {
    if (!this.selectedVersion) return [];
    return this.selectedVersion.bomItems?.filter(item => !item.parentItemId) || [];
  }

  getChildItems(parentId: string): BomItemDto[] {
    if (!this.selectedVersion) return [];
    return this.selectedVersion.bomItems?.filter(item => item.parentItemId === parentId) || [];
  }

  trackByBomItemId(index: number, item: BomItemDto): string {
    return item.id || index.toString();
  }

  trackByVersionId(index: number, version: ProductVersionDto): string {
    return version.id || index.toString();
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
