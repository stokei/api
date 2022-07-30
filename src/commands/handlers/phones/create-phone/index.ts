import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueBoolean } from '@stokei/nestjs';

import { CreatePhoneCommand } from '@/commands/implements/phones/create-phone.command';
import { PhoneStatus } from '@/enums/phone-status.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PhoneNotFoundException
} from '@/errors';
import { CreatePhoneRepository } from '@/repositories/phones/create-phone';
import { generateRandomCode } from '@/utils/generate-random-code';

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
    if (!data?.areaCode) {
      throw new ParamNotFoundException<CreatePhoneCommandKeys>('areaCode');
    }
    if (!data?.countryCode) {
      throw new ParamNotFoundException<CreatePhoneCommandKeys>('countryCode');
    }
    if (!data?.number) {
      throw new ParamNotFoundException<CreatePhoneCommandKeys>('number');
    }

    const fullnumberMounted = data.countryCode + data.areaCode + data.number;
    const fullnumberWithOnlyNumbers = fullnumberMounted.replace(/\D/g, '');
    const phoneCreated = await this.createPhoneRepository.execute({
      ...data,
      fullnumber: fullnumberWithOnlyNumbers,
      status: PhoneStatus.PENDING,
      validationCode: generateRandomCode(7)
    });
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
