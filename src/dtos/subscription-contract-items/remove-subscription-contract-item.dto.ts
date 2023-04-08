export interface RemoveSubscriptionContractItemWhereDTO {
  removedBy: string;
  app: string;
  subscriptionContractItem: string;
  isDefaultStripeAccount?: boolean;
}

export interface RemoveSubscriptionContractItemDTO {
  where: RemoveSubscriptionContractItemWhereDTO;
}
