import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveActivityCommand } from '@/commands/implements/activities/remove-activity.command';
import { RemoveActivityDTO } from '@/dtos/activities/remove-activity.dto';
import { ActivityModel } from '@/models/activity.model';

@Injectable()
export class RemoveActivityService
  implements IBaseService<RemoveActivityDTO, Promise<ActivityModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveActivityDTO): Promise<ActivityModel> {
    return await this.commandBus.execute(new RemoveActivityCommand(data));
  }
}
