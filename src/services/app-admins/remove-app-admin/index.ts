import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveAppAdminCommand } from '@/commands/implements/app-admins/remove-app-admin.command';
import { RemoveAppAdminDTO } from '@/dtos/app-admins/remove-app-admin.dto';
import { AppAdminModel } from '@/models/app-admin.model';

@Injectable()
export class RemoveAppAdminService
  implements IBaseService<RemoveAppAdminDTO, Promise<AppAdminModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveAppAdminDTO): Promise<AppAdminModel> {
    return await this.commandBus.execute(new RemoveAppAdminCommand(data));
  }
}
