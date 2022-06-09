import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateLanguageCommand } from '@/commands/implements/languages/update-language.command';
import { UpdateLanguageDTO } from '@/dtos/languages/update-language.dto';
import { LanguageModel } from '@/models/language.model';

@Injectable()
export class UpdateLanguageService
  implements IBaseService<UpdateLanguageDTO, Promise<LanguageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateLanguageDTO): Promise<LanguageModel> {
    return await this.commandBus.execute(new UpdateLanguageCommand(data));
  }
}
