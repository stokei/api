import { UpdateActivityCommand } from '@/commands/implements/activities/update-activity.command';
import { UpdateActivityDTO } from '@/dtos/activities/update-activity.dto';
import { ActivityModel } from '@/models/activity.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateActivityService
  implements IBaseService<UpdateActivityDTO, Promise<ActivityModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateActivityDTO): Promise<ActivityModel> {
    return await this.commandBus.execute(new UpdateActivityCommand(data));
  }
}
