export interface UpdatePaymentMethodDataDTO {
  lastFourCardNumber?: string;
  cardBrand?: string;
  cardExpiryMonth?: string;
  cardExpiryYear?: string;
  updatedBy: string;
}

export interface UpdatePaymentMethodWhereDTO {
  paymentMethod: string;
}

export interface UpdatePaymentMethodDTO {
  data: UpdatePaymentMethodDataDTO;
  where: UpdatePaymentMethodWhereDTO;
}
