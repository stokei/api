import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemovePaymentCommand } from '@/commands/implements/payments/remove-payment.command';
import {
  PaymentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindPaymentByIdRepository } from '@/repositories/payments/find-payment-by-id';
import { RemovePaymentRepository } from '@/repositories/payments/remove-payment';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemovePaymentCommandKeys = keyof RemovePaymentCommand;

@CommandHandler(RemovePaymentCommand)
export class RemovePaymentCommandHandler
  implements ICommandHandler<RemovePaymentCommand>
{
  constructor(
    private readonly findPaymentByIdRepository: FindPaymentByIdRepository,
    private readonly removePaymentRepository: RemovePaymentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemovePaymentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const paymentId = splitServiceId(data.where?.paymentId)?.id;
    if (!paymentId) {
      throw new ParamNotFoundException('paymentId');
    }

    const payment = await this.findPaymentByIdRepository.execute(paymentId);
    if (!payment) {
      throw new PaymentNotFoundException();
    }

    const removed = await this.removePaymentRepository.execute({
      where: {
        paymentId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const paymentModel = this.publisher.mergeObjectContext(payment);
    paymentModel.removedPayment();
    paymentModel.commit();

    return payment;
  }

  private clearData(command: RemovePaymentCommand): RemovePaymentCommand {
    return cleanObject({
      where: cleanObject({
        paymentId: cleanValue(command?.where?.paymentId)
      })
    });
  }
}
