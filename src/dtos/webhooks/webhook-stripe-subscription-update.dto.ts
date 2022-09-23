export interface WebhookStripeSubscriptionUpdateDTO {
  stripeSubscription: string;
  startAt?: number | string;
  endAt?: number | string;
  stripeAccount?: string;
}
