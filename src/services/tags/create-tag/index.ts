import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateTagCommand } from '@/commands/implements/tags/create-tag.command';
import { CreateTagDTO } from '@/dtos/tags/create-tag.dto';
import { TagModel } from '@/models/tag.model';

@Injectable()
export class CreateTagService
  implements IBaseService<CreateTagDTO, Promise<TagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateTagDTO): Promise<TagModel> {
    return await this.commandBus.execute(new CreateTagCommand(data));
  }
}
