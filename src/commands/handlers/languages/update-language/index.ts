import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateLanguageCommand } from '@/commands/implements/languages/update-language.command';
import {
  DataNotFoundException,
  LanguageNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindLanguageByIdRepository } from '@/repositories/languages/find-language-by-id';
import { UpdateLanguageRepository } from '@/repositories/languages/update-language';

@CommandHandler(UpdateLanguageCommand)
export class UpdateLanguageCommandHandler
  implements ICommandHandler<UpdateLanguageCommand>
{
  constructor(
    private readonly findLanguageByIdRepository: FindLanguageByIdRepository,
    private readonly updateLanguageRepository: UpdateLanguageRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateLanguageCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const languageId = splitServiceId(data.where?.language)?.id;
    if (!languageId) {
      throw new ParamNotFoundException('languageId');
    }

    const language = await this.findLanguageByIdRepository.execute(languageId);
    if (!language) {
      throw new LanguageNotFoundException();
    }

    const updated = await this.updateLanguageRepository.execute({
      ...data,
      where: {
        ...data.where,
        language: languageId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const languageUpdated = await this.findLanguageByIdRepository.execute(
      languageId
    );
    if (!languageUpdated) {
      throw new LanguageNotFoundException();
    }
    const languageModel = this.publisher.mergeObjectContext(languageUpdated);
    languageModel.updatedLanguage({
      updatedBy: data.data.updatedBy
    });
    languageModel.commit();

    return languageUpdated;
  }

  private clearData(command: UpdateLanguageCommand): UpdateLanguageCommand {
    return cleanObject({
      where: cleanObject({
        language: cleanValue(command?.where?.language)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        icon: cleanValue(command?.data?.icon),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
