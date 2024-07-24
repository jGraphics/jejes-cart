import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartCheckoutPage } from './cartcheckout.page';

describe('CheckoutPage', () => {
  let component: CartCheckoutPage;
  let fixture: ComponentFixture<CartCheckoutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCheckoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
