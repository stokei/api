import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateClassroomInstructorCommand } from '@/commands/implements/classroom-instructors/update-classroom-instructor.command';
import { UpdateClassroomInstructorDTO } from '@/dtos/classroom-instructors/update-classroom-instructor.dto';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

@Injectable()
export class UpdateClassroomInstructorService
  implements
    IBaseService<
      UpdateClassroomInstructorDTO,
      Promise<ClassroomInstructorModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateClassroomInstructorDTO
  ): Promise<ClassroomInstructorModel> {
    return await this.commandBus.execute(
      new UpdateClassroomInstructorCommand(data)
    );
  }
}
