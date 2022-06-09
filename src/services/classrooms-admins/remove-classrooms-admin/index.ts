import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveClassroomsAdminCommand } from '@/commands/implements/classrooms-admins/remove-classrooms-admin.command';
import { RemoveClassroomsAdminDTO } from '@/dtos/classrooms-admins/remove-classrooms-admin.dto';
import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';

@Injectable()
export class RemoveClassroomsAdminService
  implements
    IBaseService<RemoveClassroomsAdminDTO, Promise<ClassroomsAdminModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveClassroomsAdminDTO): Promise<ClassroomsAdminModel> {
    return await this.commandBus.execute(
      new RemoveClassroomsAdminCommand(data)
    );
  }
}
