import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveLanguageCommand } from '@/commands/implements/languages/remove-language.command';
import {
  DataNotFoundException,
  LanguageNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindLanguageByIdRepository } from '@/repositories/languages/find-language-by-id';
import { RemoveLanguageRepository } from '@/repositories/languages/remove-language';

type RemoveLanguageCommandKeys = keyof RemoveLanguageCommand;

@CommandHandler(RemoveLanguageCommand)
export class RemoveLanguageCommandHandler
  implements ICommandHandler<RemoveLanguageCommand>
{
  constructor(
    private readonly findLanguageByIdRepository: FindLanguageByIdRepository,
    private readonly removeLanguageRepository: RemoveLanguageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveLanguageCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const languageId = splitServiceId(data.where?.languageId)?.id;
    if (!languageId) {
      throw new ParamNotFoundException('languageId');
    }

    const language = await this.findLanguageByIdRepository.execute(languageId);
    if (!language) {
      throw new LanguageNotFoundException();
    }

    const removed = await this.removeLanguageRepository.execute({
      where: {
        ...data.where,
        languageId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const languageModel = this.publisher.mergeObjectContext(language);
    languageModel.removedLanguage({
      removedBy: data.where.removedBy
    });
    languageModel.commit();

    return language;
  }

  private clearData(command: RemoveLanguageCommand): RemoveLanguageCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        languageId: cleanValue(command?.where?.languageId)
      })
    });
  }
}
