import { CreateClassroomsInstructorCommand } from '@/commands/implements/classrooms-instructors/create-classrooms-instructor.command';
import { CreateClassroomsInstructorDTO } from '@/dtos/classrooms-instructors/create-classrooms-instructor.dto';
import { ClassroomsInstructorModel } from '@/models/classrooms-instructor.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateClassroomsInstructorService
  implements
    IBaseService<
      CreateClassroomsInstructorDTO,
      Promise<ClassroomsInstructorModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateClassroomsInstructorDTO
  ): Promise<ClassroomsInstructorModel> {
    return await this.commandBus.execute(
      new CreateClassroomsInstructorCommand(data)
    );
  }
}
