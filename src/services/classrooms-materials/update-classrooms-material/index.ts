import { UpdateClassroomsMaterialCommand } from '@/commands/implements/classrooms-materials/update-classrooms-material.command';
import { UpdateClassroomsMaterialDTO } from '@/dtos/classrooms-materials/update-classrooms-material.dto';
import { ClassroomsMaterialModel } from '@/models/classrooms-material.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateClassroomsMaterialService
  implements
    IBaseService<UpdateClassroomsMaterialDTO, Promise<ClassroomsMaterialModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateClassroomsMaterialDTO
  ): Promise<ClassroomsMaterialModel> {
    return await this.commandBus.execute(
      new UpdateClassroomsMaterialCommand(data)
    );
  }
}
