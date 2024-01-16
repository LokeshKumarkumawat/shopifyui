import { Component, OnInit ,Injector, NgZone} from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { OrderDetails } from '../_model/order-details.model';
import { NgForm } from '@angular/forms';


declare var Razorpay: any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  isSingleProductCheckout:any= '';
  productDetails: Product[] = [];


  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService , private router : Router, private injector:Injector) { }

  ngOnInit(): void {


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
    firstName:'',
    lastName: '',
    fullName: '',
    fullAddress: '',
    cityTown:'',
    postCode:'',
    emailAddress:'',
    contactNumber: '',
    alternateContactNumber: '',
    orderMessage:'',
    transactionId:'',
    orderProductQuantityList: []
  }


  public placeOrder(orderForm: NgForm) {
    console.log("clickeddd");
    console.log("orderForm",orderForm);

    this.productService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (resp) =>{
        console.log(resp);
        orderForm.reset();


        const ngZone = this.injector.get(NgZone);

        ngZone.run(()=>{
          this.router.navigate(["/orderConfirm"])
        })


      },
      (err)=>{
        console.log(err);

      }
    )
  }



  getQuantityForProduct(productId: number){
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) =>productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;

  }


  getCalculatedTotal(productId: number , productDiscountedPrice: number ){
   const filteredProduct =  this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQuantityChanged(q: any , productId: any){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = q;
  }


  getCalculatedGrandTotal(){
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) =>{
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;

        grandTotal = grandTotal + price * productQuantity.quantity;
      }
    );

    return grandTotal;
  }

  createTransactionAndplaceOrder(orderForm:NgForm){
    console.log("order Date",orderForm);

    let amount :any = this.getCalculatedGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (response)=>{
        console.log("ress",response);
        this.openTransactionModal(response, orderForm);

      },(err)=>{
        console.log("GETTING ERROR");

        console.log(err);


      }
    )

  }


  onPaymentHandler(response: any) {
    console.log("payment response", response);
    if (response.razorpay_payment_id) {
      // Payment successful
    } else {
      console.log("ERROR");
    }
  }


  openTransactionModal(response:any, orderForm:NgForm){
    console.log("responce Option => " , response);


    var options= {

      order_id: response.orderId,
      key: 'rzp_test_kkPYpj78OTYqLd',
      amount: response.amount,
      currency: response.currency,
      name:'JMC',
      timeout: 300,
      description: 'Payment of online shopping',
      image:'https://cdn.pixabay.com/photo/2023/04/04/00/51/sunset-7898136_640.jpg',
      handler:(response:any) =>{
        if(response!=null && response.razorpay_payment_id != null){
          this.processResponse(response,orderForm);
        }else{
          alert("Payment failed!!")
        }



      },
      prefill : {
        name:'JMC',
        email:'lokesh.kumar@example.com',
        contact:'9090909099'
      },
      notes:{
        address:'Online Shopping'
      },
      theme:{
        color:'#F37254'
      }
    };




    var razorPayObject =  new Razorpay(options);

    console.log("RRRR",razorPayObject);

    razorPayObject.open();
    console.log("RRARR",razorPayObject);
  }

  processResponse(resp:any,orderForm:NgForm){

this.orderDetails.transactionId = resp.razorpay_payment_id;
    this.placeOrder(orderForm)
  }

}
