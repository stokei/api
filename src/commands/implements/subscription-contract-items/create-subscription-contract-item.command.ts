import { ICommand } from '@nestjs/cqrs';

import { CreateSubscriptionContractItemDTO } from '@/dtos/subscription-contract-items/create-subscription-contract-item.dto';

export class CreateSubscriptionContractItemCommand
  implements ICommand, CreateSubscriptionContractItemDTO
{
  app: string;
  parent: string;
  product: string;
  quantity: number;
  price: string;
  orderProduct?: string;
  stripeSubscriptionItem?: string;
  recurring?: string;
  createdByAdmin: boolean;
  createdBy: string;

  constructor(data: CreateSubscriptionContractItemDTO) {
    this.app = data.app;
    this.parent = data.parent;
    this.product = data.product;
    this.quantity = data.quantity;
    this.price = data.price;
    this.orderProduct = data.orderProduct;
    this.stripeSubscriptionItem = data.stripeSubscriptionItem;
    this.createdByAdmin = data.createdByAdmin;
    this.recurring = data.recurring;
    this.createdBy = data.createdBy;
  }
}
