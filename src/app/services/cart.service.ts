import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]);
  private cartItemCount = new BehaviorSubject(0);

  private products: Product[] = [
    { id: 0, imageUrl: 'assets/images/pa.png', name: 'Guitar Pick', price: 8.99, quantity: 0 },
    { id: 1, imageUrl: 'assets/images/pc.png', name: 'Coding Laptop', price: 1785.49, quantity: 0 },
    { id: 2, imageUrl: 'assets/images/pe.png',  name: 'Noiseless Headphone', price: 299.99, quantity: 0 },
    { id: 3, imageUrl: 'assets/images/pca.png', name: 'EOS Camera', price: 987.99, quantity: 0 },
    { id: 4, imageUrl: 'assets/images/pe.png', name: 'Wired Headphone', price: 89.99, quantity: 0 },
    { id: 5, imageUrl: 'assets/images/pl.png', name: '2 IN 1 Laptop', price: 2195.49, quantity: 0 },
    { id: 6, imageUrl: 'assets/images/pw.png',  name: 'Designer Watch', price: 4300.00, quantity: 0 },
    { id: 7, imageUrl: 'assets/images/ppp.png', name: 'Smartphones', price: 1780.99, quantity: 0 }
  
  ];

  
  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

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