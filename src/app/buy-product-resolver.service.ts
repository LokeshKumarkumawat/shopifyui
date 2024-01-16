import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {

  constructor(private productService: ProductService , private imageProcessingService: ImageProcessingService) { }


  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {


    const id :any=  route.paramMap.get("id");
    const isSingleProductCheckout:any =  route.paramMap.get("isSingleProductCheckout");

    return this.productService.getProductDetails( isSingleProductCheckout ,id)
    .pipe(
      map(
        (x: Product[] , i) => x.map((product: Product) =>this.imageProcessingService.createImages(product))
      )
    )
  }


}
