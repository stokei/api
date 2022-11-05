import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAppInstructorCommand } from '@/commands/implements/app-instructors/create-app-instructor.command';
import { CreateAppInstructorDTO } from '@/dtos/app-instructors/create-app-instructor.dto';
import { AppInstructorModel } from '@/models/app-instructor.model';

@Injectable()
export class CreateAppInstructorService
  implements IBaseService<CreateAppInstructorDTO, Promise<AppInstructorModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAppInstructorDTO): Promise<AppInstructorModel> {
    return await this.commandBus.execute(new CreateAppInstructorCommand(data));
  }
}
