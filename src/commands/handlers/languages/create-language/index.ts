import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateLanguageCommand } from '@/commands/implements/languages/create-language.command';
import {
  DataNotFoundException,
  LanguageNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateLanguageRepository } from '@/repositories/languages/create-language';

type CreateLanguageCommandKeys = keyof CreateLanguageCommand;

@CommandHandler(CreateLanguageCommand)
export class CreateLanguageCommandHandler
  implements ICommandHandler<CreateLanguageCommand>
{
  constructor(
    private readonly createLanguageRepository: CreateLanguageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateLanguageCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.id) {
      throw new ParamNotFoundException<CreateLanguageCommandKeys>('id');
    }

    const languageCreated = await this.createLanguageRepository.execute(data);
    if (!languageCreated) {
      throw new LanguageNotFoundException();
    }
    const languageModel = this.publisher.mergeObjectContext(languageCreated);
    languageModel.createdLanguage({
      createdBy: data.createdBy
    });
    languageModel.commit();

    return languageCreated;
  }

  private clearData(command: CreateLanguageCommand): CreateLanguageCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      icon: cleanValue(command?.icon),
      id: cleanValue(command?.id)
    });
  }
}
