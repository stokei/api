import { RemoveClassroomsInstructorCommand } from '@/commands/implements/classrooms-instructors/remove-classrooms-instructor.command';
import { RemoveClassroomsInstructorDTO } from '@/dtos/classrooms-instructors/remove-classrooms-instructor.dto';
import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveClassroomsInstructorService
  implements
    IBaseService<
      RemoveClassroomsInstructorDTO,
      Promise<ClassroomsInstructorModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveClassroomsInstructorDTO
  ): Promise<ClassroomsInstructorModel> {
    return await this.commandBus.execute(
      new RemoveClassroomsInstructorCommand(data)
    );
  }
}
