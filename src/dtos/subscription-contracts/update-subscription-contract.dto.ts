export interface UpdateSubscriptionContractDataDTO {
  updatedBy: string;
  automaticRenew?: boolean;
}

export interface UpdateSubscriptionContractWhereDTO {
  app: string;
  subscriptionContract: string;
}

export interface UpdateSubscriptionContractDTO {
  data: UpdateSubscriptionContractDataDTO;
  where: UpdateSubscriptionContractWhereDTO;
}
