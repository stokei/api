export interface CreateSubscriptionDTO {
  parent: string;
  product: string;
  automaticRenew?: boolean;
  startAt?: string;
  endAt?: string;
  app: string;
  createdBy: string;
}
