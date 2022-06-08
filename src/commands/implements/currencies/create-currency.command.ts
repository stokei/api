import { ICommand } from '@nestjs/cqrs';
import { CreateCurrencyDTO } from '@/dtos/currencies/create-currency.dto';

export class CreateCurrencyCommand implements ICommand, CreateCurrencyDTO {
  name: string;
  parent: string;

  constructor(data: CreateCurrencyDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
