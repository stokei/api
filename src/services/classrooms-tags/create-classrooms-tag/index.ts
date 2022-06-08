import { CreateClassroomsTagCommand } from '@/commands/implements/classrooms-tags/create-classrooms-tag.command';
import { CreateClassroomsTagDTO } from '@/dtos/classrooms-tags/create-classrooms-tag.dto';
import { ClassroomsTagModel } from '@/models/classrooms-tag.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateClassroomsTagService
  implements IBaseService<CreateClassroomsTagDTO, Promise<ClassroomsTagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateClassroomsTagDTO): Promise<ClassroomsTagModel> {
    return await this.commandBus.execute(new CreateClassroomsTagCommand(data));
  }
}
