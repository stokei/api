import { SubscriptionContractModel } from '@/models/subscription-contract.model';

export interface SendSubscriptionsCustomersSubscriptionActivatedEmailDTO {
  toAccount: string;
  subscriptionContract: SubscriptionContractModel;
  app: string;
  createdBy: string;
}
