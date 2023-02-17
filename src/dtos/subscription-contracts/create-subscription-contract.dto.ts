import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export interface CreateSubscriptionContractDTO {
  app: string;
  parent: string;
  stripeSubscription: string;
  paymentMethod?: string;
  type: SubscriptionContractType;
  automaticRenew: boolean;
  createdBy: string;
}
