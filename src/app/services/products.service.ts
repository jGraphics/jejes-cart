import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  photos: { url: string }[];
  description?: string;
  current_price?: { NGN?: number }[];
  url?: string;
}

interface ApiResponse {
  items: {
    unique_id: string;
    name: string;
    price: number;
    description: string;
    photos: { url: string }[];
    url_slug: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getRemoteProducts(page = 1): Observable<Product[]> {
    const url = `${environment.baseUrl}/products`;
    const params = new HttpParams()
      .set('organization_id', environment.organization_id)
      .set('Appid', environment.AppId)
      .set('Apikey', environment.ApiKey)
      .set('page', page.toString());

    return this.httpClient.get<ApiResponse>(url, { params }).pipe(
      map(response => {
        console.log('API response:', response); // Log the response for debugging
        if (!response || !response.items) {
          throw new Error('Unexpected API response structure');
        }
        
        return response.items.map(item => ({
          id: item.unique_id,
          name: item.name,
          price: item.price,
          quantity: 0, // You can initialize quantity as needed
          photos: item.photos.map(photo => ({
            url: `${environment.productUrl}/${photo.url}/images?organization_id=${environment.organization_id}`
          })) || [],
          description: item.description,
          current_price: [], // Adjust based on your API response structure
          url: `${environment.baseUrl}/products/${item.url_slug}`
        }));
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        return throwError('Error fetching products. Please try again later.');
      })
    );
  }

  getProductDetails(id: string): Observable<Product> {
    const url = `${environment.productUrl}/${id}`;
    const params = new HttpParams()
      .set('organization_id', environment.organization_id)
      .set('Appid', environment.AppId)
      .set('Apikey', environment.ApiKey);

    return this.httpClient.get<any>(url, { params }).pipe(
      map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 0, // Initialize as needed
        photos: item.photos.map((photo: { url: any }) => ({
          url: `${environment.productUrl}/${photo.url}/images?organization_id=${environment.organization_id}`
        })) || [],
        description: item.description,
        current_price: item.current_price || [], // Adjust based on your API response structure
        url: item.url
      })),
      catchError(error => {
        console.error('Error fetching product details:', error);
        return throwError('Error fetching product details. Please try again later.');
      })
    );
  }
}
