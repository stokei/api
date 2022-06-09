import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateClassroomsEnrollmentCommand } from '@/commands/implements/classrooms-enrollments/update-classrooms-enrollment.command';
import { UpdateClassroomsEnrollmentDTO } from '@/dtos/classrooms-enrollments/update-classrooms-enrollment.dto';
import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';

@Injectable()
export class UpdateClassroomsEnrollmentService
  implements
    IBaseService<
      UpdateClassroomsEnrollmentDTO,
      Promise<ClassroomsEnrollmentModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateClassroomsEnrollmentDTO
  ): Promise<ClassroomsEnrollmentModel> {
    return await this.commandBus.execute(
      new UpdateClassroomsEnrollmentCommand(data)
    );
  }
}
