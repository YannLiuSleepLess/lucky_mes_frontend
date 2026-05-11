import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'processes',
        loadChildren: () => import('./processes/processes.module').then(m => m.ProcessesModule),
      },
      {
        path: 'changes',
        loadChildren: () => import('./changes/changes.module').then(m => m.ChangesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngineeringRoutingModule {}