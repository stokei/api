import { RecurringType } from '@/enums/recurring-type.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export interface CreateSubscriptionContractDTO {
  parent: string;
  product: string;
  recurringIntervalCount?: number;
  recurringIntervalType?: RecurringType;
  currency: string;
  totalAmount: number;
  subtotalAmount: number;
  stripeCheckoutSession: string;
  stripeSubscription: string;
  type: SubscriptionContractType;
  automaticRenew?: boolean;
  app: string;
  createdBy: string;
}
