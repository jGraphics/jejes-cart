import { Component, OnInit } from '@angular/core';
import { CartService, Product } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.products = this.cartService.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }
}