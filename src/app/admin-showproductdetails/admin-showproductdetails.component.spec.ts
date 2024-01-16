import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowproductdetailsComponent } from './admin-showproductdetails.component';

describe('AdminShowproductdetailsComponent', () => {
  let component: AdminShowproductdetailsComponent;
  let fixture: ComponentFixture<AdminShowproductdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminShowproductdetailsComponent]
    });
    fixture = TestBed.createComponent(AdminShowproductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
