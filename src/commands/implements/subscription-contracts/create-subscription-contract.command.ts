import { ICommand } from '@nestjs/cqrs';

import { CreateSubscriptionContractDTO } from '@/dtos/subscription-contracts/create-subscription-contract.dto';
import { RecurringType } from '@/enums/recurring-type.enum';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export class CreateSubscriptionContractCommand
  implements ICommand, CreateSubscriptionContractDTO
{
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

  constructor(data: CreateSubscriptionContractDTO) {
    this.parent = data.parent;
    this.product = data.product;
    this.invoiceProduct = data.invoiceProduct;
    this.invoicePrice = data.invoicePrice;
    this.recurringIntervalCount = data.recurringIntervalCount;
    this.recurringIntervalType = data.recurringIntervalType;
    this.stripeSubscription = data.stripeSubscription;
    this.type = data.type;
    this.automaticRenew = data.automaticRenew;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
