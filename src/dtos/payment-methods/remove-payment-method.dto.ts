export interface RemovePaymentMethodWhereDTO {
  removedBy: string;
  app: string;
  paymentMethod: string;
}

export interface RemovePaymentMethodDTO {
  where: RemovePaymentMethodWhereDTO;
}
