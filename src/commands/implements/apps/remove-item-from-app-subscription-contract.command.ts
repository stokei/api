import { ICommand } from '@nestjs/cqrs';

import { RemoveItemFromAppSubscriptionContractDTO } from '@/dtos/apps/remove-item-from-app-subscription-contract.dto';

export class RemoveItemFromAppSubscriptionContractCommand
  implements ICommand, RemoveItemFromAppSubscriptionContractDTO
{
  quantity: number;
  price: string;
  app: string;
  removedBy: string;

  constructor(data: RemoveItemFromAppSubscriptionContractDTO) {
    this.quantity = data.quantity;
    this.price = data.price;
    this.app = data.app;
    this.removedBy = data.removedBy;
  }
}
