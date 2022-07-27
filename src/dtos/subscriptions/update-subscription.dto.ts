export interface UpdateSubscriptionDataDTO {
  updatedBy: string;
  automaticRenew?: boolean;
}

export interface UpdateSubscriptionWhereDTO {
  app: string;
  subscription: string;
}

export interface UpdateSubscriptionDTO {
  data: UpdateSubscriptionDataDTO;
  where: UpdateSubscriptionWhereDTO;
}
