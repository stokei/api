import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export interface CreateSubscriptionContractDTO {
  parent: string;
  product: string;
  type: SubscriptionContractType;
  automaticRenew?: boolean;
  startAt?: string;
  endAt?: string;
  app: string;
  createdBy: string;
}
