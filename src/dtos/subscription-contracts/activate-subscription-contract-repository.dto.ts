import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';

export interface ActivateSubscriptionContractRepositoryDataDTO {
  paymentMethod: string;
  status: SubscriptionContractStatus;
  active: boolean;
  startAt?: string;
  endAt?: string;
  updatedBy: string;
}

export interface ActivateSubscriptionContractRepositoryWhereDTO {
  app: string;
  subscriptionContract: string;
}

export interface ActivateSubscriptionContractRepositoryDTO {
  data: ActivateSubscriptionContractRepositoryDataDTO;
  where: ActivateSubscriptionContractRepositoryWhereDTO;
}
