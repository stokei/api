import { SubscriptionContractModel } from '@/models/subscription-contract.model';

export interface SendSubscriptionsCustomersSubscriptionExpiredEmailDTO {
  toAccount: string;
  subscriptionContract: SubscriptionContractModel;
  app: string;
  createdBy: string;
}
