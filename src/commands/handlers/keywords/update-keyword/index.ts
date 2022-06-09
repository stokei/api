import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateKeywordCommand } from '@/commands/implements/keywords/update-keyword.command';
import {
  DataNotFoundException,
  KeywordNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindKeywordByIdRepository } from '@/repositories/keywords/find-keyword-by-id';
import { UpdateKeywordRepository } from '@/repositories/keywords/update-keyword';

type UpdateKeywordCommandKeys = keyof UpdateKeywordCommand;

@CommandHandler(UpdateKeywordCommand)
export class UpdateKeywordCommandHandler
  implements ICommandHandler<UpdateKeywordCommand>
{
  constructor(
    private readonly findKeywordByIdRepository: FindKeywordByIdRepository,
    private readonly updateKeywordRepository: UpdateKeywordRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateKeywordCommand) {
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

    const updated = await this.updateKeywordRepository.execute({
      ...data,
      where: {
        ...data.where,
        keywordId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const keywordUpdated = await this.findKeywordByIdRepository.execute(
      keywordId
    );
    if (!keywordUpdated) {
      throw new KeywordNotFoundException();
    }
    const keywordModel = this.publisher.mergeObjectContext(keywordUpdated);
    keywordModel.updatedKeyword();
    keywordModel.commit();

    return keywordUpdated;
  }

  private clearData(command: UpdateKeywordCommand): UpdateKeywordCommand {
    return cleanObject({
      where: cleanObject({
        keywordId: cleanValue(command?.where?.keywordId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
