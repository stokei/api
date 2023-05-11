export interface UpdateSubscriptionContractDataDTO {
  updatedBy: string;
  stripeSubscription?: string;
  automaticRenew?: boolean;
  startAt?: number | string;
  endAt?: number | string;
}

export interface UpdateSubscriptionContractWhereDTO {
  app: string;
  subscriptionContract: string;
}

export interface UpdateSubscriptionContractDTO {
  data: UpdateSubscriptionContractDataDTO;
  where: UpdateSubscriptionContractWhereDTO;
}
