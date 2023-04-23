export interface CreatePaymentMethodDTO {
  parent: string;
  stripePaymentMethod: string;
  app: string;
  createdBy: string;
}
