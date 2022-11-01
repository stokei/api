import { ICommand } from '@nestjs/cqrs';

import { AddItemToAppSubscriptionContractDTO } from '@/dtos/apps/add-item-to-app-subscription-contract.dto';

export class AddItemToAppSubscriptionContractCommand
  implements ICommand, AddItemToAppSubscriptionContractDTO
{
  price: string;
  quantity: number;
  app: string;
  createdBy: string;

  constructor(data: AddItemToAppSubscriptionContractDTO) {
    this.price = data.price;
    this.quantity = data.quantity;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
