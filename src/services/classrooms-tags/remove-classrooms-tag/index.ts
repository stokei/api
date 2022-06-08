import { RemoveClassroomsTagCommand } from '@/commands/implements/classrooms-tags/remove-classrooms-tag.command';
import { RemoveClassroomsTagDTO } from '@/dtos/classrooms-tags/remove-classrooms-tag.dto';
import { ClassroomsTagModel } from '@/models/classrooms-tag.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveClassroomsTagService
  implements IBaseService<RemoveClassroomsTagDTO, Promise<ClassroomsTagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveClassroomsTagDTO): Promise<ClassroomsTagModel> {
    return await this.commandBus.execute(new RemoveClassroomsTagCommand(data));
  }
}
