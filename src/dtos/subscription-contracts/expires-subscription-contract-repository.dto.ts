import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';

export interface ExpiresSubscriptionContractRepositoryDataDTO {
  status: SubscriptionContractStatus;
  active: boolean;
  startAt: string;
  endAt: string;
  updatedBy: string;
}

export interface ExpiresSubscriptionContractRepositoryWhereDTO {
  app: string;
  subscriptionContract: string;
}

export interface ExpiresSubscriptionContractRepositoryDTO {
  data: ExpiresSubscriptionContractRepositoryDataDTO;
  where: ExpiresSubscriptionContractRepositoryWhereDTO;
}
