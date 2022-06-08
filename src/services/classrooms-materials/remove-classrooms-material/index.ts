import { RemoveClassroomsMaterialCommand } from '@/commands/implements/classrooms-materials/remove-classrooms-material.command';
import { RemoveClassroomsMaterialDTO } from '@/dtos/classrooms-materials/remove-classrooms-material.dto';
import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveClassroomsMaterialService
  implements
    IBaseService<RemoveClassroomsMaterialDTO, Promise<ClassroomsMaterialModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveClassroomsMaterialDTO
  ): Promise<ClassroomsMaterialModel> {
    return await this.commandBus.execute(
      new RemoveClassroomsMaterialCommand(data)
    );
  }
}
