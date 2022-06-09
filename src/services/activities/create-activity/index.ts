import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateActivityCommand } from '@/commands/implements/activities/create-activity.command';
import { CreateActivityDTO } from '@/dtos/activities/create-activity.dto';
import { ActivityModel } from '@/models/activity.model';

@Injectable()
export class CreateActivityService
  implements IBaseService<CreateActivityDTO, Promise<ActivityModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateActivityDTO): Promise<ActivityModel> {
    return await this.commandBus.execute(new CreateActivityCommand(data));
  }
}
