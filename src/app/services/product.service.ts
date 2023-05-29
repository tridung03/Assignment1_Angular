import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/Product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`http://localhost:3000/products`)
  }
  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:3000/products/${id}`)
  }
  deleteProducts(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`http://localhost:3000/products/${id}`)
  }
  addProducts(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>("http://localhost:3000/products", product)
  }
  updateProducts(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(`http://localhost:3000/products/${product.id}`, product)
  }
}
