import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then(m => m.ProductsPageModule)
      },
      {
        path: 'checkout',
        loadChildren: () => import('../checkout/checkout.module').then(m => m.CheckoutPageModule)
      },
      
      {
        path: '',
        redirectTo: '/tabs/products',
        pathMatch: 'full'
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
