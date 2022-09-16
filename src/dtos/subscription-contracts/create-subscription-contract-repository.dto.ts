import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';

import { CreateSubscriptionContractDTO } from './create-subscription-contract.dto';

export interface CreateSubscriptionContractRepositoryDTO
  extends CreateSubscriptionContractDTO {
  status: SubscriptionContractStatus;
  active: boolean;
  startAt?: string;
  endAt?: string;
}
