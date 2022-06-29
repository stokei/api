import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdatePhoneCommand } from '@/commands/implements/phones/update-phone.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PhoneNotFoundException
} from '@/errors';
import { FindPhoneByIdRepository } from '@/repositories/phones/find-phone-by-id';
import { UpdatePhoneRepository } from '@/repositories/phones/update-phone';

type UpdatePhoneCommandKeys = keyof UpdatePhoneCommand;

@CommandHandler(UpdatePhoneCommand)
export class UpdatePhoneCommandHandler
  implements ICommandHandler<UpdatePhoneCommand>
{
  constructor(
    private readonly findPhoneByIdRepository: FindPhoneByIdRepository,
    private readonly updatePhoneRepository: UpdatePhoneRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdatePhoneCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const phoneId = splitServiceId(data.where?.phoneId)?.id;
    if (!phoneId) {
      throw new ParamNotFoundException('phoneId');
    }

    const phone = await this.findPhoneByIdRepository.execute(phoneId);
    if (!phone) {
      throw new PhoneNotFoundException();
    }

    const updated = await this.updatePhoneRepository.execute({
      ...data,
      where: {
        ...data.where,
        phoneId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const phoneUpdated = await this.findPhoneByIdRepository.execute(phoneId);
    if (!phoneUpdated) {
      throw new PhoneNotFoundException();
    }
    const phoneModel = this.publisher.mergeObjectContext(phoneUpdated);
    phoneModel.updatedPhone();
    phoneModel.commit();

    return phoneUpdated;
  }

  private clearData(command: UpdatePhoneCommand): UpdatePhoneCommand {
    return cleanObject({
      where: cleanObject({
        phoneId: cleanValue(command?.where?.phoneId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
