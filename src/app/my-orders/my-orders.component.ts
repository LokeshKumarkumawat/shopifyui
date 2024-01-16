import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';
import { empty } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {




  myOrderDetails: any[] = [];

  isShow = false

  ngOnInit(): void {
    this.getOrderDetails();
  }

  constructor(private ProductService: ProductService) {

  }

  getOrderDetails() {
    this.ProductService.getMyOrders().subscribe(
      (resp: MyOrderDetails[]) => {

        if (resp === null || resp.length === 0) {
          // Handle the case when resp is empty
          console.log("show message");

          this.isShow = true
        } else {
          // Handle the case when resp is not empty
          this.myOrderDetails = resp;
          console.log("show table");

        }

      },
      (err) => {
        console.log(err);

      }
    )
  }

}
