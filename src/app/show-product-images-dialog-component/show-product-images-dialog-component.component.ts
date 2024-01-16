import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-product-images-dialog-component',
  templateUrl: './show-product-images-dialog-component.component.html',
  styleUrls: ['./show-product-images-dialog-component.component.css']
})
export class ShowProductImagesDialogComponentComponent implements OnInit {

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
  constructor(){}


  ngOnInit(): void {
      this.receiveImages();
  }

  receiveImages(){
    // console.log(this.data);
  }

}
