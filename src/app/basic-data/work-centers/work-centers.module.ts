import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { WorkCentersRoutingModule } from './work-centers-routing.module';
import { WorkCenterListComponent } from './work-center-list/work-center-list.component';
import { WorkCenterModalComponent } from './work-center-modal/work-center-modal.component';

@NgModule({
  declarations: [WorkCenterListComponent, WorkCenterModalComponent],
  imports: [CommonModule, SharedModule, WorkCentersRoutingModule],
  exports: [WorkCenterListComponent, WorkCenterModalComponent],
})
export class WorkCentersModule {}
