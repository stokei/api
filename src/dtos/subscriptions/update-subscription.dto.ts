export interface UpdateSubscriptionDataDTO {
  updatedBy: string;
  name?: string;
}

export interface UpdateSubscriptionWhereDTO {
  subscriptionId: string;
}

export interface UpdateSubscriptionDTO {
  data: UpdateSubscriptionDataDTO;
  where: UpdateSubscriptionWhereDTO;
}
