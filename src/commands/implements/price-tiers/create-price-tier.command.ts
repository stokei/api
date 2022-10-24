import { ICommand } from '@nestjs/cqrs';

import { CreatePriceTierDTO } from '@/dtos/price-tiers/create-price-tier.dto';

export class CreatePriceTierCommand implements ICommand, CreatePriceTierDTO {
  app: string;
  parent: string;
  amount: number;
  upTo?: number;
  infinite: boolean;
  createdBy: string;

  constructor(data: CreatePriceTierDTO) {
    this.app = data.app;
    this.parent = data.parent;
    this.amount = data.amount;
    this.upTo = data.upTo;
    this.infinite = data.infinite;
    this.createdBy = data.createdBy;
  }
}
