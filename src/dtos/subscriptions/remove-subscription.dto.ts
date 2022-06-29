export interface RemoveSubscriptionWhereDTO {
  removedBy: string;
  subscriptionId: string;
}

export interface RemoveSubscriptionDTO {
  where: RemoveSubscriptionWhereDTO;
}
