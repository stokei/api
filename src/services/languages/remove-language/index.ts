import { RemoveLanguageCommand } from '@/commands/implements/languages/remove-language.command';
import { RemoveLanguageDTO } from '@/dtos/languages/remove-language.dto';
import { LanguageModel } from '@/models/language.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveLanguageService
  implements IBaseService<RemoveLanguageDTO, Promise<LanguageModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveLanguageDTO): Promise<LanguageModel> {
    return await this.commandBus.execute(new RemoveLanguageCommand(data));
  }
}
