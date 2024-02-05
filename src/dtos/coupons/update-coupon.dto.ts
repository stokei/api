export interface UpdateCouponDataDTO {
  updatedBy: string;
  code?: string;
  active?: boolean;
  amountOff?: number;
  percentOff?: number;
}

export interface UpdateCouponWhereDTO {
  app: string;
  coupon: string;
}

export interface UpdateCouponDTO {
  data: UpdateCouponDataDTO;
  where: UpdateCouponWhereDTO;
}
