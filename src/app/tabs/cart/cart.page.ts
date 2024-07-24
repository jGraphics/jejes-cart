import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/services/products.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartPage implements OnInit {

    cart: Product[] = [];
    cartItemCount$: Observable<number> = undefined!;
    router: any;
  
    constructor(
      private cartService: CartService, 
      private alertCtrl: AlertController) 
      { 
      this.cartItemCount$ = this.cartService.getCartItemCount();
  
    }
  
    ngOnInit() {
      this.cartService.getCart().subscribe(products => {
        this.cart = products;
      });
    }
  
    decreaseCartItem(product: Product) {
      if (product.quantity > 1) {
        this.cartService.decreaseProductQuantity(product);
      } else {
        this.cartService.removeProduct(product);
      }
    }
  
    increaseCartItem(product: Product) {
      this.cartService.addProduct(product);
    }
  
    removeCartItem(product: Product) {
      this.cartService.removeProduct(product);
    }
  
    getTotal() {
      return this.cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    }
  
    async checkout() {
      // Perform PayPal or Stripe checkout process
  
      let alert = await this.alertCtrl.create({
        header: 'Thanks for your Order!',
        message: 'We will get your product as soon as possible',
        buttons: ['Great!']
      });
  
      await alert.present();
  
      // Clear the cart after checkout
      this.cartService.clearCart();
    }
    navigateToOrderSuccessful() {
      // Implement navigation to order successful screen
     
      this.router.navigateByUrl('/order-successful');
    }
  
  }