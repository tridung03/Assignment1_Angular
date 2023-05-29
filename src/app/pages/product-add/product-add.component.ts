import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  productForm = this.formBuilter.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0]
  })
  product!: IProduct
  constructor(
    private formBuilter: FormBuilder,
    private productService: ProductService,
    private router: Router) { }

  onHandleSubmit() {
    const product: IProduct = {
      name: this.productForm.value.name || "",
      price: this.productForm.value.price || 0
    }

    this.productService.addProducts(product).subscribe((product) => {
      this.router.navigate(["admin/product"])
    })
  }
}
