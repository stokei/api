import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateCoursesAdminCommand } from '@/commands/implements/courses-admins/update-courses-admin.command';
import { UpdateCoursesAdminDTO } from '@/dtos/courses-admins/update-courses-admin.dto';
import { CoursesAdminModel } from '@/models/courses-admin.model';

@Injectable()
export class UpdateCoursesAdminService
  implements IBaseService<UpdateCoursesAdminDTO, Promise<CoursesAdminModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCoursesAdminDTO): Promise<CoursesAdminModel> {
    return await this.commandBus.execute(new UpdateCoursesAdminCommand(data));
  }
}
