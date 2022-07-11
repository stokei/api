import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveClassroomInstructorCommand } from '@/commands/implements/classroom-instructors/remove-classroom-instructor.command';
import { RemoveClassroomInstructorDTO } from '@/dtos/classroom-instructors/remove-classroom-instructor.dto';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

@Injectable()
export class RemoveClassroomInstructorService
  implements
    IBaseService<
      RemoveClassroomInstructorDTO,
      Promise<ClassroomInstructorModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveClassroomInstructorDTO
  ): Promise<ClassroomInstructorModel> {
    return await this.commandBus.execute(
      new RemoveClassroomInstructorCommand(data)
    );
  }
}
