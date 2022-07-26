export interface RemovePaymentMethodWhereDTO {
  removedBy: string;
  app: string;
  paymentMethodId: string;
}

export interface RemovePaymentMethodDTO {
  where: RemovePaymentMethodWhereDTO;
}
