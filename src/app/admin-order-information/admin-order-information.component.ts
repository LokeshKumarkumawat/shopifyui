import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-admin-order-information',
  templateUrl: './admin-order-information.component.html',
  styleUrls: ['./admin-order-information.component.css']
})
export class AdminOrderInformationComponent implements OnInit {

  ngOnInit(): void {

    this.getAllOrderDetailsForAdmin(this.status);
  }


  orderInfo :  any[] = [];
  status:string = 'All';

  constructor(private productService : ProductService) {

  }

  getAllOrderDetailsForAdmin(status:string){
    this.productService.getAllOrderDetailsForAdmin(status).subscribe(
      (resp) =>{
        this.orderInfo = resp;
        // resp.forEach(p => this.productDetails.push(p));
        console.log("resp",this.orderInfo);
      },
      (err)=>{
        console.log(err);

      }
    );
  }

  markAsDelivered(orderId: string){
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe(
      (response) => {
        this.getAllOrderDetailsForAdmin(this.status);
      }
    )
  }


}
