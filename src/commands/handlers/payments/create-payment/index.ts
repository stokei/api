import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePaymentCommand } from '@/commands/implements/payments/create-payment.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PaymentNotFoundException
} from '@/errors';
import { CreatePaymentRepository } from '@/repositories/payments/create-payment';

type CreatePaymentCommandKeys = keyof CreatePaymentCommand;

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentCommandHandler
  implements ICommandHandler<CreatePaymentCommand>
{
  constructor(
    private readonly createPaymentRepository: CreatePaymentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePaymentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePaymentCommandKeys>('parent');
    }

    const paymentCreated = await this.createPaymentRepository.execute(data);
    if (!paymentCreated) {
      throw new PaymentNotFoundException();
    }
    const paymentModel = this.publisher.mergeObjectContext(paymentCreated);
    paymentModel.createdPayment();
    paymentModel.commit();

    return paymentCreated;
  }

  private clearData(command: CreatePaymentCommand): CreatePaymentCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
