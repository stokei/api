import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateCardCommand } from '@/commands/implements/cards/update-card.command';
import {
  CardNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCardByIdRepository } from '@/repositories/cards/find-card-by-id';
import { UpdateCardRepository } from '@/repositories/cards/update-card';

type UpdateCardCommandKeys = keyof UpdateCardCommand;

@CommandHandler(UpdateCardCommand)
export class UpdateCardCommandHandler
  implements ICommandHandler<UpdateCardCommand>
{
  constructor(
    private readonly findCardByIdRepository: FindCardByIdRepository,
    private readonly updateCardRepository: UpdateCardRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCardCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const cardId = splitServiceId(data.where?.cardId)?.id;
    if (!cardId) {
      throw new ParamNotFoundException('cardId');
    }

    const card = await this.findCardByIdRepository.execute(cardId);
    if (!card) {
      throw new CardNotFoundException();
    }

    const updated = await this.updateCardRepository.execute({
      ...data,
      where: {
        ...data.where,
        cardId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const cardUpdated = await this.findCardByIdRepository.execute(cardId);
    if (!cardUpdated) {
      throw new CardNotFoundException();
    }
    const cardModel = this.publisher.mergeObjectContext(cardUpdated);
    cardModel.updatedCard();
    cardModel.commit();

    return cardUpdated;
  }

  private clearData(command: UpdateCardCommand): UpdateCardCommand {
    return cleanObject({
      where: cleanObject({
        cardId: cleanValue(command?.where?.cardId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
