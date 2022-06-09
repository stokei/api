import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateKeywordCommand } from '@/commands/implements/keywords/create-keyword.command';
import {
  DataNotFoundException,
  KeywordNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateKeywordRepository } from '@/repositories/keywords/create-keyword';

type CreateKeywordCommandKeys = keyof CreateKeywordCommand;

@CommandHandler(CreateKeywordCommand)
export class CreateKeywordCommandHandler
  implements ICommandHandler<CreateKeywordCommand>
{
  constructor(
    private readonly createKeywordRepository: CreateKeywordRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateKeywordCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateKeywordCommandKeys>('parent');
    }

    const keywordCreated = await this.createKeywordRepository.execute(data);
    if (!keywordCreated) {
      throw new KeywordNotFoundException();
    }
    const keywordModel = this.publisher.mergeObjectContext(keywordCreated);
    keywordModel.createdKeyword();
    keywordModel.commit();

    return keywordCreated;
  }

  private clearData(command: CreateKeywordCommand): CreateKeywordCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
