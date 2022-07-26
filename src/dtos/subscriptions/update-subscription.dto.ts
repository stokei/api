export interface UpdateSubscriptionDataDTO {
  updatedBy: string;
  app: string;
  automaticRenew?: boolean;
}

export interface UpdateSubscriptionWhereDTO {
  subscriptionId: string;
}

export interface UpdateSubscriptionDTO {
  data: UpdateSubscriptionDataDTO;
  where: UpdateSubscriptionWhereDTO;
}
