import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComfirmaionComponent } from './order-comfirmaion.component';

describe('OrderComfirmaionComponent', () => {
  let component: OrderComfirmaionComponent;
  let fixture: ComponentFixture<OrderComfirmaionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderComfirmaionComponent]
    });
    fixture = TestBed.createComponent(OrderComfirmaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
