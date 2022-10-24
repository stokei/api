import { IntervalType } from '@/enums/interval-type.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export interface CreateSubscriptionContractDTO {
  parent: string;
  product: string;
  invoiceProduct: string;
  invoicePrice: string;
  recurringIntervalCount?: number;
  recurringIntervalType?: IntervalType;
  stripeSubscription: string;
  type: SubscriptionContractType;
  automaticRenew?: boolean;
  app: string;
  createdBy: string;
}
