export interface ExistsPaymentMethodsWhereDTO {
  app?: string;
  parent?: string;
  cardBrand?: string;
  lastFourCardNumber?: string;
  stripePaymentMethod?: string;
}

export interface ExistsPaymentMethodsDTO {
  where: ExistsPaymentMethodsWhereDTO;
}
