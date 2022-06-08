import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateCardCommand } from '@/commands/implements/cards/create-card.command';
import {
  CardNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCardRepository } from '@/repositories/cards/create-card';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateCardCommandKeys = keyof CreateCardCommand;

@CommandHandler(CreateCardCommand)
export class CreateCardCommandHandler
  implements ICommandHandler<CreateCardCommand>
{
  constructor(
    private readonly createCardRepository: CreateCardRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCardCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCardCommandKeys>('parent');
    }

    const cardCreated = await this.createCardRepository.execute(data);
    if (!cardCreated) {
      throw new CardNotFoundException();
    }
    const cardModel = this.publisher.mergeObjectContext(cardCreated);
    cardModel.createdCard();
    cardModel.commit();

    return cardCreated;
  }

  private clearData(command: CreateCardCommand): CreateCardCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
