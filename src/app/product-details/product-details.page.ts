import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService, Product } from '../services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  product: Product | null = null;
  imagesUrl: string = environment.baseUrl;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.loadProductDetails();
  }

  loadProductDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productsService.getProductDetails(id).subscribe(
        (res) => {
          this.product = res;
        },
        (err) => {
          console.error('Error loading product details:', err);
        }
      );
    } else {
      console.error('Product ID not found in route parameters.');
    }
  }

  openHomepage(url: string | undefined) {
    if (url) {
      window.open(url, '_blank');
    } else {
      console.error('Product URL is undefined.');
    }
  }
}