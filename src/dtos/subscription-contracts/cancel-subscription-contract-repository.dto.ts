import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';

export interface CancelSubscriptionContractRepositoryDataDTO {
  status: SubscriptionContractStatus;
  active: boolean;
  endAt: string;
  canceledAt: string;
  updatedBy: string;
}

export interface CancelSubscriptionContractRepositoryWhereDTO {
  app: string;
  subscriptionContract: string;
}

export interface CancelSubscriptionContractRepositoryDTO {
  data: CancelSubscriptionContractRepositoryDataDTO;
  where: CancelSubscriptionContractRepositoryWhereDTO;
}