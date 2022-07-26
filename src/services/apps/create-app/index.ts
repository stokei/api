import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAppCommand } from '@/commands/implements/apps/create-app.command';
import { CreateAppDTO } from '@/dtos/apps/create-app.dto';
import { AppModel } from '@/models/app.model';

@Injectable()
export class CreateAppService
  implements IBaseService<CreateAppDTO, Promise<AppModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAppDTO): Promise<AppModel> {
    return await this.commandBus.execute(new CreateAppCommand(data));
  }
}
