import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateClassroomsMaterialCommand } from '@/commands/implements/classrooms-materials/create-classrooms-material.command';
import { CreateClassroomsMaterialDTO } from '@/dtos/classrooms-materials/create-classrooms-material.dto';
import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';

@Injectable()
export class CreateClassroomsMaterialService
  implements
    IBaseService<CreateClassroomsMaterialDTO, Promise<ClassroomsMaterialModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateClassroomsMaterialDTO
  ): Promise<ClassroomsMaterialModel> {
    return await this.commandBus.execute(
      new CreateClassroomsMaterialCommand(data)
    );
  }
}
