import { ICommand } from '@nestjs/cqrs';

import { CreateSubscriptionContractDTO } from '@/dtos/subscription-contracts/create-subscription-contract.dto';
import { RecurringType } from '@/enums/recurring-type.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export class CreateSubscriptionContractCommand
  implements ICommand, CreateSubscriptionContractDTO
{
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

  constructor(data: CreateSubscriptionContractDTO) {
    this.parent = data.parent;
    this.product = data.product;
    this.recurringIntervalCount = data.recurringIntervalCount;
    this.recurringIntervalType = data.recurringIntervalType;
    this.currency = data.currency;
    this.totalAmount = data.totalAmount;
    this.subtotalAmount = data.subtotalAmount;
    this.stripeCheckoutSession = data.stripeCheckoutSession;
    this.stripeSubscription = data.stripeSubscription;
    this.type = data.type;
    this.automaticRenew = data.automaticRenew;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
