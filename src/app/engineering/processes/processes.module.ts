import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProcessesRoutingModule } from './processes-routing.module';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteModalComponent } from './route-modal/route-modal.component';

@NgModule({
  declarations: [RouteListComponent, RouteModalComponent],
  imports: [CommonModule, SharedModule, ProcessesRoutingModule],
  exports: [RouteListComponent, RouteModalComponent],
})
export class ProcessesModule {}