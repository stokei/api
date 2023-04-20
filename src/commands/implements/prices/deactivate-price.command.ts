import { ICommand } from '@nestjs/cqrs';

import { DeactivatePriceDTO } from '@/dtos/prices/deactivate-price.dto';

export class DeactivatePriceCommand implements ICommand, DeactivatePriceDTO {
  price: string;
  updatedBy: string;

  constructor(data: DeactivatePriceDTO) {
    this.price = data.price;
    this.updatedBy = data.updatedBy;
  }
}
