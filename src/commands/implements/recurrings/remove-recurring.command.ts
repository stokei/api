import { ICommand } from '@nestjs/cqrs';

import {
  RemoveRecurringDTO,
  RemoveRecurringWhereDTO
} from '@/dtos/recurrings/remove-recurring.dto';

export class RemoveRecurringCommand implements ICommand, RemoveRecurringDTO {
  where: RemoveRecurringWhereDTO;
  constructor(data: RemoveRecurringDTO) {
    this.where = data.where;
  }
}
