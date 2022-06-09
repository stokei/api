import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveKeywordCommand } from '@/commands/implements/keywords/remove-keyword.command';
import { RemoveKeywordDTO } from '@/dtos/keywords/remove-keyword.dto';
import { KeywordModel } from '@/models/keyword.model';

@Injectable()
export class RemoveKeywordService
  implements IBaseService<RemoveKeywordDTO, Promise<KeywordModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveKeywordDTO): Promise<KeywordModel> {
    return await this.commandBus.execute(new RemoveKeywordCommand(data));
  }
}
