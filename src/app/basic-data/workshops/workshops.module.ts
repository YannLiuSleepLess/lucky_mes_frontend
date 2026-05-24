import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { WorkshopsRoutingModule } from './workshops-routing.module';
import { WorkshopListComponent } from './workshop-list/workshop-list.component';
import { WorkshopModalComponent } from './workshop-modal/workshop-modal.component';

@NgModule({
  declarations: [WorkshopListComponent, WorkshopModalComponent],
  imports: [CommonModule, SharedModule, WorkshopsRoutingModule],
  exports: [WorkshopListComponent, WorkshopModalComponent],
})
export class WorkshopsModule {}
