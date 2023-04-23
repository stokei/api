import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateRecurringCommand } from '@/commands/implements/recurrings/create-recurring.command';
import { CreateRecurringDTO } from '@/dtos/recurrings/create-recurring.dto';
import { RecurringModel } from '@/models/recurring.model';

@Injectable()
export class CreateRecurringService
  implements IBaseService<CreateRecurringDTO, Promise<RecurringModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateRecurringDTO): Promise<RecurringModel> {
    return await this.commandBus.execute(new CreateRecurringCommand(data));
  }
}
