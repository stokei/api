import { ICommand } from '@nestjs/cqrs';

import {
  UpdateCheckoutsCurrencyDataDTO,
  UpdateCheckoutsCurrencyDTO,
  UpdateCheckoutsCurrencyWhereDTO
} from '@/dtos/checkouts-currencies/update-checkouts-currency.dto';

export class UpdateCheckoutsCurrencyCommand
  implements ICommand, UpdateCheckoutsCurrencyDTO
{
  data: UpdateCheckoutsCurrencyDataDTO;
  where: UpdateCheckoutsCurrencyWhereDTO;
  constructor(data: UpdateCheckoutsCurrencyDTO) {
    this.data = data.data;
    this.where = data.where;
  }
}
