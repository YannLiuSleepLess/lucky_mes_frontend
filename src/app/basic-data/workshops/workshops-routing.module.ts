import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopListComponent } from './workshop-list/workshop-list.component';

const routes: Routes = [
  {
    path: '',
    component: WorkshopListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkshopsRoutingModule {}
