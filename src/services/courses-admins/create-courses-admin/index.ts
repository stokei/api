import { CreateCoursesAdminCommand } from '@/commands/implements/courses-admins/create-courses-admin.command';
import { CreateCoursesAdminDTO } from '@/dtos/courses-admins/create-courses-admin.dto';
import { CoursesAdminModel } from '@/models/courses-admin.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateCoursesAdminService
  implements IBaseService<CreateCoursesAdminDTO, Promise<CoursesAdminModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCoursesAdminDTO): Promise<CoursesAdminModel> {
    return await this.commandBus.execute(new CreateCoursesAdminCommand(data));
  }
}
