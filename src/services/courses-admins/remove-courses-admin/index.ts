import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveCoursesAdminCommand } from '@/commands/implements/courses-admins/remove-courses-admin.command';
import { RemoveCoursesAdminDTO } from '@/dtos/courses-admins/remove-courses-admin.dto';
import { CoursesAdminModel } from '@/models/courses-admin.model';

@Injectable()
export class RemoveCoursesAdminService
  implements IBaseService<RemoveCoursesAdminDTO, Promise<CoursesAdminModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCoursesAdminDTO): Promise<CoursesAdminModel> {
    return await this.commandBus.execute(new RemoveCoursesAdminCommand(data));
  }
}
