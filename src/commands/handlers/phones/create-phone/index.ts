import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePhoneCommand } from '@/commands/implements/phones/create-phone.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PhoneNotFoundException
} from '@/errors';
import { CreatePhoneRepository } from '@/repositories/phones/create-phone';

type CreatePhoneCommandKeys = keyof CreatePhoneCommand;

@CommandHandler(CreatePhoneCommand)
export class CreatePhoneCommandHandler
  implements ICommandHandler<CreatePhoneCommand>
{
  constructor(
    private readonly createPhoneRepository: CreatePhoneRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePhoneCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePhoneCommandKeys>('parent');
    }

    const phoneCreated = await this.createPhoneRepository.execute(data);
    if (!phoneCreated) {
      throw new PhoneNotFoundException();
    }
    const phoneModel = this.publisher.mergeObjectContext(phoneCreated);
    phoneModel.createdPhone();
    phoneModel.commit();

    return phoneCreated;
  }

  private clearData(command: CreatePhoneCommand): CreatePhoneCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
