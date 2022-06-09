import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveKeywordCommand } from '@/commands/implements/keywords/remove-keyword.command';
import {
  DataNotFoundException,
  KeywordNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindKeywordByIdRepository } from '@/repositories/keywords/find-keyword-by-id';
import { RemoveKeywordRepository } from '@/repositories/keywords/remove-keyword';

type RemoveKeywordCommandKeys = keyof RemoveKeywordCommand;

@CommandHandler(RemoveKeywordCommand)
export class RemoveKeywordCommandHandler
  implements ICommandHandler<RemoveKeywordCommand>
{
  constructor(
    private readonly findKeywordByIdRepository: FindKeywordByIdRepository,
    private readonly removeKeywordRepository: RemoveKeywordRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveKeywordCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const keywordId = splitServiceId(data.where?.keywordId)?.id;
    if (!keywordId) {
      throw new ParamNotFoundException('keywordId');
    }

    const keyword = await this.findKeywordByIdRepository.execute(keywordId);
    if (!keyword) {
      throw new KeywordNotFoundException();
    }

    const removed = await this.removeKeywordRepository.execute({
      where: {
        keywordId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const keywordModel = this.publisher.mergeObjectContext(keyword);
    keywordModel.removedKeyword();
    keywordModel.commit();

    return keyword;
  }

  private clearData(command: RemoveKeywordCommand): RemoveKeywordCommand {
    return cleanObject({
      where: cleanObject({
        keywordId: cleanValue(command?.where?.keywordId)
      })
    });
  }
}
