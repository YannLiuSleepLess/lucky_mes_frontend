import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineeringRoutingModule } from './engineering-routing.module';
import { ProductsModule } from './products/products.module';
import { ProcessesModule } from './processes/processes.module';
import { ChangesModule } from './changes/changes.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, EngineeringRoutingModule, ProductsModule, ProcessesModule, ChangesModule],
})
export class EngineeringModule {}