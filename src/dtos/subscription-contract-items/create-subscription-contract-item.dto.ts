export class CreateSubscriptionContractItemDTO {
  app: string;
  parent: string;
  product: string;
  quantity: number;
  price: string;
  isDefaultStripeAccount?: boolean;
  stripeSubscriptionItem?: string;
  recurring?: string;
  createdBy: string;
}
