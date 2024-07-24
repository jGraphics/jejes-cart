import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: Product[] = [];
  page: number = 1;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 2.5, // Number of slides visible on screen
    spaceBetween: 10, // Space between slides
    centeredSlides: false, // Center active slide
    loop: false, // Disable loop
    pager: true // Show pager (indicators)
  };

  constructor(private productsService: ProductsService, 
    private cartService: CartService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(event?: InfiniteScrollCustomEvent) {
    this.productsService.getRemoteProducts(this.page).subscribe(response => {
      if (response) {
        this.products = [...this.products, ...response];
        this.page++;
        if (event) {
          event.target.complete();
        }
      } else if (event) {
        event.target.disabled = true;
      }
    },
  error => {
    console.error('Error loading Products: ', error);
    if (event) {
      event.target.complete();
    }
  });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.loadProducts(event);
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }
  
  goToProductDetails(productId: string) {
    // Navigate to product details page
    console.log('Navigating to product details:', productId);
  }
}