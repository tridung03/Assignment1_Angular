import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  productForm = this.formBuilter.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0]
  })
  product!: IProduct
  constructor(
    private formBuilter: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute,
    private routerNavigate: Router) {

    this.router.paramMap.subscribe((params => {
      const id = Number(params.get('id'));
      this.productService.getProduct(id).subscribe(data => {
        this.product = data;
        this.productForm.patchValue({
          name: data.name,
          price: data.price
        })
      }, error => console.log(error.message));
    }))
  }

  onHandleSubmit() {
    const product: IProduct = {
      id: this.product.id,
      name: this.productForm.value.name || "",
      price: this.productForm.value.price || 0
    }

    this.productService.updateProducts(product).subscribe((product) => {
      this.routerNavigate.navigate(["admin/product"])
    })
  }
}
