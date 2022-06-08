import { UpdateClassroomsTagCommand } from '@/commands/implements/classrooms-tags/update-classrooms-tag.command';
import { UpdateClassroomsTagDTO } from '@/dtos/classrooms-tags/update-classrooms-tag.dto';
import { ClassroomsTagModel } from '@/models/classrooms-tag.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateClassroomsTagService
  implements IBaseService<UpdateClassroomsTagDTO, Promise<ClassroomsTagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateClassroomsTagDTO): Promise<ClassroomsTagModel> {
    return await this.commandBus.execute(new UpdateClassroomsTagCommand(data));
  }
}
