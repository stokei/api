import { ICommand } from '@nestjs/cqrs';

import {
  CreateSubscriptionContractByAdminDTO,
  CreateSubscriptionContractByAdminItemDTO
} from '@/dtos/subscription-contracts/create-subscription-contract-by-admin.dto';
import { SubscriptionContractType } from '@/enums/subscription-contract-type.enum';

export class CreateSubscriptionContractByAdminCommand
  implements ICommand, CreateSubscriptionContractByAdminDTO
{
  app: string;
  parent: string;
  startAt?: string;
  endAt?: string;
  items?: CreateSubscriptionContractByAdminItemDTO[];
  type: SubscriptionContractType;
  createdBy: string;

  constructor(data: CreateSubscriptionContractByAdminDTO) {
    this.app = data.app;
    this.parent = data.parent;
    this.startAt = data.startAt;
    this.endAt = data.endAt;
    this.items = data.items;
    this.type = data.type;
    this.createdBy = data.createdBy;
  }
}
