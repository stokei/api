import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateLanguageCommand } from '@/commands/implements/languages/create-language.command';
import { CreateLanguageDTO } from '@/dtos/languages/create-language.dto';
import { LanguageModel } from '@/models/language.model';

@Injectable()
export class CreateLanguageService
  implements IBaseService<CreateLanguageDTO, Promise<LanguageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateLanguageDTO): Promise<LanguageModel> {
    return await this.commandBus.execute(new CreateLanguageCommand(data));
  }
}
