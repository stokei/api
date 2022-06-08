import { CreateKeywordCommand } from '@/commands/implements/keywords/create-keyword.command';
import { CreateKeywordDTO } from '@/dtos/keywords/create-keyword.dto';
import { KeywordModel } from '@/models/keyword.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateKeywordService
  implements IBaseService<CreateKeywordDTO, Promise<KeywordModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateKeywordDTO): Promise<KeywordModel> {
    return await this.commandBus.execute(new CreateKeywordCommand(data));
  }
}
