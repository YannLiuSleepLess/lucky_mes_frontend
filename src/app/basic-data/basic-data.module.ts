import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDataRoutingModule } from './basic-data-routing.module';
import { WorkshopsModule } from './workshops/workshops.module';
import { WorkCentersModule } from './work-centers/work-centers.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BasicDataRoutingModule, WorkshopsModule, WorkCentersModule],
})
export class BasicDataModule {}
