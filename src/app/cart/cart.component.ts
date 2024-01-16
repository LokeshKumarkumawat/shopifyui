import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { OrderDetails } from './../_model/order-details.model';
import { ImageProcessingService } from '../image-processing.service';
import { NgForm } from '@angular/forms';

declare var Razorpay: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  isSingleProductCheckout: any = '';
  productDetails: Product[] = [];

  constructor(private productService: ProductService, private router: Router, private imageProcessingService: ImageProcessingService, private activatedRoute: ActivatedRoute,) { }

  cartDetails: any
  products: [] | undefined

 total = 0

  ngOnInit(): void {
    this.getCartDetails();


    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");

    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        { productId: x.productId, quantity: 1 }
      )
    );


    console.log(this.productDetails);
    console.log(this.orderDetails);
  }




  orderDetails: OrderDetails = {
    firstName: '',
    lastName: '',
    fullName: '',
    fullAddress: '',
    cityTown: '',
    postCode: '',
    emailAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderMessage: '',
    transactionId:'',
    orderProductQuantityList: []
  }







































  /////////////////////// cart


  getCartDetails() {
  this.total = 0

    this.productService.getCartDetails()
      .subscribe(
        (response) => {
          console.log(response);
          this.cartDetails = response;

          for (const cart of this.cartDetails) {
            // Do something with each product, for example, log its details
            console.log(cart.product.productDiscountedPrice);
           this.total += cart.product.productDiscountedPrice
          }

          console.log("otle", this.total);



        }
      )
  }


  // checkout(){
  //   this.productService.getProductDetails(false,0).subscribe(
  //     (resp)=>{
  //       console.log(resp);
  //     },(err)=>{
  //       console.log(err);

  //     }
  //   )
  // }
  delete(cartId: string) {
    console.log(cartId);

    this.productService.deleteCartItem(cartId).subscribe(
      (resp) => {
        console.log(resp);
        this.getCartDetails();

      }, (err) => {
        console.log(err);

      }
    )
  }

  checkout() {
    this.router.navigate(['/buyProduct',
      {
        isSingleProductCheckout: false,
        id: 0
      }
    ]);
  }

}


