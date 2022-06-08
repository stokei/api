import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateLanguageCommand } from '@/commands/implements/languages/create-language.command';
import {
  LanguageNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateLanguageRepository } from '@/repositories/languages/create-language';
import { cleanObject, cleanValue } from '@stokei/nestjs';

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
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateLanguageCommandKeys>('parent');
    }

    const languageCreated = await this.createLanguageRepository.execute(data);
    if (!languageCreated) {
      throw new LanguageNotFoundException();
    }
    const languageModel = this.publisher.mergeObjectContext(languageCreated);
    languageModel.createdLanguage();
    languageModel.commit();

    return languageCreated;
  }

  private clearData(command: CreateLanguageCommand): CreateLanguageCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
