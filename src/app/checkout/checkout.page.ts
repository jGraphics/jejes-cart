import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Product, CartService } from '../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  cart: Product[] = [];
  cartItemCount$: Observable<number> = undefined!;
  router: any;

  constructor(private cartService: CartService, private alertCtrl: AlertController) { 
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
    // Example:
    this.router.navigateByUrl('/order-successful');
  }

}

