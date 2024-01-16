import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  pageNumber: number = 0;
  productDetails: any[] = [];
  showLoadButton = false;

  constructor(


    private userService: UserService, private productService: ProductService,
     private imageProcessingService: ImageProcessingService, private router: Router) {

  }

  ngOnInit(): void {
    this.getProductDetails();

  }



  public getProductDetails(searchKey: string = "") {
    this.productService.getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (resp: Product[]) => {
          console.log(resp);

          if (resp.length == 4) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }

          resp.forEach(p => this.productDetails.push(p));
          // this.productDetails = resp;
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }


  showProductDetails(productId: any) {
    this.router.navigate(['/productViewDetails', { productId: productId }])

  }

  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getProductDetails();
  }

  searchByKeyword(searchkeyword: string | undefined) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];

    this.getProductDetails(searchkeyword);

  }


}
