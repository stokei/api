export interface UpdatePaymentMethodDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdatePaymentMethodWhereDTO {
  paymentMethodId: string;
}

export interface UpdatePaymentMethodDTO {
  data: UpdatePaymentMethodDataDTO;
  where: UpdatePaymentMethodWhereDTO;
}
