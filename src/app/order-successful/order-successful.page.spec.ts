import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderSuccessfulPage } from './order-successful.page';

describe('OrderSuccessfulPage', () => {
  let component: OrderSuccessfulPage;
  let fixture: ComponentFixture<OrderSuccessfulPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuccessfulPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
