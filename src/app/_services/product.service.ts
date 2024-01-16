import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private httpClient: HttpClient) { }

  public addProduct(product:FormData){
    return this.httpClient.post<Product>("https://shopyfy-production.up.railway.app/addNewProduct", product);
  }

  public getAllProducts(pageNumber: any, searchKeyword: string = ""){
    return this.httpClient.get<Product[]>("https://shopyfy-production.up.railway.app/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

    public getProductDetailsById(productId: any){
      return this.httpClient.get<Product>("https://shopyfy-production.up.railway.app/getProductDetailsById/"+ productId);
    }

  public deleteProduct(productId: number | null){
    return this.httpClient.delete("https://shopyfy-production.up.railway.app/deleteProductDetailes/"+ productId);
  }

  public getProductDetails(isSingleProductCheckout: string, productId: string){
    return this.httpClient.get<Product[]>("https://shopyfy-production.up.railway.app/getProductDetails/"+ isSingleProductCheckout+"/"+ productId);
  }


  public placeOrder(orderDetails:OrderDetails , isCartCheckout: string){
    return this.httpClient.post("https://shopyfy-production.up.railway.app/placeOrder/"+isCartCheckout , orderDetails);
  }

  public addToCart(productId: string){
    return this.httpClient.get("https://shopyfy-production.up.railway.app/addToCart/"+ productId);
  }

  public getCartDetails(){
    return this.httpClient.get("https://shopyfy-production.up.railway.app/getCartDetails");
  }

  public deleteCartItem(cartId: string){
    return this.httpClient.delete("https://shopyfy-production.up.railway.app/deleteCartItem/"+cartId);
  }

  public getMyOrders(): Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("https://shopyfy-production.up.railway.app/getOrderDetails");
  }

  public getAllOrderDetailsForAdmin(status:string): Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("https://shopyfy-production.up.railway.app/getAllOrderDetails/"+status);
  }

  public markAsDelivered(orderId: string){
    return this.httpClient.get("https://shopyfy-production.up.railway.app/markOrderAsDelivered/"+orderId);
  }

  public createTransaction(amount: any){
    return this.httpClient.get("https://shopyfy-production.up.railway.app/createTransation/"+amount);
  }



}
