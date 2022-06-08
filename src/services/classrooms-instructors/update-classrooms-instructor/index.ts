import { UpdateClassroomsInstructorCommand } from '@/commands/implements/classrooms-instructors/update-classrooms-instructor.command';
import { UpdateClassroomsInstructorDTO } from '@/dtos/classrooms-instructors/update-classrooms-instructor.dto';
import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateClassroomsInstructorService
  implements
    IBaseService<
      UpdateClassroomsInstructorDTO,
      Promise<ClassroomsInstructorModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateClassroomsInstructorDTO
  ): Promise<ClassroomsInstructorModel> {
    return await this.commandBus.execute(
      new UpdateClassroomsInstructorCommand(data)
    );
  }
}
