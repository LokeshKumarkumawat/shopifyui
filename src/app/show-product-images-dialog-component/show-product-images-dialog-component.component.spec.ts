import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductImagesDialogComponentComponent } from './show-product-images-dialog-component.component';

describe('ShowProductImagesDialogComponentComponent', () => {
  let component: ShowProductImagesDialogComponentComponent;
  let fixture: ComponentFixture<ShowProductImagesDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowProductImagesDialogComponentComponent]
    });
    fixture = TestBed.createComponent(ShowProductImagesDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
