import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateActivitiesActionCommand } from '@/commands/implements/activities-actions/update-activities-action.command';
import { UpdateActivitiesActionDTO } from '@/dtos/activities-actions/update-activities-action.dto';
import { ActivitiesActionModel } from '@/models/activities-action.model';

@Injectable()
export class UpdateActivitiesActionService
  implements
    IBaseService<UpdateActivitiesActionDTO, Promise<ActivitiesActionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateActivitiesActionDTO
  ): Promise<ActivitiesActionModel> {
    return await this.commandBus.execute(
      new UpdateActivitiesActionCommand(data)
    );
  }
}
