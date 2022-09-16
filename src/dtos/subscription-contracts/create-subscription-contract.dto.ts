import { RecurringType } from '@/enums/recurring-type.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export interface CreateSubscriptionContractDTO {
  parent: string;
  product: string;
  invoiceProduct: string;
  invoicePrice: string;
  recurringIntervalCount?: number;
  recurringIntervalType?: RecurringType;
  stripeSubscription: string;
  type: SubscriptionContractType;
  automaticRenew?: boolean;
  app: string;
  createdBy: string;
}
