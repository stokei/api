import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateClassroomInstructorCommand } from '@/commands/implements/classroom-instructors/create-classroom-instructor.command';
import { CreateClassroomInstructorDTO } from '@/dtos/classroom-instructors/create-classroom-instructor.dto';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

@Injectable()
export class CreateClassroomInstructorService
  implements
    IBaseService<
      CreateClassroomInstructorDTO,
      Promise<ClassroomInstructorModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateClassroomInstructorDTO
  ): Promise<ClassroomInstructorModel> {
    return await this.commandBus.execute(
      new CreateClassroomInstructorCommand(data)
    );
  }
}
