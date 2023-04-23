import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveRecurringCommand } from '@/commands/implements/recurrings/remove-recurring.command';
import { RemoveRecurringDTO } from '@/dtos/recurrings/remove-recurring.dto';
import { RecurringModel } from '@/models/recurring.model';

@Injectable()
export class RemoveRecurringService
  implements IBaseService<RemoveRecurringDTO, Promise<RecurringModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveRecurringDTO): Promise<RecurringModel> {
    return await this.commandBus.execute(new RemoveRecurringCommand(data));
  }
}
