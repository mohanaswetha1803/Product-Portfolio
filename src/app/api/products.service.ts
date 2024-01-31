import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  // Get method
  getProduct(): Observable<any> {
    return this.http.get('http://localhost:3000/products');
  }

  // Update method to update product in JSON server
  updateProduct(product: any,productLikes:number,productDislikes:number): Observable<any> {
    const url = `http://localhost:3000/products/${product.id}`;
    let likesCount=productLikes;
    let dislikesCount=productDislikes;
    return this.http.patch<any>(url,{likes:likesCount,dislikes:dislikesCount});
  }
}
