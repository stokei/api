export interface RemovePaymentMethodWhereDTO {
  removedBy: string;
  paymentMethodId: string;
}

export interface RemovePaymentMethodDTO {
  where: RemovePaymentMethodWhereDTO;
}
