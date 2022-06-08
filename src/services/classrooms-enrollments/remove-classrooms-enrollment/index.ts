import { RemoveClassroomsEnrollmentCommand } from '@/commands/implements/classrooms-enrollments/remove-classrooms-enrollment.command';
import { RemoveClassroomsEnrollmentDTO } from '@/dtos/classrooms-enrollments/remove-classrooms-enrollment.dto';
import { ClassroomsEnrollmentModel } from '@/models/classrooms-enrollment.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveClassroomsEnrollmentService
  implements
    IBaseService<
      RemoveClassroomsEnrollmentDTO,
      Promise<ClassroomsEnrollmentModel>
    >
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveClassroomsEnrollmentDTO
  ): Promise<ClassroomsEnrollmentModel> {
    return await this.commandBus.execute(
      new RemoveClassroomsEnrollmentCommand(data)
    );
  }
}
