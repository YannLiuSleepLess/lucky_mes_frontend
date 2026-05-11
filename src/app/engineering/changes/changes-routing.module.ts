import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeListComponent } from './change-list/change-list.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangesRoutingModule {}