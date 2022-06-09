import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateActivitiesActionCommand } from '@/commands/implements/activities-actions/create-activities-action.command';
import { CreateActivitiesActionDTO } from '@/dtos/activities-actions/create-activities-action.dto';
import { ActivitiesActionModel } from '@/models/activities-action.model';

@Injectable()
export class CreateActivitiesActionService
  implements
    IBaseService<CreateActivitiesActionDTO, Promise<ActivitiesActionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateActivitiesActionDTO
  ): Promise<ActivitiesActionModel> {
    return await this.commandBus.execute(
      new CreateActivitiesActionCommand(data)
    );
  }
}
