import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products!: IProduct[]

  constructor(
    private productServices: ProductService,
    private router: Router) {
    this.productServices.getProducts().subscribe(data => {
      this.products = data
    })
  }
  removeItem(id: number) {
    this.productServices.deleteProducts(id).subscribe(() => {
      this.products = this.products.filter(products => products.id !== id)
    })
  }
  gotoProductAdd() {
    this.router.navigate(["admin/product/add"])
  }
}
