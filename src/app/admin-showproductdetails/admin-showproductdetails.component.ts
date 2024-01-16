import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { ShowProductImagesDialogComponentComponent } from '../show-product-images-dialog-component/show-product-images-dialog-component.component';

@Component({
  selector: 'app-admin-showproductdetails',
  templateUrl: './admin-showproductdetails.component.html',
  styleUrls: ['./admin-showproductdetails.component.css']
})
export class AdminShowproductdetailsComponent implements OnInit  {


  showLoadButton = false;
  showTable = false;
  pageNumber: number = 0;
  productDetails: Product[] = [];




  constructor(private productService: ProductService  , private imageProcessingService:ImageProcessingService , private router : Router){}

  ngOnInit(): void {
      this.getProductDetails();
  }




  searchByKeyword(searchkeyword: string | undefined){
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getProductDetails(searchkeyword);
  }

  public getProductDetails(searchKeyword:string = ""){
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKeyword)
    .pipe(
      map((x: Product[] , i) =>x.map((product:Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) =>{

        // this.productDetails = resp;
        resp.forEach(product => this.productDetails.push(product))
        // this.showTable = true;

        console.log(this.productDetails);

        // if(resp.length == 4){
        //   this.showLoadButton = true;
        // }else {
        //   this.showLoadButton = false;
        // }

      },(error : HttpErrorResponse) =>{
        console.log(error);
      }
    );
  }

  deleteProduct(productId: number ){
    console.log("PRODUCTID",productId);

    this.productService.deleteProduct(productId).subscribe(
      (resp)=>{
        console.log("reeeeess",resp);
        this.getProductDetails();
      },
      (error:HttpErrorResponse) =>{
        console.log(error);
      }
    );

  }

  showImages(product : Product){
    console.log(product);
    // this.imagesDialog.open(ShowProductImagesDialogComponentComponent , {
    //   data:{
    //     images: product.productImages
    //   },
    //   height: '500Px',
    //   width:'700px'
    // });

  }


  editProductDetailes(productId: any){
    this.router.navigate(['/addNewProduct' , {productId: productId}]);

  }

  loadMoreProduct(){
    this.pageNumber = this.pageNumber + 1;
    this.getProductDetails();
  }
}
