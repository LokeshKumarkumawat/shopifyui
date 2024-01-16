import { Component ,OnInit  } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  sizes = [42, 40, 38, 37];
  selectedSizeIndex: number | null = null;


  checkboxes!: NodeListOf<HTMLInputElement>;
  checkboxes2!: NodeListOf<HTMLInputElement>;

  product!: Product;
  selectedProductIndex = 0;

  constructor(private activatedRoute:ActivatedRoute , private router :Router , private productService:ProductService) { }


  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);

  }





  changeIndex(index: number){
    this.selectedProductIndex = index;
  }

  buyProduct(productId: any){
    this.router.navigate(['/buyProduct',
    {
      isSingleProductCheckout:true,
      id:productId
    }
  ]);
  }

  addToCart(productId: any){
    console.log("clicked");

    this.productService.addToCart(productId).subscribe(
      (response) =>{
        console.log(response);
        this.router.navigate(['/cart',])
      },(error)=>{
        console.log(error);

      }
    );
  }







  changeBackgroundColor(index: number) {
    if (this.selectedSizeIndex === index) {
      this.selectedSizeIndex = null;
    } else {
      this.selectedSizeIndex = index;
    }
  }
















  checkbox(){
    this.checkboxes = document.querySelectorAll('.checkbox');

    this.checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          this.checkboxes.forEach(cb => {
            if (cb !== checkbox) {
              cb.checked = false;
            }
          });
        }
      });
    });
  }

sizebox(){
    this.checkboxes2 = document.querySelectorAll('.sizebox');

    this.checkboxes2.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          this.checkboxes2.forEach(cb => {
            if (cb !== checkbox) {
              cb.checked = false;
            }
          });
        }
      });
    });
  }
}
