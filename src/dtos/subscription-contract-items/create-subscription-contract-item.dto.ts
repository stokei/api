export class CreateSubscriptionContractItemDTO {
  app: string;
  parent: string;
  product: string;
  quantity: number;
  price?: string;
  createdByAdmin?: boolean;
  stripeSubscriptionItem?: string;
  recurring?: string;
  createdBy: string;
}
