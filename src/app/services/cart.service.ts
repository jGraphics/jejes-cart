import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]);
  private cartItemCount = new BehaviorSubject(0);

  constructor() {}

  getCart() {
    return this.cart.asObservable();
  }

  getCartValue(): Product[] {
    return this.cart.value;
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  addProduct(product: Product) {
    const items = this.cart.value;
    const existingProduct = items.find(p => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      items.push(product);
    }

    this.cart.next(items);
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  removeProduct(product: Product) {
    const items = this.cart.value;
    const index = items.findIndex(p => p.id === product.id);

    if (index !== -1) {
      this.cartItemCount.next(this.cartItemCount.value - items[index].quantity);
      items.splice(index, 1);
      this.cart.next(items);
    }
  }

  decreaseProductQuantity(product: Product) {
    const items = this.cart.value;
    const existingProduct = items.find(p => p.id === product.id);

    if (existingProduct && existingProduct.quantity > 0) {
      existingProduct.quantity -= 1;
      this.cart.next(items);
      this.cartItemCount.next(this.cartItemCount.value - 1);
    } else if (existingProduct && existingProduct.quantity === 1) {
      this.removeProduct(product);
    }
  }

  clearCart() {
    this.cart.next([]);
    this.cartItemCount.next(0);
  }
}
