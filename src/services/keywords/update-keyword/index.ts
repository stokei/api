import { UpdateKeywordCommand } from '@/commands/implements/keywords/update-keyword.command';
import { UpdateKeywordDTO } from '@/dtos/keywords/update-keyword.dto';
import { KeywordModel } from '@/models/keyword.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateKeywordService
  implements IBaseService<UpdateKeywordDTO, Promise<KeywordModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateKeywordDTO): Promise<KeywordModel> {
    return await this.commandBus.execute(new UpdateKeywordCommand(data));
  }
}
