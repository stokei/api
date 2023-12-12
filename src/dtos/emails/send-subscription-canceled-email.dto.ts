import { SubscriptionContractModel } from '@/models/subscription-contract.model';

export interface SendSubscriptionCanceledEmailDTO {
  toAccount: string;
  subscriptionContract: SubscriptionContractModel;
  app: string;
  createdBy: string;
}
