import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export interface CreateSubscriptionContractDTO {
  app: string;
  parent: string;
  order?: string;
  stripeCheckoutSession?: string;
  stripeSubscription?: string;
  startAt?: string;
  endAt?: string;
  paymentMethod?: string;
  type: SubscriptionContractType;
  automaticRenew: boolean;
  createdByAdmin: boolean;
  createdBy: string;
}
