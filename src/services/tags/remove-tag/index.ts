import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveTagCommand } from '@/commands/implements/tags/remove-tag.command';
import { RemoveTagDTO } from '@/dtos/tags/remove-tag.dto';
import { TagModel } from '@/models/tag.model';

@Injectable()
export class RemoveTagService
  implements IBaseService<RemoveTagDTO, Promise<TagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveTagDTO): Promise<TagModel> {
    return await this.commandBus.execute(new RemoveTagCommand(data));
  }
}
