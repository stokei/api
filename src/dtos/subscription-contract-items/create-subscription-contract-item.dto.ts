export class CreateSubscriptionContractItemDTO {
  app: string;
  parent: string;
  product: string;
  quantity: number;
  price: string;
  stripeSubscriptionItem?: string;
  recurring?: string;
  createdBy: string;
}
