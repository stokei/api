export interface CreatePaymentMethodCardDTO {
  parent?: string;
  stripePaymentMethod?: string;
  lastFourCardNumber?: string;
  cardBrand?: string;
  cardExpiryMonth?: string;
  cardExpiryYear?: string;
  app: string;
  createdBy: string;
}
