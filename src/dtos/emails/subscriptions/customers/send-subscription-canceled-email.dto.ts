import { SubscriptionContractModel } from '@/models/subscription-contract.model';

export interface SendSubscriptionsCustomersSubscriptionCanceledEmailDTO {
  toAccount: string;
  subscriptionContract: SubscriptionContractModel;
  app: string;
  createdBy: string;
}
