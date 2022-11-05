import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveAppInstructorCommand } from '@/commands/implements/app-instructors/remove-app-instructor.command';
import { RemoveAppInstructorDTO } from '@/dtos/app-instructors/remove-app-instructor.dto';
import { AppInstructorModel } from '@/models/app-instructor.model';

@Injectable()
export class RemoveAppInstructorService
  implements IBaseService<RemoveAppInstructorDTO, Promise<AppInstructorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveAppInstructorDTO): Promise<AppInstructorModel> {
    return await this.commandBus.execute(new RemoveAppInstructorCommand(data));
  }
}
