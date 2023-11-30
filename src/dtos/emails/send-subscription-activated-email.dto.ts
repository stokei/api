import { SubscriptionContractModel } from '@/models/subscription-contract.model';

export interface SendSubscriptionActivatedEmailDTO {
  toAccount: string;
  subscriptionContract: SubscriptionContractModel;
  app: string;
  createdBy: string;
}
