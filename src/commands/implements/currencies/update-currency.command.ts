import { ICommand } from '@nestjs/cqrs';

import {
  UpdateCurrencyDataDTO,
  UpdateCurrencyDTO,
  UpdateCurrencyWhereDTO
} from '@/dtos/currencies/update-currency.dto';

export class UpdateCurrencyCommand implements ICommand, UpdateCurrencyDTO {
  data: UpdateCurrencyDataDTO;
  where: UpdateCurrencyWhereDTO;
  constructor(data: UpdateCurrencyDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
