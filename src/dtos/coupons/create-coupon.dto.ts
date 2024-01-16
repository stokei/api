export interface CreateCouponDTO {
  code: string;
  parent: string;
  recipient?: string;
  amountOff?: number;
  percentOff?: number;
  app: string;
  createdBy: string;
}
