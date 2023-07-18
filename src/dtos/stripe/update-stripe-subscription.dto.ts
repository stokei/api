export interface UpdateStripeSubscriptionDataDTO {
  automaticRenew: boolean;
}

export interface UpdateStripeSubscriptionWhereDTO {
  stripeSubscription: string;
  stripeAccount: string;
}

export interface UpdateStripeSubscriptionDTO {
  data: UpdateStripeSubscriptionDataDTO;
  where: UpdateStripeSubscriptionWhereDTO;
}
