import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./tabs/cart/cartcheckout/cartcheckout.module').then(m => m.CartCheckoutPageModule)
  },
  {
    path: 'order-successful',
    loadChildren: () => import('./order-successful/order-successful.module').then( m => m.OrderSuccessfulPageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
