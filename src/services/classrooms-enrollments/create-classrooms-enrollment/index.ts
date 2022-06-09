import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateClassroomsEnrollmentCommand } from '@/commands/implements/classrooms-enrollments/create-classrooms-enrollment.command';
import { CreateClassroomsEnrollmentDTO } from '@/dtos/classrooms-enrollments/create-classrooms-enrollment.dto';
import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';

@Injectable()
export class CreateClassroomsEnrollmentService
  implements
    IBaseService<
      CreateClassroomsEnrollmentDTO,
      Promise<ClassroomsEnrollmentModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateClassroomsEnrollmentDTO
  ): Promise<ClassroomsEnrollmentModel> {
    return await this.commandBus.execute(
      new CreateClassroomsEnrollmentCommand(data)
    );
  }
}
