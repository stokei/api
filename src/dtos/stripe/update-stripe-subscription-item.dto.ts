export interface UpdateStripeSubscriptionItemDataDTO {
  quantity: number;
}

export interface UpdateStripeSubscriptionItemWhereDTO {
  stripeSubscriptionItem: string;
  stripeAccount: string;
}

export interface UpdateStripeSubscriptionItemDTO {
  data: UpdateStripeSubscriptionItemDataDTO;
  where: UpdateStripeSubscriptionItemWhereDTO;
}
