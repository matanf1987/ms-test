import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  public getProdutcs() {
    return this.httpClient.get('https://msbit-exam-products-store.firebaseio.com/products.json/');
  }
}
