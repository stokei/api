import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAppAdminCommand } from '@/commands/implements/app-admins/create-app-admin.command';
import { CreateAppAdminDTO } from '@/dtos/app-admins/create-app-admin.dto';
import { AppAdminModel } from '@/models/app-admin.model';

@Injectable()
export class CreateAppAdminService
  implements IBaseService<CreateAppAdminDTO, Promise<AppAdminModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAppAdminDTO): Promise<AppAdminModel> {
    return await this.commandBus.execute(new CreateAppAdminCommand(data));
  }
}
