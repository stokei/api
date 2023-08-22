export interface ChangeOrderToPaidDTO {
  order: string;
  paidAmount: number;
  feeAmount: number;
  app: string;
  updatedBy: string;
}
