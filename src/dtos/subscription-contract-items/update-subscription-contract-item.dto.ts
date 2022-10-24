export interface UpdateSubscriptionContractItemDataDTO {
  quantity?: number;
  updatedBy: string;
}

export interface UpdateSubscriptionContractItemWhereDTO {
  app: string;
  subscriptionContractItem: string;
}

export interface UpdateSubscriptionContractItemDTO {
  data: UpdateSubscriptionContractItemDataDTO;
  where: UpdateSubscriptionContractItemWhereDTO;
}
