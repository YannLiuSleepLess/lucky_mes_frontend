import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ChangesRoutingModule } from './changes-routing.module';
import { ChangeListComponent } from './change-list/change-list.component';
import { ChangeModalComponent } from './change-modal/change-modal.component';

@NgModule({
  declarations: [ChangeListComponent, ChangeModalComponent],
  imports: [CommonModule, SharedModule, ChangesRoutingModule],
  exports: [ChangeListComponent, ChangeModalComponent],
})
export class ChangesModule {}