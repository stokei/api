export interface RemoveSubscriptionContractItemWhereDTO {
  removedBy: string;
  app: string;
  subscriptionContractItem: string;
}

export interface RemoveSubscriptionContractItemDTO {
  where: RemoveSubscriptionContractItemWhereDTO;
}
