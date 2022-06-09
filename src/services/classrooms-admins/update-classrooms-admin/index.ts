import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateClassroomsAdminCommand } from '@/commands/implements/classrooms-admins/update-classrooms-admin.command';
import { UpdateClassroomsAdminDTO } from '@/dtos/classrooms-admins/update-classrooms-admin.dto';
import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';

@Injectable()
export class UpdateClassroomsAdminService
  implements
    IBaseService<UpdateClassroomsAdminDTO, Promise<ClassroomsAdminModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateClassroomsAdminDTO): Promise<ClassroomsAdminModel> {
    return await this.commandBus.execute(
      new UpdateClassroomsAdminCommand(data)
    );
  }
}
