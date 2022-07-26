import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateAppCommand } from '@/commands/implements/apps/update-app.command';
import { UpdateAppDTO } from '@/dtos/apps/update-app.dto';
import { AppModel } from '@/models/app.model';

@Injectable()
export class UpdateAppService
  implements IBaseService<UpdateAppDTO, Promise<AppModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateAppDTO): Promise<AppModel> {
    return await this.commandBus.execute(new UpdateAppCommand(data));
  }
}
