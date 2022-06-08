import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCardCommand } from '@/commands/implements/cards/remove-card.command';
import {
  CardNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCardByIdRepository } from '@/repositories/cards/find-card-by-id';
import { RemoveCardRepository } from '@/repositories/cards/remove-card';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveCardCommandKeys = keyof RemoveCardCommand;

@CommandHandler(RemoveCardCommand)
export class RemoveCardCommandHandler
  implements ICommandHandler<RemoveCardCommand>
{
  constructor(
    private readonly findCardByIdRepository: FindCardByIdRepository,
    private readonly removeCardRepository: RemoveCardRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCardCommand) {
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

    const removed = await this.removeCardRepository.execute({
      where: {
        cardId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const cardModel = this.publisher.mergeObjectContext(card);
    cardModel.removedCard();
    cardModel.commit();

    return card;
  }

  private clearData(command: RemoveCardCommand): RemoveCardCommand {
    return cleanObject({
      where: cleanObject({
        cardId: cleanValue(command?.where?.cardId)
      })
    });
  }
}
