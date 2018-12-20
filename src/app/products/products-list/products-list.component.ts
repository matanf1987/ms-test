import { Component, OnInit, HostListener } from '@angular/core';
import { ProductsService } from '../../_service/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productDetailsForm: FormGroup;
  products: any;
  chosenProductName = 'None';
  chosenProductThumbmail: '';
  chosenProduct: object;
  innerWidth: any;

  constructor(private productsService: ProductsService, private formBuilder: FormBuilder) {

    this.productDetailsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', []],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^([1-9]\d*)?$/)]],
    });
  }

  ngOnInit() {
    this.getProducts();
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  getProducts() {

    this.productsService.getProdutcs().subscribe((data: any) => {

      if (data.length == 0) {
        alert('No data to display');
        return;
      }

      this.products = data;

      console.log(this.products);

    });

  }

  displayProduct(product) {
    this.chosenProduct = product;
    this.chosenProductName = product.name;
    this.chosenProductThumbmail = product.thumbnailUrl;

    if(this.innerWidth >=900) {
      this.productDetailsForm.controls['name'].setValue(product.name);
      this.productDetailsForm.controls['description'].setValue(product.description);
      this.productDetailsForm.controls['price'].setValue(product.price);  
    } else {
      alert('Display the form in a modal');
    }

  }

  saveProduct() {

    if (this.productDetailsForm.invalid) {
      return;
    }

    alert("Thank you for updating product " + this.chosenProductName);
  }

  onChangeOrderBy(value) {

    if (value == 'productName') {
      this.products.sort((a, b) => a.name.toString().localeCompare(b.name.toString()));
    } else if (value == 'price') {
      this.products.sort(this.sortByPrice);
    }
  }

  sortByPrice(a, b) {
    return a.price - b.price;
  }
}
