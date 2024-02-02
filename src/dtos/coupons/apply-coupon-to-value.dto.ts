export interface ApplyCouponToValueDTO {
  coupon: string;
  value: number;
}

export interface ApplyCouponToValueResponse {
  subtotalAmount: number;
  totalAmount: number;
  discountAmount: number;
}
