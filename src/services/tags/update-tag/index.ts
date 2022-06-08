import { UpdateTagCommand } from '@/commands/implements/tags/update-tag.command';
import { UpdateTagDTO } from '@/dtos/tags/update-tag.dto';
import { TagModel } from '@/models/tag.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateTagService
  implements IBaseService<UpdateTagDTO, Promise<TagModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateTagDTO): Promise<TagModel> {
    return await this.commandBus.execute(new UpdateTagCommand(data));
  }
}
