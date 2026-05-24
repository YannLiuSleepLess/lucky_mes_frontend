import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'workshops',
        loadChildren: () => import('./workshops/workshops.module').then(m => m.WorkshopsModule),
      },
      {
        path: 'work-centers',
        loadChildren: () => import('./work-centers/work-centers.module').then(m => m.WorkCentersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicDataRoutingModule {}
