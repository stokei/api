import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateRecurringCommand } from '@/commands/implements/recurrings/update-recurring.command';
import { UpdateRecurringDTO } from '@/dtos/recurrings/update-recurring.dto';
import { RecurringModel } from '@/models/recurring.model';

@Injectable()
export class UpdateRecurringService
  implements IBaseService<UpdateRecurringDTO, Promise<RecurringModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateRecurringDTO): Promise<RecurringModel> {
    return await this.commandBus.execute(new UpdateRecurringCommand(data));
  }
}
