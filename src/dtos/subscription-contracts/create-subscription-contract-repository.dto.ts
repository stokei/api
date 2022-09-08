import { SubscriptionContractStatus } from '@/enums/subscription-contract-status.enum';

import { CreateSubscriptionContractDTO } from './create-subscription-contract.dto';

export interface CreateSubscriptionContractRepositoryDTO
  extends Omit<
    CreateSubscriptionContractDTO,
    'recurringIntervalCount' | 'recurringIntervalType'
  > {
  status: SubscriptionContractStatus;
  startAt?: string;
  endAt?: string;
}
