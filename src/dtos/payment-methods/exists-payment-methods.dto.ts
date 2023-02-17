export interface ExistsPaymentMethodsWhereDTO {
  app?: string;
  parent?: string;
  cardBrand?: string;
  cardExpiryMonth?: string;
  cardExpiryYear?: string;
  lastFourCardNumber?: string;
  stripePaymentMethod?: string;
}

export interface ExistsPaymentMethodsDTO {
  where: ExistsPaymentMethodsWhereDTO;
}
