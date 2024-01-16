import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent implements OnInit {
  private position = 0;


  pageNumber: number = 0;
  productDetails: any[] = [];
  showLoadButton = false;



  @ViewChild('slider')
  slider!: ElementRef;
  @ViewChild('slide')
  slide!: ElementRef;

  constructor(


    private userService: UserService, private productService: ProductService,
    private imageProcessingService: ImageProcessingService, private router: Router) {

  }

  ngOnInit() {
    this.setupProductScroll();
    this.getProductDetails();
  }

  setupProductScroll() {
    const next = document.getElementsByClassName('pro-next');
    const prev = document.getElementsByClassName('pro-prev');

    for (let i = 0; i < next.length; i++) {
      prev[i].addEventListener('click', () => {
        if (this.position > 0) {
          this.position -= 1;
          this.translateX(this.position);
        }
      });

      next[i].addEventListener('click', () => {
        if (this.position >= 0 && this.position < this.hiddenItems()) {
          this.position += 1.25;
          this.translateX(this.position);
        }
      });
    }
  }

  hiddenItems(): number {
    const items = this.getCount(this.slide.nativeElement, false);
    const visibleItems = this.slider.nativeElement.offsetWidth / 210;
    return items - Math.ceil(visibleItems);
  }

  translateX(position: number): void {
    this.slide.nativeElement.style.left = position * -210 + 'px';
  }

  getCount(parent: any, getChildrensChildren: boolean): number {
    let relevantChildren = 0;
    const children = parent.childNodes.length;
    for (let i = 0; i < children; i++) {
      if (parent.childNodes[i].nodeType !== 3) {
        if (getChildrensChildren) {
          relevantChildren += this.getCount(parent.childNodes[i], true);
        }
        relevantChildren++;
      }
    }
    return relevantChildren;
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

          console.log("DATAAA",resp);


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
}
