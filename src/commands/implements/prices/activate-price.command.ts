import { ICommand } from '@nestjs/cqrs';

import { ActivatePriceDTO } from '@/dtos/prices/activate-price.dto';

export class ActivatePriceCommand implements ICommand, ActivatePriceDTO {
  price: string;
  updatedBy: string;

  constructor(data: ActivatePriceDTO) {
    this.price = data.price;
    this.updatedBy = data.updatedBy;
  }
}
