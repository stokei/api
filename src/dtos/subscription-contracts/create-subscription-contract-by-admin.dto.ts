import { IntervalType } from '@/enums/interval-type.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';
import { UsageType } from '@/enums/usage-type.enum';

export class CreateSubscriptionContractByAdminItemRecurringDTO {
  usageType: UsageType;
  intervalCount: number;
  interval: IntervalType;
}

export interface CreateSubscriptionContractByAdminItemDTO {
  quantity: number;
  product: string;
  orderProduct?: string;
  recurring?: CreateSubscriptionContractByAdminItemRecurringDTO;
}

export interface CreateSubscriptionContractByAdminDTO {
  app: string;
  parent: string;
  startAt?: string;
  endAt?: string;
  items?: CreateSubscriptionContractByAdminItemDTO[];
  type: SubscriptionContractType;
  createdBy: string;
}
