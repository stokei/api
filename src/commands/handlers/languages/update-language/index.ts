import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateLanguageCommand } from '@/commands/implements/languages/update-language.command';
import {
  LanguageNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindLanguageByIdRepository } from '@/repositories/languages/find-language-by-id';
import { UpdateLanguageRepository } from '@/repositories/languages/update-language';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateLanguageCommandKeys = keyof UpdateLanguageCommand;

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
    const languageId = splitServiceId(data.where?.languageId)?.id;
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
        languageId
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
    languageModel.updatedLanguage();
    languageModel.commit();

    return languageUpdated;
  }

  private clearData(command: UpdateLanguageCommand): UpdateLanguageCommand {
    return cleanObject({
      where: cleanObject({
        languageId: cleanValue(command?.where?.languageId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
