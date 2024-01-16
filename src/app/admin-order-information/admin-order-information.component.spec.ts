import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderInformationComponent } from './admin-order-information.component';

describe('AdminOrderInformationComponent', () => {
  let component: AdminOrderInformationComponent;
  let fixture: ComponentFixture<AdminOrderInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrderInformationComponent]
    });
    fixture = TestBed.createComponent(AdminOrderInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
