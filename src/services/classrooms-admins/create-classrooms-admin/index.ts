import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateClassroomsAdminCommand } from '@/commands/implements/classrooms-admins/create-classrooms-admin.command';
import { CreateClassroomsAdminDTO } from '@/dtos/classrooms-admins/create-classrooms-admin.dto';
import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';

@Injectable()
export class CreateClassroomsAdminService
  implements
    IBaseService<CreateClassroomsAdminDTO, Promise<ClassroomsAdminModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateClassroomsAdminDTO): Promise<ClassroomsAdminModel> {
    return await this.commandBus.execute(
      new CreateClassroomsAdminCommand(data)
    );
  }
}
