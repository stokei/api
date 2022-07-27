import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueBoolean } from '@stokei/nestjs';

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
    phoneModel.createdPhone({
      createdBy: data.createdBy
    });
    phoneModel.commit();

    return phoneCreated;
  }

  private clearData(command: CreatePhoneCommand): CreatePhoneCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      countryCode: cleanValue(command?.countryCode),
      areaCode: cleanValue(command?.areaCode),
      number: cleanValue(command?.number),
      default: cleanValueBoolean(command?.default),
      parent: cleanValue(command?.parent)
    });
  }
}
