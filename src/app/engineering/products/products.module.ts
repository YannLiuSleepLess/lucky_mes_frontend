import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { BomVersionModalComponent } from './bom-version-modal/bom-version-modal.component';
import { BomItemModalComponent } from './bom-item-modal/bom-item-modal.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductModalComponent,
    ProductDetailComponent,
    BomVersionModalComponent,
    BomItemModalComponent,
  ],
  imports: [CommonModule, SharedModule, ProductsRoutingModule],
  exports: [ProductListComponent, ProductModalComponent],
})
export class ProductsModule {}
