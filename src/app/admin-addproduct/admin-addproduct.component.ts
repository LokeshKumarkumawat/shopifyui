import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FileHandle } from '../_model/file-handle.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-addproduct',
  templateUrl: './admin-addproduct.component.html',
  styleUrls: ['./admin-addproduct.component.css']
})
export class AdminAddproductComponent implements OnInit {


  isNewProduct = true;

  product: Product={
    productId: 0 ,
    productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0,
    productCategorie:"",
    productImages: []
  }

  constructor(private productService: ProductService ,
    private sanitizer : DomSanitizer,
    private activatedRoute : ActivatedRoute
    ){}


    ngOnInit(): void {
        this.product  = this.activatedRoute.snapshot.data['product'];
        if(this.product && this.product.productId){
          this.isNewProduct = false;
        }
    }

  addProduct(productForm:NgForm){

    console.log("FORM",productForm);



    const productFormData =  this.prepareFormData(this.product);

    this.productService.addProduct(productFormData).subscribe(
      (response:Product)=>{
        console.log("RESPONCE",response);

        productForm.reset();
        this.product.productImages = [];

      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }

    );

  }


  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)] , {type:'application/json'})
    );

    for(var i=0 ; i< product.productImages.length ; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;

  }




  onFileSelected(event: any){
    if(event.target.files){
      const file = event.target.files[0];

      const FileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.product.productImages.push(FileHandle);

    }
  }

  removeImages(i:number){
    this.product.productImages.splice(i,1);
  }

  fileDropped(fileHandle: any){ /////////////////////////////////
    this.product.productImages.push(fileHandle);
  }
}
