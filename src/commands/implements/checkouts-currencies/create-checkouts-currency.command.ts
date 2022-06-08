import { ICommand } from '@nestjs/cqrs';
import { CreateCheckoutsCurrencyDTO } from '@/dtos/checkouts-currencies/create-checkouts-currency.dto';

export class CreateCheckoutsCurrencyCommand
  implements ICommand, CreateCheckoutsCurrencyDTO
{
  name: string;
  parent: string;

  constructor(data: CreateCheckoutsCurrencyDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
