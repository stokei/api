import { ICommand } from '@nestjs/cqrs';

import {
  RemoveCheckoutsCurrencyDTO,
  RemoveCheckoutsCurrencyWhereDTO
} from '@/dtos/checkouts-currencies/remove-checkouts-currency.dto';

export class RemoveCheckoutsCurrencyCommand
  implements ICommand, RemoveCheckoutsCurrencyDTO
{
  where: RemoveCheckoutsCurrencyWhereDTO;
  constructor(data: RemoveCheckoutsCurrencyDTO) {
    this.where = data.where;
  }
}
