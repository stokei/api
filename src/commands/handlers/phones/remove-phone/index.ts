import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemovePhoneCommand } from '@/commands/implements/phones/remove-phone.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PhoneNotFoundException
} from '@/errors';
import { FindPhoneByIdRepository } from '@/repositories/phones/find-phone-by-id';
import { RemovePhoneRepository } from '@/repositories/phones/remove-phone';

@CommandHandler(RemovePhoneCommand)
export class RemovePhoneCommandHandler
  implements ICommandHandler<RemovePhoneCommand>
{
  constructor(
    private readonly findPhoneByIdRepository: FindPhoneByIdRepository,
    private readonly removePhoneRepository: RemovePhoneRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemovePhoneCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const phoneId = splitServiceId(data.where?.phone)?.id;
    if (!phoneId) {
      throw new ParamNotFoundException('phoneId');
    }

    const phone = await this.findPhoneByIdRepository.execute(phoneId);
    if (!phone) {
      throw new PhoneNotFoundException();
    }

    const removed = await this.removePhoneRepository.execute({
      where: {
        ...data.where,
        phone: phoneId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const phoneModel = this.publisher.mergeObjectContext(phone);
    phoneModel.removedPhone({
      removedBy: data.where.removedBy
    });
    phoneModel.commit();

    return phone;
  }

  private clearData(command: RemovePhoneCommand): RemovePhoneCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        phone: cleanValue(command?.where?.phone)
      })
    });
  }
}
