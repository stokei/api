import { ICommand } from '@nestjs/cqrs';

import {
  RemoveCurrencyDTO,
  RemoveCurrencyWhereDTO
} from '@/dtos/currencies/remove-currency.dto';

export class RemoveCurrencyCommand implements ICommand, RemoveCurrencyDTO {
  where: RemoveCurrencyWhereDTO;
  constructor(data: RemoveCurrencyDTO) {
    this.where = data.where;
  }
}
