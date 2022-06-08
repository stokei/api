import { RemoveActivitiesActionCommand } from '@/commands/implements/activities-actions/remove-activities-action.command';
import { RemoveActivitiesActionDTO } from '@/dtos/activities-actions/remove-activities-action.dto';
import { ActivitiesActionModel } from '@/models/activities-action.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveActivitiesActionService
  implements
    IBaseService<RemoveActivitiesActionDTO, Promise<ActivitiesActionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveActivitiesActionDTO
  ): Promise<ActivitiesActionModel> {
    return await this.commandBus.execute(
      new RemoveActivitiesActionCommand(data)
    );
  }
}
