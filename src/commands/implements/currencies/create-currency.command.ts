import { ICommand } from '@nestjs/cqrs';

import { CreateCurrencyDTO } from '@/dtos/currencies/create-currency.dto';

export class CreateCurrencyCommand implements ICommand, CreateCurrencyDTO {
  id: string;
  name: string;
  symbol: string;
  minorUnit: number;
  createdBy: string;

  constructor(data: CreateCurrencyDTO) {
    this.id = data.id;
    this.name = data.name;
    this.symbol = data.symbol;
    this.minorUnit = data.minorUnit;
    this.createdBy = data.createdBy;
  }
}
